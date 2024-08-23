import { UniversityFilterRequest } from "@/models/api"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import { useGetAccessToken } from "../auth"
import { useFilterForUniversityStore } from "@/hooks/zustand/filter-for-university"
import UniversityApi from "@/apis/university-api"

export const UniversityKeys = {
  all: ['getAllUniversity'] as const,
  getAllUniversity: (filter: UniversityFilterRequest) =>
    [...UniversityKeys.all, filter, 'getAllUniversity'] as const,
  getConfigUniversity: () =>
    [...UniversityKeys.all, 'getConfigUniversity'] as const,
}

export function useGetAllUniversity() {
  const getAccessToken = useGetAccessToken()
  const filterUniversity = useFilterForUniversityStore()
  useEffect(() => {
    filterUniversity.update(
      produce(filterUniversity.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUniversity.filter.name])
  return useQuery(
    UniversityKeys.getAllUniversity(filterUniversity.filter),
    () =>
      UniversityApi.getAllUniversity(getAccessToken.data!.access_token.token, filterUniversity.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function usegetConfigUniversity() {
  const getAccessToken = useGetAccessToken()
  const filterUniversity = useFilterForUniversityStore()

  return useQuery(
    UniversityKeys.getConfigUniversity(),
    () => UniversityApi.getAllUniversity(getAccessToken.data!.access_token.token, {
      limit: -1,
      name: '',
      code: '',
      page: 0,
      sort: [{ name: 'name', type: false }],
      query: []
    }),
    { enabled: !getAccessToken.isFetching }
  )
}