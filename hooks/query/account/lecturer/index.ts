import { LecturerAccountFilterRequest } from "@/models/api"
import { useGetAccessToken } from "../../auth"
import { useFilterForLecturerAccountStore } from "@/hooks/zustand/filter-for-lecturer-account"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import accountLecturerApi from "@/apis/account-lecturer-api"

export const AccountLecturerKeys = {
  all: ['getAllAccountLecturer'] as const,
  getAllAccountLecturer: (filter: LecturerAccountFilterRequest) =>
    [...AccountLecturerKeys.all, filter, 'getAllAccountLecturer'] as const,
  getConfigLTWhithoutGroup: () =>
    [...AccountLecturerKeys.all, 'getConfigLTWhithoutGroup'] as const,
}

export function useGetAllAccountLecturer() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForLecturerAccountStore()
  const isSA = useRoleIsSuperAdmin()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    AccountLecturerKeys.getAllAccountLecturer(filterUser.filter),
    () =>
      accountLecturerApi.getAllAccountLecturer(getAccessToken.data!.access_token.token, filterUser.filter, isSA),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetConfigLTWhithoutGroup() {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    AccountLecturerKeys.getConfigLTWhithoutGroup(),
    () => accountLecturerApi.getConfigLTWhithoutGroup(getAccessToken.data!.access_token.token),
    { enabled: !getAccessToken.isFetching }
  )
}