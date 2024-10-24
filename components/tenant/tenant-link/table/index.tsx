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
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useFilterForTenantStore } from '@/hooks/zustand/filter-for-tenant'
import { GetAllTenantResponse, TenantDetail } from '@/models/api'
import { useRouter } from 'next/router'
import AcceptRequestLink from '../modal/accept-request-link'
import ConfirmRequestLink from '../modal/confirm-request-link'
import Link from 'next/link'
import TenantDetailViewModal from '../modal/tenant-detail-view'

interface UniversitysProps {
  getAllTenantData: GetAllTenantResponse
  setTenantChoose: (University: TenantDetail[]) => void
  isPreviousData: boolean
  type: string
}

const UniversityLinkTable = (props: UniversitysProps, ref: any) => {
  const filterTenantlink = useFilterForTenantStore()
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
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
  const [isShowModalAccept, setIsShowModalAccept] = useState(true)
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
    if (isShowModalConfirm) {
      props.setTenantChoose([])
      clearChooseItems()
    }
  }, [isShowModalConfirm])
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
        <Link
          href={`/tenant-link/${info.row.original.id}/?tenant_name=${info.row.original.name}&tenant_code=${info.row.original.code}`}
        >
          {info.getValue()}
        </Link>
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
          <Tooltip
            placementTootip="left"
            tootipDetail={
              <>{props.type === 'link' ? 'Hủy liên kết' : 'Liên kết'}</>
            }
          >
            <Button
              intent="grey"
              iconOnly
              ariaLabel="Open update row modal"
              btnStyle="no-background"
              onClick={() => {
                setIsShowModalConfirm(true)
                setTenantChoose(info.row.original)
              }}
            >
              {props.type === 'link' ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.0705 4.85151L12.1883 6.73375C11.8333 7.08877 11.2577 7.08877 10.9026 6.73375C10.5476 6.37873 10.5476 5.80313 10.9026 5.4481L12.7968 3.55393C13.8175 2.55771 15.1873 2.00011 16.6136 2.00011C18.0399 2.00011 19.4097 2.55776 20.4304 3.55398L19.7955 4.20457L20.446 3.5696C21.4423 4.59032 21.9999 5.96009 21.9999 7.38638C21.9999 8.81268 21.4423 10.1824 20.446 11.2032L20.4383 11.2111L18.5519 13.0974C18.1969 13.4524 17.6213 13.4524 17.2663 13.0974C16.9112 12.7424 16.9112 12.1668 17.2663 11.8117L19.1485 9.9295C19.811 9.24879 20.1817 8.33638 20.1817 7.38638C20.1817 6.43833 19.8125 5.52771 19.1526 4.84745C18.4723 4.18753 17.5617 3.81829 16.6136 3.81829C15.6636 3.81829 14.7512 4.18904 14.0705 4.85151Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.73375 10.9026C7.08877 11.2577 7.08877 11.8333 6.73375 12.1883L4.85151 14.0705C4.18904 14.7512 3.81829 15.6636 3.81829 16.6136C3.81829 17.5617 4.18753 18.4723 4.84745 19.1526C5.52771 19.8125 6.43833 20.1817 7.38638 20.1817C8.33638 20.1817 9.24879 19.811 9.9295 19.1485L11.8117 17.2663C12.1668 16.9112 12.7424 16.9112 13.0974 17.2663C13.4524 17.6213 13.4524 18.1969 13.0974 18.5519L11.2032 20.4461C10.1825 21.4423 8.81268 21.9999 7.38638 21.9999C5.96009 21.9999 4.59032 21.4423 3.5696 20.446L4.20457 19.7955L3.55398 20.4304C2.55776 19.4097 2.00011 18.0399 2.00011 16.6136C2.00011 15.1873 2.55776 13.8176 3.55398 12.7969L3.56169 12.7889L5.4481 10.9026C5.80313 10.5476 6.37873 10.5476 6.73375 10.9026Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.91555 14.0844C10.2706 14.4395 10.2706 15.0151 9.91555 15.3701L9.00646 16.2792C8.65144 16.6342 8.07583 16.6342 7.72081 16.2792C7.36579 15.9242 7.36579 15.3486 7.72081 14.9935L8.6299 14.0844C8.98493 13.7294 9.56053 13.7294 9.91555 14.0844Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.2792 7.72081C16.6342 8.07583 16.6342 8.65144 16.2792 9.00646L15.3701 9.91555C15.0151 10.2706 14.4395 10.2706 14.0844 9.91555C13.7294 9.56053 13.7294 8.98493 14.0844 8.6299L14.9935 7.72081C15.3486 7.36579 15.9242 7.36579 16.2792 7.72081Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.26627 2.26627C2.62129 1.91124 3.19689 1.91124 3.55192 2.26627L21.7337 20.4481C22.0888 20.8031 22.0888 21.3787 21.7337 21.7337C21.3787 22.0888 20.8031 22.0888 20.4481 21.7337L2.26627 3.55192C1.91124 3.19689 1.91124 2.62129 2.26627 2.26627Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.0705 4.85142L11.7337 7.18823C11.3787 7.54326 10.8031 7.54326 10.4481 7.18823C10.093 6.83321 10.093 6.2576 10.4481 5.90257L12.7968 3.55383C13.8175 2.55761 15.1874 2 16.6137 2C18.04 2 19.4098 2.55766 20.4305 3.55388L19.7955 4.20447L20.4461 3.5695C21.4423 4.59023 22 5.96001 22 7.38632C22 8.81263 21.4423 10.1824 20.4461 11.2031L20.4384 11.211L18.0974 13.5519C17.7424 13.907 17.1668 13.907 16.8117 13.5519C16.4567 13.1969 16.4567 12.6213 16.8117 12.2663L19.1486 9.92946C19.811 9.24874 20.1818 8.33632 20.1818 7.38632C20.1818 6.43826 19.8125 5.52763 19.1526 4.84736C18.4724 4.18744 17.5617 3.8182 16.6137 3.8182C15.6637 3.8182 14.7512 4.18895 14.0705 4.85142Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.18823 10.4481C7.54326 10.8031 7.54326 11.3787 7.18823 11.7337L4.85142 14.0705C4.18895 14.7512 3.8182 15.6637 3.8182 16.6137C3.8182 17.5617 4.18744 18.4724 4.84736 19.1526C5.52763 19.8125 6.43826 20.1818 7.38632 20.1818C8.33632 20.1818 9.24874 19.811 9.92946 19.1486L12.2663 16.8117C12.6213 16.4567 13.1969 16.4567 13.5519 16.8117C13.907 17.1668 13.907 17.7424 13.5519 18.0974L11.2032 20.4461C10.1825 21.4424 8.81263 22 7.38632 22C5.96001 22 4.59023 21.4423 3.5695 20.4461L4.20447 19.7955L3.55388 20.4305C2.55766 19.4098 2 18.04 2 16.6137C2 15.1874 2.55766 13.8176 3.55388 12.7968L3.5616 12.7889L5.90257 10.4481C6.2576 10.093 6.83321 10.093 7.18823 10.4481Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.2792 7.72075C16.6342 8.07578 16.6342 8.65139 16.2792 9.00641L9.00641 16.2792C8.65139 16.6342 8.07578 16.6342 7.72075 16.2792C7.36573 15.9242 7.36573 15.3486 7.72075 14.9935L14.9935 7.72075C15.3486 7.36573 15.9242 7.36573 16.2792 7.72075Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </Button>
          </Tooltip>
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
  const router = useRouter()
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
      <ConfirmRequestLink
        isOpen={isShowModalConfirm}
        closeModal={() => {
          setIsShowModalConfirm(false)
        }}
        tenantDetail={tenantChoose}
      />
      {typeof type === 'string' &&
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
        )}
      {tenantChoose && (
        <TenantDetailViewModal
          isOpen={isShowViewModal}
          closeModal={() => setIsShowViewModal(false)}
          tenantDetail={tenantChoose}
        />
      )}
    </>
  )
}

export default forwardRef(UniversityLinkTable)
