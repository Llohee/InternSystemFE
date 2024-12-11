import { useRoleIsSuperAdmin } from '@/components/auth/hooks'
import {
  DATE_FORMAT_VIEW,
  YEAR_FORMAT_VIEW,
} from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import { Chevron } from '@/components/ui/icon'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useFilterForSchoolYearStore } from '@/hooks/zustand/filter-for-school-year'
import {
  GetAllSchoolYearResponse,
  SchoolYearDetail,
  SemesterDetail,
} from '@/models/api'
import {
  ColumnFiltersState,
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import produce from 'immer'
import React, { useEffect, useState } from 'react'
import CreateSemesteModal from '../semester/create-semester'
import UpdateSchoolYearModal from '../modal/update-school-year'
import { ViewStatusYearSemester } from '../common/status-view'
import ConfirmDeleteSchoolYearModal from '../modal/confirm-delete-school-year'
import UpdateSemesterModal from '../semester/update-semester'
import ConfirmDeleteSemesterModal from '../semester/confirm-delete-semester'

const SchoolYearTable = (props: {
  getAllSchoolYearData: GetAllSchoolYearResponse
  isPreviousData: boolean
}) => {
  const filterSchoolYear = useFilterForSchoolYearStore()
  const [data, setData] = React.useState(() => [
    ...props.getAllSchoolYearData.data,
  ])

  const [sorting, setSorting] = React.useState<SortingState>(
    filterSchoolYear.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    }))
  )

  {
    /* SchoolYear  - Danh sách năm học - row.depth == 0 */
  }
  const [isShowModalCreateSchoolYear, setIsShowModalCreateSchoolYear] =
    useState(false)
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [schoolYearChoose, setSchoolYearChoose] = useState<SchoolYearDetail>()

  {
    /* Semester  - Danh sách kì học - row.depth == 1 */
  }
  const [isShowModalCreateSemester, setIsShowModalCreateSemester] =
    useState(false)
  const [isShowModalUpdateSemester, setIsShowModalUpdateSemester] =
    useState(false)
  const [isShowModalDeleteSemester, setIsShowModalDeleteSemester] =
    useState(false)
  const [semesterChoose, setSemesterChoose] = useState<
    SemesterDetail | undefined
  >(undefined)

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const sortColumn = () => {
    filterSchoolYear.update(
      produce(filterSchoolYear.filter, (draftState: any) => {
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
  // useEffect(() => {
  //   if (!isShowModalUpdate) setServiceChoose(undefined)
  // }, [isShowModalUpdate])
  useEffect(() => {
    setData([...props.getAllSchoolYearData.data])
  }, [props.getAllSchoolYearData])

  const columnHelper = createColumnHelper<SchoolYearDetail>()
  const roleIsSuperAdmin = useRoleIsSuperAdmin()

  const columns = [
    columnHelper.display({
      id: 'number',
      header: 'STT',
      cell: (info) => (
        <div>
          {info.row.depth == 0 &&
            filterSchoolYear.filter.page * filterSchoolYear.filter.limit +
              1 +
              info.row.index}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('name', {
      header: ({ table }) => (
        <div className="flex items-center gap-3">
          {table.getCanSomeRowsExpand() && (
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <Chevron expanded />
              ) : (
                <Chevron />
              )}
            </button>
          )}
          Năm học
        </div>
      ),
      cell: (info) => (
        <div
          id={`${info.row.depth != 0 && 'cell-enable-overflow'}`}
          className={`flex items-center gap-3 ${
            info.row.getIsExpanded() &&
            info.row.getCanExpand() &&
            'text-primary-base'
          }`}
          style={{
            paddingLeft: `${info.row.depth * 2.5}rem`,
          }}
        >
          {info.row.getCanExpand() && (
            <button
              {...{
                onClick: info.row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {info.row.getIsExpanded() ? <Chevron expanded /> : <Chevron />}
            </button>
          )}
          {dayjs(info.getValue()?.start).format(YEAR_FORMAT_VIEW)} -{' '}
          {dayjs(info.getValue()?.end).format(YEAR_FORMAT_VIEW)}
        </div>
      ),
      enableColumnFilter: true,
      meta: `w-name`,
    }),
    columnHelper.accessor('start_day', {
      header: 'Ngày bắt đầu',
      cell: (info) => (
        <div>{dayjs(info.getValue()).format(DATE_FORMAT_VIEW)}</div>
      ),
      enableColumnFilter: true,
      meta: 'w-description pl-10',
    }),
    columnHelper.accessor('end_day', {
      header: 'Ngày kết thúc',
      cell: (info) => (
        <div>{dayjs(info.getValue()).format(DATE_FORMAT_VIEW)}</div>
      ),
      enableColumnFilter: true,
      meta: 'w-description pl-10',
    }),
    columnHelper.accessor('description', {
      header: 'Mô tả',
      enableColumnFilter: true,
      meta: 'w-description pl-10',
    }),
    columnHelper.accessor('status', {
      header: 'Trạng thái',
      enableColumnFilter: true,
      cell: (info) => (
        <div>
          <ViewStatusYearSemester status={info.getValue() ?? 'PAST'} />
        </div>
      ),
      meta: 'w-description pl-10',
    }),

    columnHelper.display({
      id: 'action',
      header: 'Tác vụ',
      cell: (info) => (
        <>
          {info.row.original.status === 'UPCOMING' && (
            <div className="flex gap-3">
              {[0].includes(info.row.depth) && (
                <Button
                  intent={'grey'}
                  btnStyle="no-background"
                  iconOnly
                  onClick={() => {
                    if (info.row.depth == 0) {
                      setIsShowModalCreateSemester(true)
                      setSchoolYearChoose(info.row.original)
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.9091 0.909091C10.9091 0.407014 10.5021 0 10 0C9.49792 0 9.09091 0.407014 9.09091 0.909091V9.09091H0.909091C0.407014 9.09091 0 9.49792 0 10C0 10.5021 0.407014 10.9091 0.909091 10.9091H9.09091V19.0909C9.09091 19.593 9.49792 20 10 20C10.5021 20 10.9091 19.593 10.9091 19.0909V10.9091H19.0909C19.593 10.9091 20 10.5021 20 10C20 9.49792 19.593 9.09091 19.0909 9.09091H10.9091V0.909091Z" />
                  </svg>
                </Button>
              )}
              <Button
                intent={'grey'}
                btnStyle="no-background"
                iconOnly
                onClick={() => {
                  if (info.row.depth == 0) {
                    setIsShowModalUpdate(true)
                    setSchoolYearChoose(info.row.original as SchoolYearDetail)
                  } else if (info.row.depth == 1) {
                    setIsShowModalUpdateSemester(true)
                    setSchoolYearChoose(info.row.getParentRow()?.original)
                    setSemesterChoose(info.row.original as SemesterDetail)
                  } else {
                    throw new Error('Error')
                  }
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_7894_103644)">
                    <path d="M13.7971 15.4076H2.20276C2.04901 15.4076 1.90156 15.3465 1.79284 15.2378C1.68412 15.129 1.62305 14.9816 1.62305 14.8278C1.62305 14.6741 1.68412 14.5266 1.79284 14.4179C1.90156 14.3092 2.04901 14.2481 2.20276 14.2481H13.7971C13.9508 14.2481 14.0983 14.3092 14.207 14.4179C14.3157 14.5266 14.3768 14.6741 14.3768 14.8278C14.3768 14.9816 14.3157 15.129 14.207 15.2378C14.0983 15.3465 13.9508 15.4076 13.7971 15.4076Z" />
                    <path d="M8.33963 4.39296L3.53205 9.20054C3.45772 9.27491 3.40502 9.36809 3.37959 9.47011L2.20276 13.0887L5.82135 11.9119C5.92337 11.8864 6.01655 11.8337 6.09091 11.7594L10.8985 6.95182L8.33963 4.39296Z" />
                    <path d="M13.0475 3.9831L11.3084 2.24395C11.1996 2.13527 11.0522 2.07422 10.8985 2.07422C10.7448 2.07422 10.5973 2.13527 10.4886 2.24395L9.15935 3.57324L11.7182 6.1321L13.0475 4.80282C13.1562 4.6941 13.2172 4.54668 13.2172 4.39296C13.2172 4.23924 13.1562 4.09181 13.0475 3.9831Z" />
                  </g>
                </svg>
              </Button>
              <Button
                intent={'grey'}
                btnStyle="no-background"
                iconOnly
                onClick={() => {
                  if (info.row.depth == 0) {
                    setIsShowModalDelete(true)
                    setSchoolYearChoose(info.row.original)
                  } else if (info.row.depth == 1) {
                    setIsShowModalDeleteSemester(true)
                    setSemesterChoose(info.row.original as SemesterDetail)
                  } else {
                    throw new Error('Error')
                  }
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
          )}
        </>
      ),
      enableColumnFilter: false,
      meta: 'w-[100px] sticky-action-column',
    }),
  ]

  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      expanded,
      columnVisibility: { tenant: roleIsSuperAdmin },
      sorting,
      columnFilters,
    },
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.semester as SemesterDetail[] | undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    sortDescFirst: false,
    pageCount: 0,
    debugTable: true,
  })

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'name') {
      if (table.getState().sorting[0]?.id !== 'name') {
        table.setSorting([{ id: 'name', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  const renderExpandedRow = ({ row }: { row: Row<SchoolYearDetail> }) => {
    return (
      <div
        style={{
          paddingLeft: `${(row.depth + 1) * 2.5}rem`,
        }}
        className="flex items-center gap-3"
      >
        <span>Danh sách kì học</span>
        <Button
          size="small"
          btnStyle="transparent-background"
          intent="primary"
          className="!bg-primary-background"
          onClick={() => {
            if (row.depth == 0) {
              setIsShowModalCreateSemester(true)
              setSchoolYearChoose(row.original)
            } else {
              throw new Error('The only permitted Service are level 1, 2, 3')
            }
          }}
          disabled={row.original.status !== 'UPCOMING'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="currentColor"
          >
            <path d="M9.28445 2.90684C9.28445 2.57212 9.0131 2.30078 8.67839 2.30078C8.34367 2.30078 8.07232 2.57212 8.07232 2.90684V8.36139H2.61778C2.28306 8.36139 2.01172 8.63273 2.01172 8.96745C2.01172 9.30217 2.28306 9.57351 2.61778 9.57351H8.07232V15.0281C8.07232 15.3628 8.34367 15.6341 8.67839 15.6341C9.0131 15.6341 9.28445 15.3628 9.28445 15.0281V9.57351H14.739C15.0737 9.57351 15.3451 9.30217 15.3451 8.96745C15.3451 8.63273 15.0737 8.36139 14.739 8.36139H9.28445V2.90684Z" />
          </svg>
          Thêm kì học
        </Button>
      </div>
    )
  }
  return (
    <>
      <TableView
        table={table}
        className="h-table-taller"
        renderExpandedRow={renderExpandedRow}
      />
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterSchoolYear.update(
              produce(filterSchoolYear.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllSchoolYearData.page + 1}
          totalPage={props.getAllSchoolYearData.total_page}
          label={
            props.getAllSchoolYearData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllSchoolYearData.page *
                  filterSchoolYear.filter.limit +
                  1}
                -
                {props.getAllSchoolYearData.page *
                  filterSchoolYear.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllSchoolYearData.total}
              </div>
            ) : (
              <></>
            )
          }
          isPreviousData={props.isPreviousData}
        ></Pagination>
      </div>
      {schoolYearChoose && (
        <CreateSemesteModal
          isOpen={isShowModalCreateSemester}
          closeModal={() => setIsShowModalCreateSemester(false)}
          schoolyearDetail={schoolYearChoose}
          semesterDetail={semesterChoose}
        />
      )}
      {schoolYearChoose && (
        <UpdateSchoolYearModal
          isOpen={isShowModalUpdate}
          closeModal={() => setIsShowModalUpdate(false)}
          schoolyearDetail={schoolYearChoose}
        />
      )}
      {schoolYearChoose && semesterChoose && (
        <UpdateSemesterModal
          isOpen={isShowModalUpdateSemester}
          closeModal={() => setIsShowModalUpdateSemester(false)}
          schoolyearDetail={schoolYearChoose}
          semesterDetail={semesterChoose}
        />
      )}
      {schoolYearChoose && (
        <ConfirmDeleteSchoolYearModal
          isOpen={isShowModalDelete}
          closeModal={() => setIsShowModalDelete(false)}
          schoolyearDetail={schoolYearChoose}
        />
      )}
      {semesterChoose && (
        <ConfirmDeleteSemesterModal
          isOpen={isShowModalDeleteSemester}
          closeModal={() => setIsShowModalDeleteSemester(false)}
          semesterDetail={semesterChoose}
        />
      )}
    </>
  )
}

export default SchoolYearTable
