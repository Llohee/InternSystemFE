import ScheduleApi from '@/apis/schedule-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ScheduleKeys } from '@/hooks/query/schedule'
import { ErrorResponse, ScheduleDetail, UpdateScheduleRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useScheduleCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateScheduleRequest>()
  const mutation = useScheduleCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateScheduleRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useScheduleCreateMutation(
  reset: UseFormReset<UpdateScheduleRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateScheduleRequest, any>(
    (createScheduleBody) =>
      toast.promise(
        ScheduleApi.createSchedule(getAccessToken.data!.access_token.token, createScheduleBody),
        {
          loading: 'Đang tạo mới mốc thời gian',
          success: 'Tạo mới mốc thời gian thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ScheduleKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useScheduleUpdate = (closeModal: () => void, schedule: ScheduleDetail) => {
  const formUpdate = useForm<UpdateScheduleRequest>()

  const mutation = useScheduleUpdateMutation(formUpdate.reset, closeModal, schedule)
  const handleFormSubmit: SubmitHandler<UpdateScheduleRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useScheduleUpdateMutation(
  reset: UseFormReset<UpdateScheduleRequest>,
  closeModal: () => void,
  schedule: ScheduleDetail
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateScheduleRequest, any>(
    (updateScheduleBody) =>
      toast.promise(
        ScheduleApi.updateSchedule(
          getAccessToken.data!.access_token.token,
          updateScheduleBody,
          schedule.id
        ),
        {
          loading: 'Đang cập nhật mới mốc thời gian',
          success: 'Cập nhật thành công mốc thời gian',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ScheduleKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
