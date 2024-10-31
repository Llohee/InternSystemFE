import { useRoleIsSuperAdmin } from '@/components/auth/hooks'
import { Button } from '@/components/ui/button/button'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableView } from '@/components/ui/table'
import { useChooseMulti } from '@/components/ui/table/hooks'
import { useFilterForTenantStore } from '@/hooks/zustand/filter-for-tenant'
import { GetAllTenantResponse, TenantDetail } from '@/models/api'
import {
  ColumnFiltersState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import produce from 'immer'
import Link from 'next/link'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import ConfirmDeleteBusinessModal from '../modal/confirm-delete-business'
import UpdateBusinessModal from '../modal/update-business'

interface BusinesssProps {
  getAllBusinessData: GetAllTenantResponse
  setBusinessChoose: (Business: TenantDetail[]) => void
  isPreviousData: boolean
  type: string
}

const BusinessTable = (props: BusinesssProps, ref: any) => {
  const filterTenant = useFilterForTenantStore()
  const [data, setData] = useState(() => [...props.getAllBusinessData.data])
  const [sorting, setSorting] = useState<SortingState>([
    ...filterTenant.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    })),
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const roleIsSuperAdmin = useRoleIsSuperAdmin()
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [businessChoose, setBusinessChoose] = useState<TenantDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<TenantDetail>({ data: data })
  useEffect(() => {
    filterTenant.update(
      produce(filterTenant.filter, (draftState: any) => {
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
    props.setBusinessChoose(itemChoose)
  }, [itemChoose])
  useEffect(() => {
    if (isShowModalUpdate) {
      props.setBusinessChoose([])
      clearChooseItems()
    }
  }, [isShowModalUpdate])
  useImperativeHandle(ref, () => {
    return { clearChooseItems }
  })
  useEffect(() => {
    setData([...props.getAllBusinessData.data])
    setDataChoose(props.getAllBusinessData.data)
    clearChooseItems()
  }, [props.getAllBusinessData])
  const columnHelper = createColumnHelper<TenantDetail>()

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
          {filterTenant.filter.page * filterTenant.filter.limit +
            1 +
            info.row.index}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('name', {
      header: 'Tên doanh nghiệp',
      enableColumnFilter: true,
      meta: 'w-name',
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      enableColumnFilter: true,
      meta: 'w-name pl-10',
    }),
    columnHelper.accessor('location', {
      header: 'Địa chỉ',
      enableColumnFilter: true,
      meta: 'w-description pl-10',
    }),
    columnHelper.accessor('website', {
      header: 'Website',
      cell: (info) => {
        return (
          <Link
            href={`${info.getValue()}`}
            className="text-primary-base"
            target="_blank"
          >
            {info.getValue()}
          </Link>
        )
      },
      enableColumnFilter: true,
      meta: 'w-description pl-10',
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
              setBusinessChoose(info.row.original)
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
            ariaLabel="Open delete row modal"
            onClick={() => {
              setIsShowModalDelete(true)
              setBusinessChoose(info.row.original)
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { tenant: roleIsSuperAdmin },
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    sortDescFirst: false,
    pageCount: 0,
    debugTable: true,
  })
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])
  
  return (
    <>
      <TableView table={table} className="h-table-regular" />
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterTenant.update(
              produce(filterTenant.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllBusinessData.page + 1}
          totalPage={props.getAllBusinessData.total_page}
          label={
            props.getAllBusinessData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllBusinessData.page * filterTenant.filter.limit + 1}-
                {props.getAllBusinessData.page * filterTenant.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllBusinessData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
        ></Pagination>
      </div>
      {businessChoose && isShowModalDelete && (
        <ConfirmDeleteBusinessModal
          isOpen={isShowModalDelete}
          closeModal={() => {
            setIsShowModalDelete(false)
            setBusinessChoose(undefined)
          }}
          type={props.type}
          businessDetail={businessChoose}
        />
      )}
      {businessChoose && isShowModalUpdate && (
        <UpdateBusinessModal
          isOpen={isShowModalUpdate}
          closeModal={() => {
            setIsShowModalUpdate(false)
            setBusinessChoose(undefined)
          }}
          type={props.type}
          businessDetail={businessChoose}
        />
      )}
    </>
  )
}

export default forwardRef(BusinessTable)
