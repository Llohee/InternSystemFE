import { Button } from '@/components/ui/button/button'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useFilterForPostBusinessStore } from '@/hooks/zustand/filter-for-post'
import { CVDetail, GetAllPostResponse, PostDetail } from '@/models/api'
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
import dayjs from 'dayjs'
import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Pill } from '@/components/ui/pill'
import DetailViewPostModal from '../modal/detail-view-post-modal'

const TenantPostTable = (props: {
  getallTenantPostData: GetAllPostResponse
  isPreviousData: boolean
}) => {
  const [isShowModalView, setIsShowModalView] = useState(false)
  const [postChoose, setPostChoose] = useState<PostDetail>()

  const filterPost = useFilterForPostBusinessStore()
  const [data, setData] = React.useState(() => [
    ...props.getallTenantPostData.data,
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
    setData([...props.getallTenantPostData.data])
  }, [props.getallTenantPostData])

  const columnHelper = createColumnHelper<PostDetail>()

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
    columnHelper.accessor('local', {
      header: 'Địa điểm',
      cell: (info) => <div>{info.getValue().name}</div>,
      enableColumnFilter: true,
      meta: 'w-boolean',
    }),
    columnHelper.accessor('position', {
      header: 'Vị trí',
      cell: (info) => <div>{info.getValue().name}</div>,
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
    columnHelper.accessor('CV_applying', {
      header: 'Số lượng ứng tuyển',
      cell: (info) => {
        const cvApplyingArray = info.getValue() as any[] | undefined
        return (
          <p>
            {Array.isArray(cvApplyingArray) && cvApplyingArray.length > 0 ? (
              <Pill intent={'primary'}>{cvApplyingArray.length}</Pill>
            ) : (
              <Pill intent={'grey'}>0</Pill>
            )}
          </p>
        )
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
              setIsShowModalView(true)
              setPostChoose(info.row.original)
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
          pageCurrent={props.getallTenantPostData.page + 1}
          totalPage={props.getallTenantPostData.total_page}
          label={
            props.getallTenantPostData.total > 0 ? (
              <div className="hidden md:block">
                {props.getallTenantPostData.page * filterPost.filter.limit + 1}-
                {props.getallTenantPostData.page * filterPost.filter.limit +
                  data.length}{' '}
                trên tổng {props.getallTenantPostData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
          isPreviousData={props.isPreviousData}
        ></Pagination>
      </div>
      {postChoose && (
        <DetailViewPostModal
          isOpen={isShowModalView}
          closeModal={() => setIsShowModalView(false)}
          postDetail={postChoose}
        />
      )}
    </>
  )
}

export default TenantPostTable
