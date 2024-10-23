import PageError from '@/components/page-error/error'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetAllPostBusiness } from '@/hooks/query/post'
import { useFilterForPostBusinessStore } from '@/hooks/zustand/filter-for-post'
import produce from 'immer'
import { useState } from 'react'
import TenantPostTable from './table'

const TenantDetailPost = (props: {
  tenant_id: string
  tenant_code: string
}) => {
  const filterTenantPost = useFilterForPostBusinessStore()
  const allTenantPost = useGetAllPostBusiness(props.tenant_code)
  return (
    <>
      <div className="">
        <div className="flex items-center py-4 border-b border-primary-background">
          <div className="flex gap-5 grow items-center mr-2">
            <div className="flex flex-col">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterTenantPost.filter.profession}
                className="lg:w-96 "
                onChange={(value) => {
                  filterTenantPost.update(
                    produce(filterTenantPost.filter, (draftState) => {
                      draftState.profession = value.toString()
                      draftState.page = 0
                    })
                  )
                }}
                icon={<SearchIcon />}
              />
            </div>
          </div>
        </div>
        {allTenantPost.status == 'error' && <PageError />}
        {allTenantPost.status == 'loading' && <TableSkeleton />}
        {allTenantPost.status == 'success' && (
          <TenantPostTable
            getallTenantPostData={allTenantPost.data}
            isPreviousData={allTenantPost.isPreviousData}
          />
        )}
      </div>
    </>
  )
}

export default TenantDetailPost
