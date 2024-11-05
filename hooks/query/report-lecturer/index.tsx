import {
  useFilterForReportLecturerStore,
  useFilterForReportStore,
} from '@/hooks/zustand/filter-for-report-lecturer'
import { useQuery } from '@tanstack/react-query'
import produce from 'immer'
import { useEffect } from 'react'
import { useGetAccessToken } from '../auth'
import ReportLecturerApi from '@/apis/report-lecturer-api'
import { ReportLecturerFilterRequest } from '@/models/api'

export const ReportLecturerKeys = {
  all: ['getAllReportLecturer'] as const,
  getAllStudent: (filter: ReportLecturerFilterRequest) =>
    [...ReportLecturerKeys.all, filter, 'getAllStudent'] as const,
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
  getCurrentReport: () =>
    [...ReportLecturerKeys.all, 'getCurrentReport'] as const,
  getReportComments: (ReportId: string) => [
    ...ReportLecturerKeys.all,
    'getReportComments',
    ReportId,
  ],
  getReportById: (ReportId: string) => [
    ...ReportLecturerKeys.all,
    'getReportById',
    ReportId,
  ],
}

export function useGetAllStudent(profession: string) {
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
    ReportLecturerKeys.getAllStudent(filterUser.filter),
    () =>
      ReportLecturerApi.getAllStudent(
        getAccessToken.data!.access_token.token,
        filterUser.filter,
        profession
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

export function useGetCurrentReport() {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    ReportLecturerKeys.getCurrentReport(),
    () =>
      ReportLecturerApi.getCurrentReport(
        getAccessToken.data!.access_token.token
      ),
    { enabled: !getAccessToken.isFetching }
  )
}

export function useGetReportComments(ReportId: string) {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    ReportLecturerKeys.getReportComments(ReportId),
    () =>
      ReportLecturerApi.getReportComments(
        getAccessToken.data!.access_token.token,
        ReportId
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}

export function useGetReportById(ReportId: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    ReportLecturerKeys.getReportById(ReportId),
    () =>
      ReportLecturerApi.getReportbyId(
        getAccessToken.data!.access_token.token,
        ReportId
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
