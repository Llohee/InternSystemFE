import { TenantFilterRequest } from "@/models/api"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import { useGetAccessToken } from "../auth"
import { useFilterForTenantStore } from "@/hooks/zustand/filter-for-tenant"
import TenantApi from "@/apis/tenant-api"

export const TenantKeys = {
  all: ['getAllTenant'] as const,
  getAllTenant: (filter: TenantFilterRequest) =>
    [...TenantKeys.all, filter, 'getAllTenant'] as const,
  getConfigTenant: () =>
    [...TenantKeys.all, 'getConfigTenant'] as const,
  getAllTenantLink: (filter: TenantFilterRequest) =>
    [...TenantKeys.all, filter, 'getAllTenantLink'] as const,
  getTenantById: (id: string) =>
    [...TenantKeys.all, 'getAllTenant', 'getTenantById', id] as const,
}

export function useGetAllTenant(type: string) {
  const getAccessToken = useGetAccessToken()
  const filterTenant = useFilterForTenantStore()
  useEffect(() => {
    filterTenant.update(
      produce(filterTenant.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterTenant.filter.name])
  return useQuery(
    TenantKeys.getAllTenant(filterTenant.filter),
    () =>
      TenantApi.getAllTenant(getAccessToken.data!.access_token.token, filterTenant.filter, type),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function usegetConfigTenant(type: string) {
  const getAccessToken = useGetAccessToken()
  const filterTenant = useFilterForTenantStore()

  return useQuery(
    TenantKeys.getConfigTenant(),
    () => TenantApi.getAllTenant(getAccessToken.data!.access_token.token, {
      limit: -1,
      name: '',
      page: 0,
      sort: [{ name: 'name', type: false }],
      query: []
    }, type),
    { enabled: !getAccessToken.isFetching }
  )
}
export function useGetAllTenantLink(type: string) {
  const getAccessToken = useGetAccessToken()
  const filterTenant = useFilterForTenantStore()
  useEffect(() => {
    filterTenant.update(
      produce(filterTenant.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterTenant.filter.name])
  return useQuery(
    TenantKeys.getAllTenantLink(filterTenant.filter),
    () =>
      TenantApi.getAllTenantLink(getAccessToken.data!.access_token.token, filterTenant.filter, type),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetTenantById(id: string, type: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    TenantKeys.getTenantById(id),
    () => TenantApi.getTenantById(getAccessToken.data!.access_token.token, id, type),
    { enabled: !getAccessToken.isFetching }
  )
}