import { Button } from '@/components/ui/button/button'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useFilterForPostBusinessStore } from '@/hooks/zustand/filter-for-post'
import {
  ColumnFiltersState,
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import produce from 'immer'
import React, { useEffect, useState } from 'react'
// import UpdatePosModal from '../modal/update-post'
import dayjs from 'dayjs'
import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import {
  CustomPostDetail,
  GetAllCustomPostResponse,
} from '@/models/api/custom-post-api'
// import ConfirmDeletePostModal from '../modal/confirm-delete-post'

const CustomPostBusinessTable = (props: {
  getallCustomPostData: GetAllCustomPostResponse
  isPreviousData: boolean
}) => {
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [customPostChoose, setCustomPostChoose] = useState<CustomPostDetail>()

  const filterPost = useFilterForPostBusinessStore()
  const [data, setData] = React.useState(() => [
    ...props.getallCustomPostData.data,
  ])

  const [sorting, setSorting] = React.useState<SortingState>(
    filterPost.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    }))
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const sortColumn = () => {
    filterPost.update(
      produce(filterPost.filter, (draftState: any) => {
        draftState.sort = sorting.map((val) => ({
          name: val.id,
          type: val.desc,
        }))
      })
    )
  }
  useEffect(() => {
    sortColumn()
  }, [sorting])
  useEffect(() => {
    setData([...props.getallCustomPostData.data])
  }, [props.getallCustomPostData])

  const columnHelper = createColumnHelper<CustomPostDetail>()

  const columns = [
    columnHelper.display({
      id: 'number',
      header: 'STT',
      cell: (info) => (
        <div>
          {info.row.depth == 0 &&
            filterPost.filter.page * filterPost.filter.limit +
              1 +
              info.row.index}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('title', {
      header: 'Tiêu đề',
      cell: (info) => <div>{info.getValue()}</div>,
      enableColumnFilter: true,
      meta: 'w-boolean',
    }),
    columnHelper.accessor('profession', {
      header: 'Chuyên ngành',
      cell: (info) => <div>{info.getValue().name}</div>,
      enableColumnFilter: true,
      meta: 'w-boolean',
    }),
    columnHelper.accessor('created_time', {
      header: 'Ngày tạo',
      cell: (info) => {
        return <p>{dayjs(info.getValue()).format(DATE_FORMAT_VIEW)}</p>
      },
      enableColumnFilter: true,
      meta: 'w-time pl-10 ',
    }),
    columnHelper.accessor('expired_time', {
      header: 'Hạn ứng tuyển',
      cell: (info) => {
        return <p>{dayjs(info.getValue()).format(DATE_FORMAT_VIEW)}</p>
      },
      enableColumnFilter: true,
      meta: 'w-time pl-10 ',
    }),
    columnHelper.display({
      id: 'action',
      header: () => 'Tác vụ',
      cell: (info) => (
        <div className="flex gap-3">
          <Button
            intent="grey"
            iconOnly
            ariaLabel="Open update row modal"
            btnStyle="no-background"
            onClick={() => {
              setIsShowModalUpdate(true)
              setCustomPostChoose(info.row.original)
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.82586 10.9934C3.72226 11.1421 3.66671 11.3189 3.66671 11.5002C3.66671 11.6815 3.72227 11.8584 3.82588 12.0071C4.45624 12.8993 5.53697 14.2483 6.95969 15.3675C8.38511 16.4889 10.0939 17.3337 12 17.3337C13.9061 17.3337 15.6149 16.4889 17.0403 15.3675C18.463 14.2483 19.5438 12.8993 20.1741 12.0071C20.2777 11.8584 20.3333 11.6815 20.3333 11.5002C20.3333 11.3189 20.2777 11.142 20.1741 10.9933C19.5438 10.1011 18.463 8.75211 17.0403 7.63287C15.6149 6.5115 13.9061 5.66671 12 5.66671C10.0939 5.66671 8.38511 6.5115 6.95969 7.63287C5.53696 8.75212 4.45622 10.1012 3.82586 10.9934ZM5.92917 6.32292C7.52466 5.06776 9.58844 4 12 4C14.4116 4 16.4753 5.06776 18.0708 6.32292C19.6681 7.57945 20.8561 9.06986 21.5368 10.0336L21.539 10.0367C21.8391 10.4657 22 10.9766 22 11.5002C22 12.0238 21.8391 12.5347 21.539 12.9637L21.5368 12.9669C20.8561 13.9306 19.6681 15.421 18.0708 16.6775C16.4753 17.9327 14.4116 19.0004 12 19.0004C9.58844 19.0004 7.52466 17.9327 5.92917 16.6775C4.33193 15.421 3.14394 13.9306 2.46324 12.9669L2.46102 12.9637C2.16094 12.5347 2 12.0238 2 11.5002C2 10.9766 2.16095 10.4657 2.46103 10.0367L2.46323 10.0336C3.14393 9.06985 4.33193 7.57945 5.92917 6.32292Z"
                fill="#00204D"
                fill-opacity="0.6"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0001 9.00014C10.6193 9.00014 9.5 10.1195 9.5 11.5002C9.5 12.881 10.6193 14.0003 12.0001 14.0003C13.3808 14.0003 14.5001 12.881 14.5001 11.5002C14.5001 10.1195 13.3808 9.00014 12.0001 9.00014ZM7.83329 11.5002C7.83329 9.19896 9.69882 7.33343 12.0001 7.33343C14.3013 7.33343 16.1669 9.19896 16.1669 11.5002C16.1669 13.8015 14.3013 15.667 12.0001 15.667C9.69882 15.667 7.83329 13.8015 7.83329 11.5002Z"
                fill="#00204D"
                fill-opacity="0.6"
              />
            </svg>
          </Button>
          <Button
            intent={'grey'}
            btnStyle="no-background"
            iconOnly
            ariaLabel="Open delete row modal"
            onClick={() => {
              setIsShowModalDelete(true)
              setCustomPostChoose(info.row.original)
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.77306 13.8598C3.80439 14.2796 3.99295 14.6722 4.30109 14.9592C4.60922 15.2461 5.01425 15.4062 5.43528 15.4076H11.1442C11.5652 15.4062 11.9702 15.2461 12.2784 14.9592C12.5865 14.6722 12.7751 14.2796 12.8064 13.8598L13.3308 6.51866H3.24862L3.77306 13.8598Z" />
              <path d="M14.4008 4.29644H11.0675V2.62977C11.0675 2.48243 11.009 2.34112 10.9048 2.23694C10.8006 2.13275 10.6593 2.07422 10.5119 2.07422H6.06749C5.92015 2.07422 5.77884 2.13275 5.67465 2.23694C5.57047 2.34112 5.51194 2.48243 5.51194 2.62977V4.29644H2.1786C2.03126 4.29644 1.88995 4.35497 1.78577 4.45916C1.68158 4.56335 1.62305 4.70465 1.62305 4.852C1.62305 4.99934 1.68158 5.14065 1.78577 5.24483C1.88995 5.34902 2.03126 5.40755 2.1786 5.40755H14.4008C14.5482 5.40755 14.6895 5.34902 14.7937 5.24483C14.8978 5.14065 14.9564 4.99934 14.9564 4.852C14.9564 4.70465 14.8978 4.56335 14.7937 4.45916C14.6895 4.35497 14.5482 4.29644 14.4008 4.29644ZM6.62305 3.18533H9.95638V4.29644H6.62305V3.18533Z" />
            </svg>
          </Button>
        </div>
      ),
      enableColumnFilter: false,
      meta: 'w-actions sticky-action-column',
    }),
  ]
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      expanded,
      sorting,
      columnFilters,
    },
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    sortDescFirst: false,
    pageCount: 0,
    debugTable: true,
  })
  return (
    <>
      <TableView
        table={table}
        className="h-table-regular"
        // renderExpandedRow={renderExpandedRow}
      />
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterPost.update(
              produce(filterPost.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getallCustomPostData.page + 1}
          totalPage={props.getallCustomPostData.total_page}
          label={
            props.getallCustomPostData.total > 0 ? (
              <div className="hidden md:block">
                {props.getallCustomPostData.page * filterPost.filter.limit + 1}-
                {props.getallCustomPostData.page * filterPost.filter.limit +
                  data.length}{' '}
                trên tổng {props.getallCustomPostData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
          isPreviousData={props.isPreviousData}
        ></Pagination>
      </div>
      {/* {postChoose && (
        <UpdatePosModal
          isOpen={isShowModalUpdate}
          closeModal={() => setIsShowModalUpdate(false)}
          postDetail={postChoose}
        />
      )}
      {postChoose && isShowModalDelete && (
        <ConfirmDeletePostModal
          isOpen={isShowModalDelete}
          closeModal={() => {
            setIsShowModalDelete(false)
            setCustomPostChoose(undefined)
          }}
          postDetail={postChoose}
        />
      )} */}
    </>
  )
}

export default CustomPostBusinessTable
