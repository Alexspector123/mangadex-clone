import React, { useMemo, useState } from 'react';
import useFetchVolumebyID from '../../hooks/volume/useFetchVolumebyID';
import ChapterItem from '../../components/Chapter/ChapterItem';
import { useBatchChapters } from '../../hooks/chapter/useBatchChapters';

import Pagination from '../../components/Panigation';

const PAGE_SIZE = 20;

const MangaChapterSection = ({ id }) => {
  const { volumeData, isLoading, error } = useFetchVolumebyID(id);
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>Error: {error}</div>;

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
    return volumeData.flatMap(volume =>
      volume.chapters.flatMap(chap => [
        chapterById.get(chap.id),
        ...(Array.isArray(chap.others) ? chap.others.map(id => chapterById.get(id)) : [])
      ])
    ).filter(Boolean);
  }, [volumeData, chapterById]);

  const firstChapByVol = useMemo(() => {
    if (!Array.isArray(allChapters)) return [];
    const firstChap = [];
    allChapters.map(chap => {
      if(!firstChap[chap.volume]) firstChap[chap.volume] = chap.id;
    })
    return firstChap; 
  }, [allChapters]);

  console.log(firstChapByVol);

  // Apply pagination
  const paginatedChapters = useMemo(() => {
    const first = (currentPage - 1) * PAGE_SIZE;
    const last = first + PAGE_SIZE;
    return allChapters.slice(first, last);
  }, [allChapters, currentPage]);



  return (
    <div>
      <div className='flex gap-x-2 mb-4'>
        <button>Ascending</button>
        <button>Index</button>
      </div>

      <div className='rounded flex flex-col gap-2'>
      {paginatedChapters.map((chap, index) =>
        index === 0 || firstChapByVol.includes(chap.id) ? (
          <React.Fragment key={chap.id}>
            <div className="text-sm mt-2">Volume {chap.volume ? chap.volume : 'No Volume'}</div>
            <a href="">
              <ChapterItem data={chap} />
            </a>
          </React.Fragment>
        ) : (
          <a key={chap.id} href="">
            <ChapterItem data={chap} />
          </a>
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
