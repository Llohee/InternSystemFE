import { Pagination } from '@/components/ui/pagination/pagination'
import { SinglePostSkeleton } from '@/components/ui/skeleton'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import {
  useGetAllPost,
  useGetConfigPostLocal,
  useGetConfigPostProfession,
} from '@/hooks/query/post'
import { useFilterForPostStore } from '@/hooks/zustand/filter-for-post'
import produce from 'immer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ListPost from './list-post'
import FilterPostWrapper from './modal/filter-post-wrapper'
import { ExportPostFilterRequest } from '@/models/api'

const StudentHomePage = () => {
  const getAllPost = useGetAllPost()
  const [totalPost, setTotalPost] = useState(0)
  useEffect(() => {
    if (getAllPost.status === 'success')
      setTotalPost(getAllPost.data.total ?? 0)
  }, [getAllPost])
  const filterPost = useFilterForPostStore()
  const [filterValue, setFilterValue] = useState<ExportPostFilterRequest>()
  const [filterQuery, setFilterQuery] = useState()
  const getConfigLocal = useGetConfigPostLocal()
  const getConfigProfession = useGetConfigPostProfession()
  useEffect(() => {
    filterPost.update(
      produce(filterPost.filter, (draftState: any) => {
        draftState.query = []
        draftState.params = []
        draftState.sort = []
        draftState.local = ''
      })
    )
  }, [])
  return (
    <>
      <div className="mx-4 lg:mx-16 my-8 relative flex flex-col gap-8">
        {getConfigLocal.status === 'success' &&
          getConfigProfession.status === 'success' && (
            <FilterPostWrapper
              totalPost={totalPost}
              filterValue={filterValue}
              filterQuery={filterQuery}
              getConfigLocal={getConfigLocal.data}
              getConfigProfession={getConfigProfession.data}
              setFilterValue={setFilterValue}
              setFilterQuery={setFilterQuery}
            />
          )}
        {getAllPost.status === 'error' && <></>}
        {getAllPost.status === 'loading' && (
          <div className="mx-4 lg:mx-16 my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(12)].map((_, index) => (
              <SinglePostSkeleton />
            ))}
          </div>
        )}
        {getAllPost.status === 'success' && (
          <ListPost getAllPost={getAllPost.data} />
        )}
      </div>
    </>
  )
}

export default StudentHomePage
