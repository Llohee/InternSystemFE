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
import { useRouter } from 'next/router'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import TenantDetailViewModal from '../modal/tenant-detail-view'

interface UniversitysProps {
  getAllTenantData: GetAllTenantResponse
  setTenantChoose: (University: TenantDetail[]) => void
  isPreviousData: boolean
  type: string
}

const UniversityLinkTable = (props: UniversitysProps, ref: any) => {
  const filterTenantlink = useFilterForTenantStore()
  const router = useRouter()
  const [data, setData] = useState(() => [...props.getAllTenantData.data])
  const [sorting, setSorting] = useState<SortingState>([
    ...filterTenantlink.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    })),
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const roleIsSuperAdmin = useRoleIsSuperAdmin()

  const [isShowViewModal, setIsShowViewModal] = useState(false)
  const [tenantChoose, setTenantChoose] = useState<TenantDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<TenantDetail>({ data: data })
  useEffect(() => {
    filterTenantlink.update(
      produce(filterTenantlink.filter, (draftState: any) => {
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
    props.setTenantChoose(itemChoose)
  }, [itemChoose])
  useEffect(() => {
    if (isShowViewModal) {
      props.setTenantChoose([])
      clearChooseItems()
    }
  }, [isShowViewModal])
  useImperativeHandle(ref, () => {
    return { clearChooseItems }
  })
  useEffect(() => {
    setData([...props.getAllTenantData.data])
    setDataChoose(props.getAllTenantData.data)
    clearChooseItems()
  }, [props.getAllTenantData])
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
          {filterTenantlink.filter.page * filterTenantlink.filter.limit +
            1 +
            info.row.index}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-stt',
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Tên doanh nghiệp',
      cell: (info) => (
        <button
          onClick={() => {
            if (props.type === 'link') {
              router.push(
                `/tenant-link/${info.row.original.id}/?tenant_name=${info.row.original.name}&tenant_code=${info.row.original.code}`
              )
            } else {
              setIsShowViewModal(true), setTenantChoose(info.row.original)
            }
          }}
          className="hover:text-brand-hover"
        >
          {info.getValue()}
        </button>
      ),
      enableColumnFilter: true,
      meta: 'w-name',
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      enableColumnFilter: true,
      meta: 'w-name pl-10',
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
              setIsShowViewModal(true)
              setTenantChoose(info.row.original)
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

  const { type, is_readed, university_id } = router.query
  return (
    <>
      <TableView table={table} className="h-table-regular" />
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterTenantlink.update(
              produce(filterTenantlink.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllTenantData.page + 1}
          totalPage={props.getAllTenantData.total_page}
          label={
            props.getAllTenantData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllTenantData.page * filterTenantlink.filter.limit +
                  1}
                -
                {props.getAllTenantData.page * filterTenantlink.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllTenantData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
        ></Pagination>
      </div>
      {/* {typeof type === 'string' &&
        typeof is_readed === 'string' &&
        typeof university_id === 'string' && (
          <AcceptRequestLink
            isOpen={isShowModalAccept}
            closeModal={() => {
              setIsShowModalAccept(false)
              router.push('/tenant-link')
            }}
            university_id={university_id}
          />
        )} */}
      {tenantChoose && (
        <TenantDetailViewModal
          isOpen={isShowViewModal}
          closeModal={() => setIsShowViewModal(false)}
          tenantDetail={tenantChoose}
          type={props.type}
        />
      )}
    </>
  )
}

export default forwardRef(UniversityLinkTable)
