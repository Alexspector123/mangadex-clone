import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchVolumebyID from '../../hooks/volume/useFetchVolumebyID';
import ChapterItem from '../../components/Chapter/ChapterItem';
import { useBatchChapters } from '../../hooks/chapter/useBatchChapters';

import Pagination from '../../components/Panigation';

const PAGE_SIZE = 20;

const MangaChapterSection = ({ id }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const { volumeData, isLoading, error } = useFetchVolumebyID(id);
  const [currentPage, setCurrentPage] = useState(1);
  if (error) return <div>Error: {error}</div>;

  const navigate = useNavigate();

  const chapterIds = useMemo(() => {
    if (!Array.isArray(volumeData)) return [];
    return volumeData.flatMap(volume =>
      Array.isArray(volume.chapters)
        ? volume.chapters.flatMap(chap => [
            chap.id,
            ...(Array.isArray(chap.others) ? chap.others : [])
          ])
        : []
    );
  }, [volumeData]);

  const { chapters, loading, error: chaptersError } = useBatchChapters(chapterIds);
  if (chaptersError) return <div>Error: {chaptersError}</div>;

  const chapterById = useMemo(() => new Map(chapters.map(c => [c.id, c])), [chapters]);

  const allChapters = useMemo(() => {
    if (!Array.isArray(volumeData)) return [];

    const chaps = volumeData.flatMap(volume =>
      volume.chapters.flatMap(chap => [
        chapterById.get(chap.id),
        ...(Array.isArray(chap.others) ? chap.others.map(id => chapterById.get(id)) : [])
      ])
      ).filter(Boolean);

    return chaps.sort((a,b) => {
      const aNum = parseFloat(a.chapter || '0');
      const bNum = parseFloat(b.chapter || '0');
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
    })
  }, [volumeData, chapterById, sortOrder]);

  // Apply pagination
  const paginatedChapters = useMemo(() => {
    const first = (currentPage - 1) * PAGE_SIZE;
    const last = first + PAGE_SIZE;
    return allChapters.slice(first, last);
  }, [allChapters, currentPage]);

  const groupedByVolume = useMemo(() => {
    const volMap = new Map();

    paginatedChapters.forEach(chap => {
      const volKey = chap.volume ?? 'No Volume';
      if (!volMap.has(volKey)) volMap.set(volKey, new Map());

      const chapMap = volMap.get(volKey);
      const chapKey = chap.chapter ?? 'No Chapter';
      if (!chapMap.has(chapKey)) chapMap.set(chapKey, []);
      chapMap.get(chapKey).push(chap);
    });

    return volMap;
  }, [paginatedChapters]);

  return (
    <div>
      <div className='flex gap-x-2 mb-4'>
        <button
        onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
        className='cursor-pointer
                    bg-slate-100 px-7 py-1 rounded
                    font-semibold'>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
        <button>Index</button>
      </div>

      <div className="flex flex-col gap-6">
        {Array.from(groupedByVolume.entries()).map(
          ([volume, chaptersMap]) => (
            <div key={volume} className="p-4 rounded">

              <div className="text-base font-semibold mb-2
                              border-b-1 border-b-slate-200">
                {volume ? (volume==='No Volume') ? 'No Volume' : `Volume ${volume}` : ''}
              </div>

              <div className="flex flex-col gap-4">
                {Array.from(chaptersMap.entries()).map(
                  ([chapNum, chapList]) => (
                    <div key={chapNum} className='p-3
                                                  border-2 border-slate-200 rounded'>
                      <div className="text-sm font-medium mb-1">
                        Chapter {chapNum}
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        {chapList.map(chap => (
                          <a 
                          key={chap.id} 
                          href={`/chapter/${chap.id}/1`} 
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/chapter/${chap.id}/1`);
                          }}
                          >
                            <ChapterItem data={chap} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>


      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalCount={allChapters.length}
          pageSize={PAGE_SIZE}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MangaChapterSection;
