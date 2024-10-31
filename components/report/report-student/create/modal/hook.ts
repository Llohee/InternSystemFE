import ReportLecturerApi from "@/apis/report-lecturer-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ReportLecturerKeys } from "@/hooks/query/report-lecturer"
import { ErrorResponse, ScheduleDetail, UpdateReportRequest } from "@/models/api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const userCeateReport = (closeModal: () => void, scheduleDetail: ScheduleDetail, milestone_id: string) => {
  const formCreate = useForm<UpdateReportRequest>()
  formCreate.register('schedule_id', { value: scheduleDetail.id })
  useEffect(() => {
    if (milestone_id) {
      formCreate.register('milestone_id', { value: milestone_id })
    }
  }, [milestone_id])
  formCreate.register('attachments', {
    required: "Tệp đính kèm là bắt buộc"
  })
  const mutation = useCreateReportMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateReportRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useCreateReportMutation(
  reset: UseFormReset<UpdateReportRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateReportRequest, any>(
    (createUserBody) =>
      toast.promise(
        ReportLecturerApi.createReport(getAccessToken.data!.access_token.token, createUserBody),
        {
          loading: 'Đang nộp báo cáo',
          success: 'Nộp báo cáo thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ReportLecturerKeys.all)
        reset()
        closeModal()
      },
    }
  )
}

export const useReportUpdate = (closeModal: () => void) => {
  const formUpdate = useForm<UpdateReportRequest>()

  const mutation = useReportUpdateMutation(formUpdate.reset, closeModal)
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
export function useReportUpdateMutation(
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