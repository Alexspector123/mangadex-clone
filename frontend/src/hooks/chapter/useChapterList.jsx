import React, { useMemo } from "react";
import useFetchVolumebyID from "../volume/useFetchVolumebyID";
import { useBatchChapters } from "../chapter/useBatchChapters";

const useChapterList = (mangaID) => {
  const {
    volumeData,
    isLoading: isVolumeLoading,
    error: volumeError,
  } = useFetchVolumebyID(mangaID);

  const chapterIds = useMemo(() => {
    if (!Array.isArray(volumeData)) return [];
    return volumeData.flatMap((volume) =>
      Array.isArray(volume.chapters)
        ? volume.chapters.flatMap((chap) => [
            chap.id,
            ...(Array.isArray(chap.others) ? chap.others : []),
          ])
        : []
    );
  }, [volumeData]);

  const {
    chapters,
    loading: isChapterLoading,
    error: chapterError,
  } = useBatchChapters(chapterIds);
  if (chapterError) return <div>Error: {chapterError}</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chapterById = useMemo(
    () => new Map(chapters.map((c) => [c.id, c])),
    [chapters]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allChapters = useMemo(() => {
    if (!Array.isArray(volumeData)) return [];
    const chaps = volumeData
      .flatMap((volume) =>
        volume.chapters.flatMap((chap) => [
          chapterById.get(chap.id),
          ...(Array.isArray(chap.others)
            ? chap.others.map((id) => chapterById.get(id))
            : []),
        ])
      )
      .filter(Boolean);

    return chaps;
  }, [volumeData, chapterById]);

  return {
    allChapters,
    isLoading: isVolumeLoading || isChapterLoading,
    error: volumeError || chapterError,
  };
};

export default useChapterList;
