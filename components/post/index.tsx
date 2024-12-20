import { useGetAllPostBusiness } from '@/hooks/query/post'
import { useFilterForPostBusinessStore } from '@/hooks/zustand/filter-for-post'
import produce from 'immer'
import { useState } from 'react'
import PageError from '../page-error/error'
import { Button } from '../ui/button/button'
import { SearchIcon } from '../ui/icon'
import { DebouncedInput } from '../ui/input/debouced-input'
import { TableSkeleton } from '../ui/skeleton'
import PostBusinessTable from './table'
import CreatePostModal from './modal/create-post'
import { useGetUserDetail } from '@/hooks/query/auth'

const PostWrapper = () => {
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const filterPost = useFilterForPostBusinessStore()
  const userDetail = useGetUserDetail()
  const allPostBusiness = useGetAllPostBusiness(userDetail.data.tenant.code)
  return (
    <>
      <div className="">
        <div className="flex items-center py-4 border-b border-primary-background">
          <div className="flex gap-5 grow items-center mr-2">
            <div className="flex flex-col">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterPost.filter.profession}
                className="lg:w-96 "
                onChange={(value) => {
                  filterPost.update(
                    produce(filterPost.filter, (draftState) => {
                      draftState.profession = value.toString()
                      draftState.page = 0
                    })
                  )
                }}
                icon={<SearchIcon />}
              />
            </div>
          </div>
          <div className="hidden md:flex gap-2 py-1">
            <Button
              size={'small'}
              intent={'primary'}
              className=" gap-2 items-center"
              onClick={() => setIsShowModalCreate(true)}
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
          <div className="flex flex-col gap-3 md:hidden fixed z-20 bottom-28 right-5">
            <Button
              onClick={() => setIsShowModalCreate(true)}
              intent={'primary'}
              size="small"
              iconOnly
              ariaLabel="Open create service modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
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
        {allPostBusiness.status == 'error' && <PageError />}
        {allPostBusiness.status == 'loading' && <TableSkeleton />}
        {allPostBusiness.status == 'success' && (
          <PostBusinessTable
            getallPostBusinessData={allPostBusiness.data}
            isPreviousData={allPostBusiness.isPreviousData}
          />
        )}
      </div>
      <CreatePostModal
        isOpen={isShowModalCreate}
        closeModal={() => {
          setIsShowModalCreate(false)
        }}
      />
    </>
  )
}

export default PostWrapper
