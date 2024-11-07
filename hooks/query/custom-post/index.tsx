import { CustomPostFilterRequest } from '@/models/api/custom-post-api'
import { useGetAccessToken } from '../auth'
import { useFilterForCusTomPostStore } from '@/hooks/zustand/filter-for-post'
import { useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@tanstack/react-query'
import CustomPostApi from '@/apis/custom-post'

export const CustomPostKeys = {
  all: ['getAllCustomPost'] as const,
  getAllCustomPost: (filter: CustomPostFilterRequest) =>
    [...CustomPostKeys.all, filter, 'getAllCustomPost'] as const,
}

export function useGetAllCustomPost() {
  const getAccessToken = useGetAccessToken()
  const filterPost = useFilterForCusTomPostStore()
  useEffect(() => {
    filterPost.update(
      produce(filterPost.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterPost.filter.title])
  return useQuery(
    CustomPostKeys.getAllCustomPost(filterPost.filter),
    () =>
      CustomPostApi.getAllCustomPost(
        getAccessToken.data!.access_token.token,
        filterPost.filter
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
