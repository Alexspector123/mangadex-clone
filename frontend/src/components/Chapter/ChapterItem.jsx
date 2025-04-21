import React from 'react';

const ChapterItem = ({ data }) => {
  if (!data) return null;

  return (
    <div className="border p-2 rounded hover:bg-gray-100 transition">
      <div className="text-sm font-medium">Chapter: {data.title || 'No title'}</div>
      <div className="text-xs text-gray-500">Released: {data.readableAt}</div>
    </div>
  );
};

export default ChapterItem;
