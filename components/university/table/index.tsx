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
import { useFilterForUniversityStore } from '@/hooks/zustand/filter-for-university'
import { GetAllUniversityResponse, UniversityDetail } from '@/models/api'
import dayjs from 'dayjs'

interface UniversitysProps {
  getAllUniversityData: GetAllUniversityResponse
  setUniversityChoose: (university: UniversityDetail[]) => void
  isPreviousData: boolean
}

const UniversityTable = (props: UniversitysProps, ref: any) => {
  const filterUser = useFilterForUniversityStore()
  const [data, setData] = useState(() => [...props.getAllUniversityData.data])
  const [sorting, setSorting] = useState<SortingState>([
    ...filterUser.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    })),
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const roleIsSuperAdmin = useRoleIsSuperAdmin()
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [userChoose, setUserChoose] = useState<UniversityDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<UniversityDetail>({ data: data })
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
    props.setUniversityChoose(itemChoose)
  }, [itemChoose])
  useEffect(() => {
    if (isShowModalUpdate) {
      props.setUniversityChoose([])
      clearChooseItems()
    }
  }, [isShowModalUpdate])
  useImperativeHandle(ref, () => {
    return { clearChooseItems }
  })
  useEffect(() => {
    setData([...props.getAllUniversityData.data])
    setDataChoose(props.getAllUniversityData.data)
    clearChooseItems()
  }, [props.getAllUniversityData])
  const columnHelper = createColumnHelper<UniversityDetail>()

  const columns = [
    columnHelper.display({
      id: 'choose',
      header: () => (
        <input
          type={'checkbox'}
          checked={chooseAllItems()}
          onChange={(e) => {
            toggleChooseAllItem(e.target.checked)
          }}
          className=""
        />
      ),
      cell: (propsCell) => (
        <input
          type={'checkbox'}
          checked={
            itemChoose.find((val: any) => val === propsCell.row.original) !=
            undefined
          }
          onChange={() => {
            toggleChooseItem(propsCell.row.original)
          }}
        />
      ),
      enableColumnFilter: false,
      meta: 'w-choose',
    }),
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
    columnHelper.accessor('name', {
      header: 'Tên trường học',
      enableColumnFilter: true,
      meta: 'w-name',
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      enableColumnFilter: true,
      meta: 'w-name pl-10',
    }),
    columnHelper.accessor('created_time', {
      header: 'Ngày tạo',
      cell: (info) => {
        return <p>{dayjs(info.getValue()).format(DATE_FORMAT_VIEW)}</p>
      },
      enableColumnFilter: true,
      meta: 'w-tenant pl-10 ',
    }),
    columnHelper.display({
      id: 'action',
      header: () => 'Tác vụ',
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            intent="grey"
            iconOnly
            ariaLabel="Open update row modal"
            btnStyle="no-background"
            onClick={() => {
              setIsShowModalUpdate(true)
              setUserChoose(info.row.original)
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
        </div>
      ),
      enableColumnFilter: false,
      meta: 'w-actions sticky-action-column',
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { tenant: roleIsSuperAdmin },
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
          pageCurrent={props.getAllUniversityData.page + 1}
          totalPage={props.getAllUniversityData.total_page}
          label={
            props.getAllUniversityData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllUniversityData.page * filterUser.filter.limit + 1}-
                {props.getAllUniversityData.page * filterUser.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllUniversityData.total}
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

export default forwardRef(UniversityTable)
