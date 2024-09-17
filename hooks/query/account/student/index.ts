import { StudentAccountFilterRequest } from "@/models/api"
import { useGetAccessToken } from "../../auth"
import { useFilterForStudentAccountStore } from "@/hooks/zustand/filter-for-student-account"
import { useRoleIsSuperAdmin } from "@/components/auth/hooks"
import { useEffect } from "react"
import produce from "immer"
import { useQuery } from "@tanstack/react-query"
import accountStudentApi from "@/apis/account-student-api"

export const AccountStudentKeys = {
  all: ['getAllAccountStudent'] as const,
  getAllAccountStudent: (filter: StudentAccountFilterRequest) =>
    [...AccountStudentKeys.all, filter, 'getAllAccountStudent'] as const,
  getConfigSTWhithoutGroup: () =>
    [...AccountStudentKeys.all, 'getConfigSTWhithoutGroup'] as const,
  getStudentById: (id: string) => [...AccountStudentKeys.all, id, 'getStudentById'] as const
}

export function useGetAllAccountStudent() {
  const getAccessToken = useGetAccessToken()
  const filterUser = useFilterForStudentAccountStore()
  const isSA = useRoleIsSuperAdmin()
  useEffect(() => {
    filterUser.update(
      produce(filterUser.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterUser.filter.name])
  return useQuery(
    AccountStudentKeys.getAllAccountStudent(filterUser.filter),
    () =>
      accountStudentApi.getAllAccountStudent(getAccessToken.data!.access_token.token, filterUser.filter, isSA),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}
export function useGetConfigSTWhithoutGroup() {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    AccountStudentKeys.getConfigSTWhithoutGroup(),
    () => accountStudentApi.getConfigSTWhithoutGroup(getAccessToken.data!.access_token.token),
    { enabled: !getAccessToken.isFetching }
  )
}
export function useGetStudentById(id: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    AccountStudentKeys.getStudentById(id),
    () => accountStudentApi.getStudentById(getAccessToken.data!.access_token.token, id),
    { enabled: !getAccessToken.isFetching }
  )
}