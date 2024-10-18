import { useEffect } from 'react'
import { useGetAccessToken } from '../auth'
import produce from 'immer'
import { useQuery } from '@tanstack/react-query'
import ProfileAndCVApi from '@/apis/profile-cv-api'
import { useFilterForCVStore } from '@/hooks/zustand/filter-for-profile-cv'
import { CVFilterRequest } from '@/models/api'

export const ProfileCVKeys = {
  all: ['getCV'] as const,
  getAllCV: (filter: CVFilterRequest) =>
    [...ProfileCVKeys.all, filter, 'getAllCV'] as const,
  getConfigCV: () => [...ProfileCVKeys.all, 'getConfigCV'] as const,
}

export function useGetAllCV(type: string) {
  const getAccessToken = useGetAccessToken()
  const filterCV = useFilterForCVStore()
  useEffect(() => {
    filterCV.update(
      produce(filterCV.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterCV.filter.name])
  return useQuery(
    ProfileCVKeys.getAllCV(filterCV.filter),
    () =>
      ProfileAndCVApi.getALLCV(getAccessToken.data!.access_token.token, filterCV.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function usegetConfigCV() {
  const getAccessToken = useGetAccessToken()
  const filterCV = useFilterForCVStore()

  return useQuery(
    ProfileCVKeys.getConfigCV(),
    () =>
      ProfileAndCVApi.getALLCV(getAccessToken.data!.access_token.token, {
        limit: -1,
        name: '',
        page: 0,
        sort: [{ name: 'name', type: false }],
        query: [],
      }),
    { enabled: !getAccessToken.isFetching }
  )
}
