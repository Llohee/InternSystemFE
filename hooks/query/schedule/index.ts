import { ScheduleFilterRequest } from "@/models/api"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import { useGetAccessToken } from "../auth"
import { useFilterForScheduleStore } from "@/hooks/zustand/filter-for-schedule"
import ScheduleApi from "@/apis/schedule-api"

export const ScheduleKeys = {
  all: ['getAllSchedule'] as const,
  getAllSchedule: (filter: ScheduleFilterRequest) =>
    [...ScheduleKeys.all, filter, 'getAllSchedule'] as const,
  getScheduleById: (id: string) =>
    [
      ...ScheduleKeys.all,
      'getAllSchedule',
      'getScheduleById',
      id,
    ] as const,
}

export function useGetAllSchedule() {
  const getAccessToken = useGetAccessToken()
  const filterSchedule = useFilterForScheduleStore()
  useEffect(() => {
    filterSchedule.update(
      produce(filterSchedule.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterSchedule.filter.name])
  return useQuery(
    ScheduleKeys.getAllSchedule(filterSchedule.filter),
    () =>
      ScheduleApi.getAllSchedule(getAccessToken.data!.access_token.token, filterSchedule.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetSchedulebyId(id: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    ScheduleKeys.getScheduleById(id),
    () =>
      ScheduleApi.getDetailSchedule(getAccessToken.data!.access_token.token, id),
    { enabled: !getAccessToken.isFetching }
  )
}