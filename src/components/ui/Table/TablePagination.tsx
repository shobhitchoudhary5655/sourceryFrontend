interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="
            px-4
            py-2
            rounded-lg
            border
            border-gray-200
            text-sm
            hover:bg-gray-50
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Previous
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="
            px-4
            py-2
            rounded-lg
            bg-[#7F26FD]
            text-white
            text-sm
            hover:opacity-90
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;