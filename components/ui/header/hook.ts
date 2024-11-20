import accountStudentApi from "@/apis/account-student-api"
import { AccountStudentKeys } from "@/hooks/query/account/student"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ErrorResponse, UserGetDetail } from "@/models/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

export const useGetDetailStudentMutation = () => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(
    (body) => {
      return accountStudentApi.getDetailStudent(getAccessToken.data!.access_token.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          AccountStudentKeys.all
        )
        router.push(`/report/student`)
      },
    }
  )
}