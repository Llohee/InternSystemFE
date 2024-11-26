import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useChooseMulti } from '@/components/ui/table/hooks'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useFilterForReportLecturerStore } from '@/hooks/zustand/filter-for-report-lecturer'
import { GetAllReportLecturerResponse, UserGetDetail } from '@/models/api'
import {
  ColumnFiltersState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import produce from 'immer'
import { useRouter } from 'next/router'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useGetAllStudentMutation } from './hook'

interface ReportLecturersProps {
  getAllReportLecturerData: GetAllReportLecturerResponse
  setReportLecturerChoose: (ReportLecturer: UserGetDetail[]) => void
  isPreviousData: boolean
  profession: string
  group_id: string
}

const ReportLecturerTable = (props: ReportLecturersProps, ref: any) => {
  const router = useRouter()
  const filterUser = useFilterForReportLecturerStore()
  const [data, setData] = useState(() => [
    ...props.getAllReportLecturerData.data,
  ])
  const [sorting, setSorting] = useState<SortingState>([
    ...filterUser.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    })),
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [userChoose, setUserChoose] = useState<UserGetDetail>()
  const mutation = useGetAllStudentMutation(userChoose)
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<UserGetDetail>({ data: data })
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.sort = [
          ...sorting.map((val: any) => ({
            name: val.id,
            type: val.desc,
          })),
        ]
      })
    )
  }, [sorting])
  useEffect(() => {
    props.setReportLecturerChoose(itemChoose)
  }, [itemChoose])
  useEffect(() => {
    if (isShowModalUpdate) {
      props.setReportLecturerChoose([])
      clearChooseItems()
    }
  }, [isShowModalUpdate])
  useImperativeHandle(ref, () => {
    return { clearChooseItems }
  })
  useEffect(() => {
    setData([...props.getAllReportLecturerData.data])
    setDataChoose(props.getAllReportLecturerData.data)
    clearChooseItems()
  }, [props.getAllReportLecturerData])
  const columnHelper = createColumnHelper<UserGetDetail>()

  const columns = [
    columnHelper.display({
      id: 'number',
      header: () => 'STT',
      cell: (info) => (
        <div>
          {filterUser.filter.page * filterUser.filter.limit +
            1 +
            info.row.index}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('id_number', {
      header: 'MSSV',
      cell: (info) => (
        // <Link
        //   href={`lecturer/${info.row.original.id}?profession=${props.profession}&group_id=${props.group_id}`}
        //   className="relative text-primary-base truncate"
        // >
        <button
          onClick={async () => {
            mutation.mutate(undefined, {
              onError: (error) => {
                toast(
                  'Ứng viên này chưa ở trong nhóm, hãy liên hệ nhà trường để được hỗ trợ !',
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-secondary1-base"
                      >
                        <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                      </svg>
                    ),
                    id: 'noti-alert-variant',
                  }
                )
              },
              onSuccess: () => {
                router.push(
                  `lecturer/${info.row.original.id}?profession=${props.profession}&group_id=${props.group_id}`
                )
              },
            })
            setUserChoose(info.row.original)
          }}
        >
          <div className="max-w-[210px] truncate">{info.getValue()}</div>
        </button>
        // </Link>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('fullname', {
      header: 'Tên sinh viên',
      cell: (info) => (
        <button
          onClick={async () => {
            mutation.mutate(undefined, {
              onError: (error) => {
                toast(
                  'Ứng viên này chưa ở trong nhóm, hãy liên hệ nhà trường để được hỗ trợ !',
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-secondary1-base"
                      >
                        <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                      </svg>
                    ),
                    id: 'noti-alert-variant',
                  }
                )
              },
              onSuccess: () => {
                router.push(
                  `lecturer/${info.row.original.id}?profession=${props.profession}&group_id=${props.group_id}`
                )
              },
            })
            setUserChoose(info.row.original)
          }}
        >
          <div className="max-w-[210px] truncate">{info.getValue()}</div>
        </button>
      ),
      enableColumnFilter: true,
      meta: 'w-name',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => (
        <div className="w-full flex justify-start">
          <Tooltip
            tootipDetail={
              <div className="max-w-[340px] whitespace-normal overflow-auto ">
                <div className="line-clamp-2">{info.getValue()}</div>
              </div>
            }
            placementTootip="bottom-start"
          >
            <button
              onClick={async () => {
                mutation.mutate(undefined, {
                  onError: (error) => {
                    toast(
                      'Ứng viên này chưa ở trong nhóm, hãy liên hệ nhà trường để được hỗ trợ !',
                      {
                        icon: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5 text-secondary1-base"
                          >
                            <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                          </svg>
                        ),
                        id: 'noti-alert-variant',
                      }
                    )
                  },
                  onSuccess: () => {
                    router.push(
                      `lecturer/${info.row.original.id}?profession=${props.profession}&group_id=${props.group_id}`
                    )
                  },
                })
                setUserChoose(info.row.original)
              }}
            >
              <div className="max-w-[210px] truncate">{info.getValue()}</div>
            </button>
          </Tooltip>
        </div>
      ),
      enableColumnFilter: false,
      enableSorting: true,
      meta: 'w-name',
    }),
    columnHelper.accessor('phone', {
      header: 'Số điện thoại',
      enableColumnFilter: true,
      meta: 'w-name',
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      // columnVisibility: { tenant: roleIsSuperAdmin },
      sorting,
    },
    onSortingChange: setSorting,
    sortDescFirst: false,
    pageCount: 0,
    debugTable: true,
  })

  return (
    <>
      <TableView table={table} className="h-table-taller" />
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterUser.update(
              produce(filterUser.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllReportLecturerData.page + 1}
          totalPage={props.getAllReportLecturerData.total_page}
          label={
            props.getAllReportLecturerData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllReportLecturerData.page * filterUser.filter.limit +
                  1}
                -
                {props.getAllReportLecturerData.page * filterUser.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllReportLecturerData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
        ></Pagination>
      </div>
    </>
  )
}

export default forwardRef(ReportLecturerTable)
