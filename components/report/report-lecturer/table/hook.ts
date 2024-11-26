import ScheduleApi from "@/apis/schedule-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ReportLecturerKeys } from "@/hooks/query/report-lecturer"
import { UserGetDetail } from "@/models/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const useGetAllStudentMutation = (userChoose?: UserGetDetail) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(
    (body) => {
      return ScheduleApi.getDetailScheduleByLecturer(getAccessToken.data!.access_token.token, userChoose?.id);
    }
  )
}