"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-5 flex">
      <button
        className="mr-1.5 h-[30px] w-[30px] rounded-full border border-gray-300 text-center text-sm font-bold transition-colors hover:bg-blue-600 hover:text-white disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        ◀
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`mr-1.5 h-[30px] w-[30px] rounded-full border text-center text-sm transition-colors hover:bg-blue-600 hover:text-white ${
              pageNumber === currentPage
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300"
            }`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className="mr-1.5 h-[30px] w-[30px] rounded-full border border-gray-300 text-center text-sm font-bold transition-colors hover:bg-blue-600 hover:text-white disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
