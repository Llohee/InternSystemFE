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
  if (
    getAllPost.status === 'error' ||
    getConfigLocal.status === 'error' ||
    getConfigProfession.status === 'error'
  )
    return <></>
  if (
    getConfigLocal.status === 'loading' ||
    getConfigProfession.status === 'loading' ||
    getAllPost.status === 'loading'
  )
    return <SinglePostSkeleton />
  return (
    <>
      {getConfigLocal.status === 'success' &&
        getConfigProfession.status === 'success' &&
        getAllPost.status === 'success' && (
          <div className="mx-4 lg:mx-16 my-8 relative flex flex-col gap-8">
            <FilterPostWrapper
              totalPost={totalPost}
              filterValue={filterValue}
              filterQuery={filterQuery}
              getConfigLocal={getConfigLocal.data}
              getConfigProfession={getConfigProfession.data.data}
              setFilterValue={setFilterValue}
              setFilterQuery={setFilterQuery}
            />
            <ListPost getAllPost={getAllPost.data} />
          </div>
        )}
    </>
  )
}

export default StudentHomePage
