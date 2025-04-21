import React from 'react'
import useFetchVolumebyID from '../../hooks/volume/useFetchVolumebyID';
import ChapterItem from '../../components/Chapter/ChapterItem';
import { useBatchChapters } from '../../hooks/chapter/useBatchChapters';

const MangaChapterSection = ({id}) => {
  const { volumeData, isLoading, error } = useFetchVolumebyID(id);
  if (error) return <div>Error: {error}</div>;


  const chapterIds = React.useMemo(() => {
    if (!Array.isArray(volumeData)) return [];
    return volumeData.flatMap(volume =>
      volume.chapters.flatMap(chap => [
        chap.id,
        ...(Array.isArray(chap.others) ? chap.others : [])
      ])
    );
  }, [volumeData]);

  const { chapters, loading, error: chaptersError } = useBatchChapters(chapterIds);

  if (chaptersError) return <div>Error: {chaptersError}</div>;

  const chapterById = React.useMemo(
    () => new Map(chapters.map(c => [c.id, c])),
    [chapters]
  );

  return (
    <div>
      <div className='flex gap-x-2 mb-4'>
        <button>Ascending</button>
        <button>Index</button>
      </div>

      {Array.isArray(volumeData) && volumeData.map((volume, index) => (
        <div key={index} className='flex flex-col mb-6'>
          <div className='flex flex-row justify-between mb-2 cursor-pointer'>
            <div>Volume: {volume.volume}</div>
            <div></div>
          </div>

          <div className='rounded flex flex-col gap-2'>
            {volume.chapters.map(chap => {
                const data = chapterById.get(chap.id);
                return data
                  ? <a href="">
                    <ChapterItem key={chap.id} data={data} />
                  </a>
                  : null;
              })}
            {volume.chapters.flatMap(chap =>
              (Array.isArray(chap.others) ? chap.others : []).map(otherId => {
                const data = chapterById.get(otherId);
                return data ? <a href=""><ChapterItem key={otherId} data={data} /> </a> : null;
              })
            )}
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default MangaChapterSection