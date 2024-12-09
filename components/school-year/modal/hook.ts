import SchoolYearApi from '@/apis/school-year'
import { useGetAccessToken } from '@/hooks/query/auth'
import { SchoolYearKeys } from '@/hooks/query/school-year'
import {
  ErrorResponse,
  SchoolYearDetail,
  UpdateSchoolYearRequest,
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useSchoolYearCreate = (closeModal: () => void) => {
  const createSchoolYear = useForm<UpdateSchoolYearRequest>({
    defaultValues: { is_active: true },
  })

  const mutation = useSchoolYearCreateMutation(() => {
    createSchoolYear.reset()
    closeModal()
  })
  const handleFormSubmit: SubmitHandler<UpdateSchoolYearRequest> = async (
    data
  ) => {
    mutation.mutate(data)
  }

  return {
    // Form
    createSchoolYear,
    handleFormSubmit,
    mutation,
  }
}
export function useSchoolYearCreateMutation(action: () => void) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateSchoolYearRequest, any>(
    (createSchoolYearBody) =>
      toast.promise(
        SchoolYearApi.createSchoolYear(
          getAccessToken.data!.access_token.token,
          createSchoolYearBody
        ),
        {
          loading: 'Đang tạo mới năm học',
          success: 'Tạo mới năm học thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(SchoolYearKeys.all)
        action()
      },
    }
  )
}
export const useSchoolYearUpdate = (
  closeModal: () => void,
  schoolyear: SchoolYearDetail
) => {
  const updateSchoolYear = useForm<UpdateSchoolYearRequest>({
    defaultValues: {
      ...schoolyear,
    },
  })

  const mutation = useSchoolYearUpdateMutation(
    updateSchoolYear.reset,
    schoolyear,
    closeModal
  )
  const handleFormSubmit: SubmitHandler<UpdateSchoolYearRequest> = async (
    data
  ) => {
    mutation.mutate(data)
  }

  return {
    updateSchoolYear,
    handleFormSubmit,
    mutation,
  }
}
export function useSchoolYearUpdateMutation(
  reset: UseFormReset<UpdateSchoolYearRequest>,
  schoolyear: SchoolYearDetail,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateSchoolYearRequest, any>(
    (updateSchoolYearBody) =>
      toast.promise(
        SchoolYearApi.updateSchoolYear(
          getAccessToken.data!.access_token.token,
          schoolyear.id,
          updateSchoolYearBody
        ),
        {
          loading: 'Đang cập nhật năm học',
          success: 'Cập nhật năm học thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(SchoolYearKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
