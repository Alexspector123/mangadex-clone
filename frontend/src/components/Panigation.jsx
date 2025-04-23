import React from 'react';
import { usePagination, DOTS } from '../hooks/usePanigation';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = ''
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`flex list-none ${className}`}>
      {/* Left Arrow */}
      <li
        className={`mx-1 px-3 py-1 rounded-full flex items-center text-sm min-w-[32px] justify-center
          ${currentPage === 1 ? 'pointer-events-none text-black/50' : 'cursor-pointer hover:bg-black/5'}`}
        onClick={onPrevious}
      >
        <div className="w-2 h-2 border-r-2 border-t-2 border-black rotate-[-135deg]" />
      </li>

      {/* Page Numbers */}
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={idx}
              className="mx-1 px-3 py-1 rounded-full flex items-center justify-center text-sm text-black/70 cursor-default"
            >
              &hellip;
            </li>
          );
        }

        return (
          <li
            key={idx}
            className={`mx-1 px-3 py-1 rounded-full flex items-center justify-center text-sm min-w-[32px]
              ${pageNumber === currentPage ? 'bg-black/10' : 'hover:bg-black/5 cursor-pointer'}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      {/* Right Arrow */}
      <li
        className={`mx-1 px-3 py-1 rounded-full flex items-center text-sm min-w-[32px] justify-center
          ${currentPage === lastPage ? 'pointer-events-none text-black/50' : 'cursor-pointer hover:bg-black/5'}`}
        onClick={onNext}
      >
        <div className="w-2 h-2 border-r-2 border-t-2 border-black rotate-[45deg]" />
      </li>
    </ul>
  );
};

export default Pagination;
