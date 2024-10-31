import { HumanresourceAccountFilterRequest } from "@/models/api"
import { useGetAccessToken } from "../../auth"
import { useFilterForHumanresourceAccountStore } from "@/hooks/zustand/filter-for-humanresource-account"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import accountHumanresource from "@/apis/account-humanresource-api"

export const AccountHumanresourceKeys = {
  all: ['getAllAccountHumanresource'] as const,
  getAllAccountHumanresource: (filter: HumanresourceAccountFilterRequest) =>
    [...AccountHumanresourceKeys.all, filter, 'getAllAccountHumanresource'] as const,
  getAccountHumanresourceById: (id: string) =>
    [...AccountHumanresourceKeys.all, 'getAllAccountHumanresource', 'getAccountHumanresourceById', id] as const
}

export function useGetAllAccountHumanresource() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForHumanresourceAccountStore()
  const isSA = useRoleIsSuperAdmin()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    AccountHumanresourceKeys.getAllAccountHumanresource(filterUser.filter),
    () =>
      accountHumanresource.getAllAccountHumanresource(getAccessToken.data!.access_token.token, filterUser.filter, isSA),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetAccountHumanresourceById(id: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    AccountHumanresourceKeys.getAccountHumanresourceById(id),
    () => accountHumanresource.getHumanresourceById(getAccessToken.data!.access_token.token, id),
    { enabled: !getAccessToken.isFetching }
  )
}