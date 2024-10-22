import { GroupFilterRequest } from "@/models/api"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import GroupApi from "@/apis/group-api"
import { useGetAccessToken } from "../auth"
import { useFilterForGroupStore } from "@/hooks/zustand/filter-for-group"

export const GroupKeys = {
  all: ['getAllGroup'] as const,
  getAllGroup: (filter: GroupFilterRequest) =>
    [...GroupKeys.all, filter, 'getAllGroup'] as const,
  getGroupById: (id: string) =>
    [...GroupKeys.all, 'getAllGroup', 'getGroupById', id] as const,
}

export function useGetAllGroup() {
  const getAccessToken = useGetAccessToken()
  const filterGroup = useFilterForGroupStore()
  useEffect(() => {
    filterGroup.update(
      produce(filterGroup.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterGroup.filter.name])
  return useQuery(
    GroupKeys.getAllGroup(filterGroup.filter),
    () =>
      GroupApi.getAllGroup(getAccessToken.data!.access_token.token, filterGroup.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetGroupById(id: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    GroupKeys.getGroupById(id),
    () => GroupApi.getGroupById(getAccessToken.data!.access_token.token, id),
    { enabled: !getAccessToken.isFetching }
  )
}