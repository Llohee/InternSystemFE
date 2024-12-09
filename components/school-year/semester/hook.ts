import SchoolYearApi from '@/apis/school-year'
import { useGetAccessToken } from '@/hooks/query/auth'
import { SchoolYearKeys } from '@/hooks/query/school-year'
import { ErrorResponse, SemesterDetail, UpdateSemesterRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useSemesterCreate = (closeModal: () => void, id: string) => {
  const createSemester = useForm<UpdateSemesterRequest>({
    defaultValues: { is_active: true },
  })

  const mutation = useSemesterCreateMutation(
    closeModal,
     id
  )
  const handleFormSubmit: SubmitHandler<UpdateSemesterRequest> = async (
    data
  ) => {
    mutation.mutate(data)
  }

  return {
    // Form
    createSemester,
    handleFormSubmit,
    mutation,
  }
}
export function useSemesterCreateMutation(closeModal: () => void, id: string) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateSemesterRequest, any>(
    (createSemesterBody) =>
      toast.promise(
        SchoolYearApi.createSemester(
          getAccessToken.data!.access_token.token,
          id,
          createSemesterBody
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
        closeModal()
      },
    }
  )
}
export const useSemesterUpdate = (
  closeModal: () => void,
  semester: SemesterDetail
) => {
  const updateSemester = useForm<UpdateSemesterRequest>({
    defaultValues: {
      name: semester.name,
      description: semester.description,
      start_day: semester.start_day,
      end_day: semester.end_day,
      is_active: semester.is_active,
    },
  })

  const mutation = useSemesterUpdateMutation(
    updateSemester.reset,
    semester,
    closeModal
  )
  const handleFormSubmit: SubmitHandler<UpdateSemesterRequest> = async (
    data
  ) => {
    mutation.mutate(data)
  }

  return {
    // Form
    updateSemester,
    handleFormSubmit,
    mutation,
  }
}
export function useSemesterUpdateMutation(
  reset: UseFormReset<UpdateSemesterRequest>,
  semester: SemesterDetail,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateSemesterRequest, any>(
    (updateSemesterBody) =>
      toast.promise(
        SchoolYearApi.updateSemester(
          getAccessToken.data!.access_token.token,
          semester.id,
          updateSemesterBody
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