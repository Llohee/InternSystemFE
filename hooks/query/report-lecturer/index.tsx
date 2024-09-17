import { useFilterForReportLecturerStore, useFilterForReportStore } from '@/hooks/zustand/filter-for-report-lecturer'
import { useQuery } from '@tanstack/react-query'
import produce from 'immer'
import { useEffect } from 'react'
import { useGetAccessToken } from '../auth'
import ReportLecturerApi from '@/apis/report-lecturer-api'
import { ReportLecturerFilterRequest } from '@/models/api'

export const ReportLecturerKeys = {
  all: ['getAllReportLecturer'] as const,
  getAllReportLecturer: (filter: ReportLecturerFilterRequest) =>
    [...ReportLecturerKeys.all, filter, 'getAllReportLecturer'] as const,
  getReportbyStudentId: (
    studentId: string,
    filter: ReportLecturerFilterRequest
  ) =>
    [
      ...ReportLecturerKeys.all,
      'getAllReportbyStudentId',
      studentId,
      filter,
    ] as const,
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
      ReportLecturerApi.getAllReportLecturer(
        getAccessToken.data!.access_token.token,
        filterUser.filter
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}

export function useGetAllReportbyStudentId(studentId: string) {
  const getAccessToken = useGetAccessToken()
  const filterReport = useFilterForReportStore()
  const filter = filterReport.filter
  useEffect(() => {
    filterReport.update(
      produce(filterReport.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filter.name])
  return useQuery(
    ReportLecturerKeys.getReportbyStudentId(studentId, filterReport.filter),
    () =>
      ReportLecturerApi.getAllReportbyStudentId(
        getAccessToken.data!.access_token.token,
        studentId,
        filterReport.filter
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
