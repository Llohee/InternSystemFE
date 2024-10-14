import PageError from '@/components/page-error/error'
import { Button } from '@/components/ui/button/button'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetAllTenant } from '@/hooks/query/tenant'
import { useFilterForTenantStore } from '@/hooks/zustand/filter-for-tenant'
import { TenantDetail } from '@/models/api'
import produce from 'immer'
import { useEffect, useRef, useState } from 'react'
import BusinessTable from './table'
import CreateBusinessModal from './modal/create-business'

const BusinessWrapper = (props : {type: string}) => {
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [totalBusiness, setTotalBusiness] = useState(0)

  const [BusinessChoose, setBusinessChoose] = useState<TenantDetail[]>()
  const filterBusiness = useFilterForTenantStore()
  // const templateLink = useGetTemplateLink()
  const allBusiness = useGetAllTenant(props.type)
  const tableRef = useRef<any>()
  useEffect(() => {
    if (allBusiness.status === 'success')
      setTotalBusiness(allBusiness.data.total)
  }, [allBusiness])
  return (
    <>
      <div className="">
        <div className="flex items-center py-4">
          <div className="flex gap-5 grow items-center">
            <div className="ml-2">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterBusiness.filter.name}
                className="lg:w-96 "
                onChange={(value) => {
                  filterBusiness.update(
                    produce(filterBusiness.filter, (draftState) => {
                      draftState.name = value.toString()
                      draftState.page = 0
                    })
                  )
                }}
                icon={<SearchIcon />}
              />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <Button
              onClick={() => {
                tableRef.current.clearChooseItems()
                setIsShowModalCreate(true)
              }}
              intent={'primary'}
              size="small"
              className="hidden md:flex gap-2 items-center text-typography-secondary"
              bounce
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <span>Tạo mới</span>
            </Button>
          </div>
          <div className="flex flex-col gap-3 md:hidden fixed z-10 bottom-14 right-2">
            <Button
              onClick={() => {
                tableRef.current.clearChooseItems()
              }}
              intent={'primary'}
              size="small"
              iconOnly
              ariaLabel="Open create with excel modal"
              className="hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 translate-y-[15%] translate-x-[15%]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.1914 4.63672L9.98828 0.433594C9.87109 0.316406 9.71289 0.25 9.54688 0.25H1.25C0.904297 0.25 0.625 0.529297 0.625 0.875V17.125C0.625 17.4707 0.904297 17.75 1.25 17.75H13.75C14.0957 17.75 14.375 17.4707 14.375 17.125V5.08008C14.375 4.91406 14.3086 4.75391 14.1914 4.63672ZM12.9336 5.36719H9.25781V1.69141L12.9336 5.36719ZM12.9688 16.3438H2.03125V1.65625H7.92969V5.875C7.92969 6.09256 8.01611 6.30121 8.16995 6.45505C8.32379 6.60889 8.53244 6.69531 8.75 6.69531H12.9688V16.3438ZM8.125 8.21875C8.125 8.13281 8.05469 8.0625 7.96875 8.0625H7.03125C6.94531 8.0625 6.875 8.13281 6.875 8.21875V10.3281H4.76562C4.67969 10.3281 4.60938 10.3984 4.60938 10.4844V11.4219C4.60938 11.5078 4.67969 11.5781 4.76562 11.5781H6.875V13.6875C6.875 13.7734 6.94531 13.8438 7.03125 13.8438H7.96875C8.05469 13.8438 8.125 13.7734 8.125 13.6875V11.5781H10.2344C10.3203 11.5781 10.3906 11.5078 10.3906 11.4219V10.4844C10.3906 10.3984 10.3203 10.3281 10.2344 10.3281H8.125V8.21875Z"
                />
              </svg>
            </Button>

            <Button
              onClick={() => {
                tableRef.current.clearChooseItems()
                setIsShowModalCreate(true)
              }}
              intent={'primary'}
              size="small"
              iconOnly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
        </div>
        {allBusiness.status === 'error' && <PageError />}
        {allBusiness.status === 'loading' && <TableSkeleton />}
        {allBusiness.status === 'success' && (
          <BusinessTable
            ref={tableRef}
            getAllBusinessData={allBusiness.data}
            setBusinessChoose={setBusinessChoose}
            isPreviousData={allBusiness.isPreviousData}
          />
        )}
      </div>
      <CreateBusinessModal
        isOpen={isShowModalCreate}
        closeModal={() => setIsShowModalCreate(false)}
        type={props.type}
      />
    </>
  )
}
export default BusinessWrapper
