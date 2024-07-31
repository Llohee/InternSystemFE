import { flexRender, Row, Table } from '@tanstack/react-table'
import { cva } from 'class-variance-authority'
import { Button } from '@/components/ui/button/button'
import { EmptyView, EmptyViewDescription, EmptyViewTitle } from '../empty-view'
import { EmptyInboxIcon } from '../icon/empty'
import { Pagination } from '../pagination/pagination'

interface TableProps<TData> {
  table: Table<TData>
  className?: string
  renderExpandedRow?: (props: { row: Row<TData> }) => React.ReactElement
}
export function TableView<TData>(props: TableProps<TData>) {
  return (
    <>
      <div className={`overflow-x-auto ${props.className ?? ''} mb-1 `}>
        <table
          className={`w-full overflow-x-hidden relative table-fixed min-w-[1200px]`}
        >
          <thead className="sticky -top-[1px] z-20 table-header-group border-y border-border-2">
            {props.table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className=" text-heading-9 text-typography-subtitle"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={tableDataHeaderStyle({
                      type: 'th',
                      className: `${header.column.columnDef.meta}`,
                    })}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={tableDataWrapperStyle({
                          type: 'th',
                          sortable: header.column.getCanSort(),
                          sorted: header.column.getIsSorted() !== false,
                        })}
                      >
                        <span className="truncate">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() ? (
                          <button
                            {...{
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {{
                              asc: (
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.82 1.88437C8.78112 1.8393 8.73227 1.803 8.67694 1.77808C8.62161 1.75316 8.56118 1.74023 8.5 1.74023C8.43881 1.74023 8.37839 1.75316 8.32306 1.77808C8.26773 1.803 8.21888 1.8393 8.18 1.88437L4.58 6.46307C4.53543 6.51976 4.50829 6.58717 4.50162 6.65774C4.49495 6.72832 4.50901 6.79927 4.54223 6.86265C4.57545 6.92603 4.62652 6.97933 4.68971 7.01658C4.7529 7.05384 4.82572 7.07357 4.9 7.07357H12.1C12.1743 7.07357 12.2471 7.05384 12.3103 7.01658C12.3735 6.97933 12.4245 6.92603 12.4578 6.86265C12.491 6.79927 12.5051 6.72832 12.4984 6.65774C12.4917 6.58717 12.4646 6.51976 12.42 6.46307L8.82 1.88437Z"
                                    fill="#366AE2"
                                  />
                                  <path
                                    d="M8.18 14.9294C8.21888 14.9745 8.26773 15.0108 8.32306 15.0357C8.37839 15.0606 8.43881 15.0736 8.5 15.0736C8.56118 15.0736 8.62161 15.0606 8.67694 15.0357C8.73227 15.0108 8.78112 14.9745 8.82 14.9294L12.42 10.3507C12.4646 10.294 12.4917 10.2266 12.4984 10.1561C12.5051 10.0855 12.491 10.0145 12.4578 9.95115C12.4245 9.88778 12.3735 9.83447 12.3103 9.79722C12.2471 9.75997 12.1743 9.74023 12.1 9.74023H4.9C4.82572 9.74023 4.7529 9.75997 4.68971 9.79722C4.62652 9.83447 4.57545 9.88778 4.54223 9.95115C4.50901 10.0145 4.49495 10.0855 4.50162 10.1561C4.50829 10.2266 4.53543 10.294 4.58 10.3507L8.18 14.9294Z"
                                    fill="#00204D"
                                    fill-opacity="0.4"
                                  />
                                </svg>
                              ),
                              desc: (
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.82 1.88437C8.78112 1.8393 8.73227 1.803 8.67694 1.77808C8.62161 1.75316 8.56118 1.74023 8.5 1.74023C8.43881 1.74023 8.37839 1.75316 8.32306 1.77808C8.26773 1.803 8.21888 1.8393 8.18 1.88437L4.58 6.46307C4.53543 6.51976 4.50829 6.58717 4.50162 6.65774C4.49495 6.72832 4.50901 6.79927 4.54223 6.86265C4.57545 6.92603 4.62652 6.97933 4.68971 7.01658C4.7529 7.05384 4.82572 7.07357 4.9 7.07357H12.1C12.1743 7.07357 12.2471 7.05384 12.3103 7.01658C12.3735 6.97933 12.4245 6.92603 12.4578 6.86265C12.491 6.79927 12.5051 6.72832 12.4984 6.65774C12.4917 6.58717 12.4646 6.51976 12.42 6.46307L8.82 1.88437Z"
                                    fill="#00204D"
                                    fill-opacity="0.4"
                                  />
                                  <path
                                    d="M8.18 14.9294C8.21888 14.9745 8.26773 15.0108 8.32306 15.0357C8.37839 15.0606 8.43881 15.0736 8.5 15.0736C8.56118 15.0736 8.62161 15.0606 8.67694 15.0357C8.73227 15.0108 8.78112 14.9745 8.82 14.9294L12.42 10.3507C12.4646 10.294 12.4917 10.2266 12.4984 10.1561C12.5051 10.0855 12.491 10.0145 12.4578 9.95115C12.4245 9.88778 12.3735 9.83447 12.3103 9.79722C12.2471 9.75997 12.1743 9.74023 12.1 9.74023H4.9C4.82572 9.74023 4.7529 9.75997 4.68971 9.79722C4.62652 9.83447 4.57545 9.88778 4.54223 9.95115C4.50901 10.0145 4.49495 10.0855 4.50162 10.1561C4.50829 10.2266 4.53543 10.294 4.58 10.3507L8.18 14.9294Z"
                                    fill="#366AE2"
                                  />
                                </svg>
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.32 2.21835C8.28112 2.17328 8.23227 2.13698 8.17694 2.11206C8.12161 2.08714 8.06119 2.07422 8 2.07422C7.93881 2.07422 7.87839 2.08714 7.82306 2.11206C7.76773 2.13698 7.71888 2.17328 7.68 2.21835L4.08 6.79706C4.03543 6.85375 4.00829 6.92115 4.00162 6.99173C3.99495 7.0623 4.00901 7.13325 4.04223 7.19663C4.07545 7.26001 4.12652 7.31331 4.18971 7.35057C4.2529 7.38782 4.32572 7.40755 4.4 7.40755H11.6C11.6743 7.40755 11.7471 7.38782 11.8103 7.35057C11.8735 7.31331 11.9245 7.26001 11.9578 7.19663C11.991 7.13325 12.0051 7.0623 11.9984 6.99173C11.9917 6.92115 11.9646 6.85375 11.92 6.79706L8.32 2.21835Z"
                                  fill="#00204D"
                                  fill-opacity="0.4"
                                />
                                <path
                                  d="M7.68 15.2634C7.71888 15.3085 7.76773 15.3448 7.82306 15.3697C7.87839 15.3946 7.93881 15.4076 8 15.4076C8.06119 15.4076 8.12161 15.3946 8.17694 15.3697C8.23227 15.3448 8.28112 15.3085 8.32 15.2634L11.92 10.6847C11.9646 10.628 11.9917 10.5606 11.9984 10.49C12.0051 10.4195 11.991 10.3485 11.9578 10.2851C11.9245 10.2218 11.8735 10.1685 11.8103 10.1312C11.7471 10.094 11.6743 10.0742 11.6 10.0742H4.4C4.32572 10.0742 4.2529 10.094 4.18971 10.1312C4.12652 10.1685 4.07545 10.2218 4.04223 10.2851C4.00901 10.3485 3.99495 10.4195 4.00162 10.49C4.00829 10.5606 4.03543 10.628 4.08 10.6847L7.68 15.2634Z"
                                  fill="#00204D"
                                  fill-opacity="0.4"
                                />
                              </svg>
                            )}
                          </button>
                        ) : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {props.table.getRowModel().rows.map((row, index) => (
              <>
                {/* normal row */}
                <tr
                  key={index}
                  // please look at background color later
                  // className="odd:bg-grey-1 even:bg-primary-background/25 group hover:bg-grey-3 mx-1"
                  className="group/row mx-1 text-body-3 text-typography-body"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={tableDataHeaderStyle({
                        type: 'td',
                        isExpanded: row.getIsExpanded() && row.getCanExpand(),
                        isSubRow: row.depth > 0,
                        className: `${cell.column.columnDef.meta}`,
                      })}
                    >
                      <div
                        className={tableDataWrapperStyle({
                          type: 'td',
                          sortable: cell.column.getCanSort(),
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* custom row afer expanded row */}
                {row.getIsExpanded() &&
                  row.getCanExpand() &&
                  props.renderExpandedRow && (
                    <tr className="group/row mx-1 border-y border-border-2 bg-grey-1">
                      {/* Empty Cell in place of STT */}
                      <td></td>
                      <td
                        className="bg-grey-1 text-label-1 text-typography-title group/tableData text-left p-3"
                        colSpan={row.getVisibleCells().length - 1}
                      >
                        {props.renderExpandedRow({ row })}
                      </td>
                    </tr>
                  )}
              </>
            ))}
          </tbody>
        </table>
        {props.table.getRowModel().rows.length === 0 && (
          <EmptyView className="!h-3/4" intent="transparent-background">
            <EmptyInboxIcon className="min-h-40" />
            <EmptyViewTitle>Dữ liệu trống</EmptyViewTitle>
            <EmptyViewDescription>
              Hãy tạo dữ liệu mới hoặc thử tìm kiếm từ khóa khác
            </EmptyViewDescription>
          </EmptyView>
        )}
      </div>
      {props.table.getPageCount() > 0 && (
        <div className="flex gap-2 justify-end">
          <Pagination
            changePage={(e) => {
              props.table.setPageIndex(e - 1)
            }}
            pageCurrent={props.table.getState().pagination.pageIndex + 1}
            totalPage={props.table.getPageCount()}
          ></Pagination>
        </div>
      )}
    </>
  )
}

export const tableDataHeaderStyle = cva(
  'group/tableData text-left p-3 last:text-center first:pl-6 last:pr-6',
  {
    variants: {
      type: {
        td: 'group-hover/row:bg-slate-50 z-10',
        th: 'bg-grey-1 z-20',
      },
      isSubRow: {
        true: 'bg-grey-1 py-4',
      },
      isExpanded: {
        true: 'pb-5',
      },
    },
  }
)
export const tableDataWrapperStyle = cva(
  'gap-2 space-x-5 items-center justify-start group-last/tableData:justify-center',
  {
    variants: {
      type: {
        td: 'group-last/tableData:flex truncate has-[#cell-enable-overflow]:overflow-visible',
        th: 'flex whitespace-nowrap gap-3 [&>svg]:!mx-0 [&>button]:!mx-0 [&>button]:shink-0',
      },
      sortable: {
        true: '!h-full',
        false: '',
      },
      sorted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // {
      //   type: 'th',
      //   sortable: true,
      //   className: 'cursor-pointer',
      // },
      {
        type: 'th',
        sorted: true,
        className: 'text-primary-base',
      },
    ],
  }
)
