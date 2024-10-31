import { useGetAllCustomPost } from '@/hooks/query/custom-post'
import React, { useState } from 'react'
import { DebouncedInput } from '../ui/input/debouced-input'
import produce from 'immer'
import { SearchIcon } from '../ui/icon'
import { Button } from '../ui/button/button'
import { useFilterForCusTomPostStore } from '@/hooks/zustand/filter-for-post'
import PageError from '../page-error/error'
import { TableSkeleton } from '../ui/skeleton'
import CustomPostBusinessTable from './table'
import CreateCustomPostModal from './modal/create-custom-post'

const CustomPost = () => {
  const allCusTomPost = useGetAllCustomPost()
  const filterCustomPost = useFilterForCusTomPostStore()
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)

  return (
    <>
      <div className="">
        <div className="flex items-center py-4 border-b border-primary-background">
          <div className="flex gap-5 grow items-center mr-2">
            <div className="flex flex-col">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterCustomPost.filter.title}
                className="lg:w-96 "
                onChange={(value) => {
                  filterCustomPost.update(
                    produce(filterCustomPost.filter, (draftState) => {
                      draftState.title = value.toString()
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
        {allCusTomPost.status == 'error' && <PageError />}
        {allCusTomPost.status == 'loading' && <TableSkeleton />}
        {allCusTomPost.status == 'success' && (
          <CustomPostBusinessTable
            getallCustomPostData={allCusTomPost.data}
            isPreviousData={allCusTomPost.isPreviousData}
          />
        )}
      </div>
      <CreateCustomPostModal
        isOpen={isShowModalCreate}
        closeModal={() => {
          setIsShowModalCreate(false)
        }}
      />
    </>
  )
}

export default CustomPost
