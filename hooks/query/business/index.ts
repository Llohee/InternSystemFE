import { BusinessFilterRequest } from "@/models/api"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import { useGetAccessToken } from "../auth"
import { useFilterForBusinessStore } from "@/hooks/zustand/filter-for-business"
import BusinessApi from "@/apis/business-api"

export const BusinessKeys = {
  all: ['getAllBusiness'] as const,
  getAllBusiness: (filter: BusinessFilterRequest) =>
    [...BusinessKeys.all, filter, 'getAllBusiness'] as const,
  getConfigBusiness: () =>
    [...BusinessKeys.all, 'getConfigBusiness'] as const,
}

export function useGetAllBusiness() {
  const getAccessToken = useGetAccessToken()
  const filterBusiness = useFilterForBusinessStore()
  useEffect(() => {
    filterBusiness.update(
      produce(filterBusiness.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterBusiness.filter.name])
  return useQuery(
    BusinessKeys.getAllBusiness(filterBusiness.filter),
    () =>
      BusinessApi.getAllBusiness(getAccessToken.data!.access_token.token, filterBusiness.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function usegetConfigBusiness() {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    BusinessKeys.getConfigBusiness(),
    () => BusinessApi.getAllBusiness(getAccessToken.data!.access_token.token, {
      limit: -1,
      name: '',
      page: 0,
      sort: [{ name: 'name', type: false }],
      query: []
    }),
    { enabled: !getAccessToken.isFetching }
  )
}