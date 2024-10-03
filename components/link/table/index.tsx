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
// import UpdateUserModal from '../modal/update-user'
import { queryClient } from '@/pages/_app'
import { UniversityKeys } from '@/hooks/query/university'
import { useFilterForUniversityStore } from '@/hooks/zustand/filter-for-university'
import { GetAllUniversityResponse, UniversityDetail } from '@/models/api'
import Link from 'next/link'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import ConfirmRequestLink from '../modal/confirm-request-link'
import { useRouter } from 'next/router'
import AcceptRequestLink from '../modal/accept-request-link'

interface UniversitysProps {
  getAllUniversityData: GetAllUniversityResponse
  setUniversityChoose: (University: UniversityDetail[]) => void
  isPreviousData: boolean
  type: string
}

const UniversityLinkTable = (props: UniversitysProps, ref: any) => {
  const filterUniversity = useFilterForUniversityStore()
  const [data, setData] = useState(() => [...props.getAllUniversityData.data])
  const [sorting, setSorting] = useState<SortingState>([
    ...filterUniversity.filter.sort.map((val: any) => ({
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
  const [universityChoose, setUniversityChoose] = useState<UniversityDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<UniversityDetail>({ data: data })
  useEffect(() => {
    filterUniversity.update(
      produce(filterUniversity.filter, (draftState: any) => {
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
    if (isShowModalConfirm) {
      props.setUniversityChoose([])
      clearChooseItems()
    }
  }, [isShowModalConfirm])
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
          {filterUniversity.filter.page * filterUniversity.filter.limit +
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
                setUniversityChoose(info.row.original)
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
            filterUniversity.update(
              produce(filterUniversity.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllUniversityData.page + 1}
          totalPage={props.getAllUniversityData.total_page}
          label={
            props.getAllUniversityData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllUniversityData.page *
                  filterUniversity.filter.limit +
                  1}
                -
                {props.getAllUniversityData.page *
                  filterUniversity.filter.limit +
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
      <ConfirmRequestLink
        isOpen={isShowModalConfirm}
        closeModal={() => {
          setIsShowModalConfirm(false)
        }}
        universityDetail={universityChoose}
      />
      {typeof type === 'string' &&
        typeof is_readed === 'string' &&
        typeof university_id === 'string' && (
          <AcceptRequestLink
            isOpen={isShowModalAccept}
            closeModal={() => {
              setIsShowModalAccept(false)
            }}
            university_id={university_id}
          />
        )}
    </>
  )
}

export default forwardRef(UniversityLinkTable)
