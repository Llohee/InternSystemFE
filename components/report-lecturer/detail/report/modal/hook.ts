import ReportLecturerApi from "@/apis/report-lecturer-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ReportLecturerKeys } from "@/hooks/query/report-lecturer"
import { ErrorResponse, UpdateReportRequest } from "@/models/api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const useScoreCreate = (ReportId: string) => {
  const createScore = useForm<{ score: number, report_id: string }>()
  createScore.register('report_id', { value: ReportId })
  const mutation = useScoreCreateMutation(ReportId, () => {
    createScore.reset()
  })
  const handleFormSubmit: SubmitHandler<{ score: number }> = async (data) => {
    mutation.mutate(data)
    // console.log(data, typeReport)
  }

  return {
    // Form
    createScore,
    handleFormSubmit,
    mutation,
  }
}

const useScoreCreateMutation = (
  ReportId: string,
  reset: () => void
) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, { score: number }, any>(
    (body) =>
      ReportLecturerApi.createScore(
        getAccessToken.data!.access_token.token,
        ReportId,
        body.score,
      ),
    {
      onSuccess: (data) => {
        reset()
        return queryClient.invalidateQueries(ReportLecturerKeys.all)
      },
    }
  )
}

export const useScoreUpdate = (closeModal: () => void) => {
  const formUpdate = useForm<UpdateReportRequest>()

  const mutation = useScoreUpdateMutation(formUpdate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateReportRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useScoreUpdateMutation(
  reset: UseFormReset<UpdateReportRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateReportRequest, any>(
    (updateReportBody) =>
      toast.promise(
        ReportLecturerApi.updateReport(
          getAccessToken.data!.access_token.token,
          updateReportBody
        ),
        {
          loading: 'Đang cập nhật báo cáo',
          success: 'Cập nhật thành công báo cáo',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ReportLecturerKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}