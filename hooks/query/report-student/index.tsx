import ReportStudentApi from "@/apis/report-student-api"
import { useFilterForReportStudentStore } from "@/hooks/zustand/filter-for-report-student"
import { ReportStudentFilterRequest } from "@/models/api/report-api"
import { useQuery } from "@tanstack/react-query"
import produce from "immer"
import { useEffect } from "react"
import { useGetAccessToken } from "../auth"

export const ReportStudentKeys = {
  all: ['getAllReportStudent'] as const,
  getAllReportStudent: (filter: ReportStudentFilterRequest) =>
    [...ReportStudentKeys.all, filter, 'getAllReportStudent'] as const,
}

export function useGetAllReportStudent() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForReportStudentStore()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    ReportStudentKeys.getAllReportStudent(filterUser.filter),
    () =>
      ReportStudentApi.getAllReportStudent(getAccessToken.data!.access_token.token, filterUser.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}