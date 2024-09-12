import { useRoleIsSuperAdmin } from '@/components/auth/hooks'
import { Button } from '@/components/ui/button/button'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useChooseMulti } from '@/components/ui/table/hooks'
import {
  ColumnFiltersState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import produce from 'immer'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { GetAllReportLecturerResponse, ReportLecturerDetail } from '@/models/api'
import dayjs from 'dayjs'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import Link from 'next/link'
import { useFilterForReportLecturerStore } from '@/hooks/zustand/filter-for-report-lecturer'

interface ReportLecturersProps {
  getAllReportLecturerData: GetAllReportLecturerResponse
  setReportLecturerChoose: (ReportLecturer: ReportLecturerDetail[]) => void
  isPreviousData: boolean
}

const ReportLecturerTable = (props: ReportLecturersProps, ref: any) => {
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
  const [userChoose, setUserChoose] = useState<ReportLecturerDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<ReportLecturerDetail>({ data: data })
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
  const columnHelper = createColumnHelper<ReportLecturerDetail>()

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
    columnHelper.accessor('code', {
      header: 'MSSV',
      cell: (info) => (
        <Link
          href={`report/${info.row.original.id}`}
          className="relative text-primary-base truncate"
        >
          <div className="max-w-[210px] truncate">{info.getValue()}</div>
        </Link>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('fullname', {
      header: 'Tên sinh viên',
      cell: (info) => (
        <Link
          href={`lecturer/${info.row.original.id}`}
          className="relative hover:text-primary-base truncate"
        >
          <div className="max-w-[210px] truncate">{info.getValue()}</div>
        </Link>
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
            <Link
              href={`report/${info.row.original.id}`}
              className="relative hover:text-primary-base truncate"
            >
              <div className="max-w-[210px] truncate">{info.getValue()}</div>
            </Link>
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
