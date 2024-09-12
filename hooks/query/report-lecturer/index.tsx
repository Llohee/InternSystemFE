import { useFilterForReportLecturerStore } from "@/hooks/zustand/filter-for-report-lecturer"
import { useQuery } from "@tanstack/react-query"
import produce from "immer"
import { useEffect } from "react"
import { useGetAccessToken } from "../auth"
import ReportLecturerApi from "@/apis/report-lecturer-api"
import { ReportLecturerFilterRequest } from "@/models/api"

export const ReportLecturerKeys = {
  all: ['getAllReportLecturer'] as const,
  getAllReportLecturer: (filter: ReportLecturerFilterRequest) =>
    [...ReportLecturerKeys.all, filter, 'getAllReportLecturer'] as const,
}

export function useGetAllReportLecturer() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForReportLecturerStore()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    ReportLecturerKeys.getAllReportLecturer(filterUser.filter),
    () =>
      ReportLecturerApi.getAllReportLecturer(getAccessToken.data!.access_token.token, filterUser.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}