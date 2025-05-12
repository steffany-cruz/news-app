import { FC, useCallback } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, totalPages]
  );

  const getPages = () => {
    const delta = 2;

    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (totalPages > 10) {
      if (left > 2) {
        range.push("...");
      }

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (right < totalPages - 1) {
        range.push("...");
      }

      if (totalPages > 1) {
        range.push(totalPages);
      }
    } else {
      range.concat(totalPages);
    }
    return range;
  };

  return (
    <div className="flex justify-center self-baseline mt-10 text-white">
      <button
        className={`px-3 py-2 mx-1 border rounded ${
          currentPage === 1 ? "bg-cyan-900" : "bg-cyan-800 hover:bg-cyan-900"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page || 1))}
            className={`px-3 py-2 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-cyan-900"
                : "bg-cyan-800 hover:bg-cyan-900"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`px-3 py-2 mx-1 border rounded ${
          currentPage === totalPages
            ? "bg-cyan-900"
            : "bg-cyan-800 hover:bg-cyan-900"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
