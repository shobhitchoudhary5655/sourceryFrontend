import TableLoader from './TableLoader';
import TablePagination from './TablePagination';
import type { DataTableProps } from './types';

function DataTable<T>({
  columns,
  data,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      "
    >
      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#7F26FD]">
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className="
                        px-6
                        py-4
                        text-left
                        text-sm
                        font-semibold
                        text-white
                        whitespace-nowrap
                      "
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="
                        py-12
                        text-center
                        text-gray-500
                      "
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`
                        border-b
                        border-gray-100
                        transition-colors
                        hover:bg-purple-50
                        ${
                          rowIndex % 2 === 0
                            ? 'bg-white'
                            : 'bg-gray-50'
                        }
                      `}
                    >
                      {columns.map((column) => (
                        <td
                          key={String(column.key)}
                          className="
                            px-6
                            py-4
                            text-sm
                            text-gray-700
                            whitespace-nowrap
                          "
                        >
                          {column.render
                            ? column.render(
                                (
                                  row as Record<
                                    string,
                                    unknown
                                  >
                                )[String(column.key)],
                                row
                              )
                            : String(
                                (
                                  row as Record<
                                    string,
                                    unknown
                                  >
                                )[String(column.key)] ?? ''
                              )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {onPageChange && totalPages > 1 && (
            <div className="p-5">
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DataTable;