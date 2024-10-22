import accountLecturerApi from '@/apis/account-lecturer-api'
import { AccountLecturerKeys } from '@/hooks/query/account/lecturer'
import { useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import {
  emailRegex,
  passwordRegex,
  phoneRegex
} from '@/hooks/regex'
import { ErrorResponse, UpdateUserRequest, UserGetDetail } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useLecturerAccountCreate = (closeModal: () => void) => {
  const useGetDetail = useGetUserDetail()
  const formCreate = useForm<UpdateUserRequest>()
  formCreate.register('type', { value: 'UNIVERSITY' })
  formCreate.register('role', { value: 'LT' })
  formCreate.register('university', { value: useGetDetail.data.university })
  formCreate.register('phone', {
    pattern: {
      value: phoneRegex,
      message: 'Không đúng định dạng số điện thoại',
    },
  })
  formCreate.register('email', {
    required: 'Email là bắt buộc',
    pattern: {
      value: emailRegex,
      message: 'Không đúng định dạng email',
    },
  })
  formCreate.register('password', {
    pattern: {
      value: passwordRegex,
      message: 'Ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt',
    },
  })
  formCreate.register('fullname', {
    required: 'Tên trường là bắt buộc',
    maxLength: { value: 100, message: 'a' },
    pattern: {
      value: /.{3,}/,
      message: 'a',
    },
  })
  const mutation = useLecturerAccountCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useLecturerAccountCreateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (createUserBody) =>
      toast.promise(
        accountLecturerApi.createLecturer(getAccessToken.data!.access_token.token, createUserBody),
        {
          loading: 'Đang tạo mới người dùng',
          success: 'Tạo mới người dùng thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(AccountLecturerKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useLecturerUpdate = (closeModal: () => void, lecturer: UserGetDetail) => {
  const formUpdate = useForm<UpdateUserRequest>({
    defaultValues: {
      fullname: lecturer.fullname,
      email: lecturer.email,
      id_number: lecturer.id_number,
      faculty: lecturer.faculty,
      institute: lecturer.institute,
      major: lecturer.major,
      program_training: lecturer.program_training,
      class: lecturer.class,
      academic_year: lecturer.academic_year,
      phone: lecturer.phone,
    },
  })

  const mutation = useLecturerUpdateMutation(formUpdate.reset, closeModal, lecturer)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useLecturerUpdateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void,
  tenant: UserGetDetail,
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (body) =>
      toast.promise(
        accountLecturerApi.updateLecturer(
          getAccessToken.data!.access_token.token,
          tenant.id,
          body
        ),
        {
          loading: 'Đang cập nhật giảng viên',
          success: 'Cập nhật giảng viên thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(AccountLecturerKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
