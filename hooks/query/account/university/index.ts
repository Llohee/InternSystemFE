import { UniversityAccountFilterRequest } from "@/models/api"
import { useGetAccessToken } from "../../auth"
import { useFilterForUniverSityAccountStore } from "@/hooks/zustand/filter-for-university-account"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import accountUniversityApi from "@/apis/account-university-api"

export const AccountUniversityKeys = {
  all: ['getAllAccountUniversity'] as const,
  getAllAccountUniversity: (filter: UniversityAccountFilterRequest) =>
    [...AccountUniversityKeys.all, filter, 'getAllAccountUniversity'] as const,
}

export function useGetAllAccountUniversity() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForUniverSityAccountStore()
  const isSA = useRoleIsSuperAdmin()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    AccountUniversityKeys.getAllAccountUniversity(filterUser.filter),
    () =>
      accountUniversityApi.getAllAccountUniversity(getAccessToken.data!.access_token.token, filterUser.filter, isSA),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}