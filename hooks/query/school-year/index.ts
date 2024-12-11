import { SchoolYearFilterRequest } from '@/models/api/school-year-api'
import { useGetAccessToken } from '../auth'
import { useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@tanstack/react-query'
import SchoolYearApi from '@/apis/school-year'
import { useFilterForSchoolYearStore } from '@/hooks/zustand/filter-for-school-year'

export const SchoolYearKeys = {
  all: ['getAllSchoolYear'] as const,
  getAllSchoolYear: (filter: SchoolYearFilterRequest) =>
    [...SchoolYearKeys.all, filter, 'getAllSchoolYear'] as const,
  getConfigSchoolYear: () =>
    [...SchoolYearKeys.all, 'getConfigSchoolYear'] as const,
}

export function useGetAllSchoolYear() {
  const getAccessToken = useGetAccessToken()
  const filterSchoolYear = useFilterForSchoolYearStore()
  useEffect(() => {
    filterSchoolYear.update(
      produce(filterSchoolYear.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterSchoolYear.filter.name])
  return useQuery(
    SchoolYearKeys.getAllSchoolYear(filterSchoolYear.filter),
    () =>
      SchoolYearApi.getAllSchoolYear(
        getAccessToken.data!.access_token.token,
        filterSchoolYear.filter
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function usegetConfigSchoolYear() {
  const getAccessToken = useGetAccessToken()
  const filterSchoolYear = useFilterForSchoolYearStore()

  return useQuery(
    SchoolYearKeys.getConfigSchoolYear(),
    () =>
      SchoolYearApi.getAllSchoolYear(getAccessToken.data!.access_token.token, {
        limit: -1,
        name: '',
        page: 0,
        sort: [{ name: 'name', type: false }],
        query: [],
      }),
    { enabled: !getAccessToken.isFetching }
  )
}
