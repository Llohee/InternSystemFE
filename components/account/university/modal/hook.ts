import accountUniversityApi from '@/apis/account-university-api'
import { AccountUniversityKeys } from '@/hooks/query/account/university'
import { useGetAccessToken } from '@/hooks/query/auth'
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

export const useUniversityAccountCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateUserRequest>()
  formCreate.register('type', { value: 'UNIVERSITY' })
  formCreate.register('role', { value: 'AU' })
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
  formCreate.register('university', {
    required: 'Trường học là bắt buộc',
  })
  const mutation = useUniversityAccountCreateMutation(formCreate.reset, closeModal)
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

export function useUniversityAccountCreateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (createUserBody) =>
      toast.promise(
        accountUniversityApi.createUniversity(getAccessToken.data!.access_token.token, createUserBody),
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
        queryClient.invalidateQueries(AccountUniversityKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useUniversityUpdate = (closeModal: () => void, university: UserGetDetail) => {
  const formUpdate = useForm<UpdateUserRequest>({
    defaultValues: {
      fullname: university.fullname,
      email: university.email,
      phone: university.phone,
      university: university.university
    },
  })

  const mutation = useUniversityUpdateMutation(formUpdate.reset, closeModal, university)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useUniversityUpdateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void,
  tenant: UserGetDetail,
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (body) =>
      toast.promise(
        accountUniversityApi.updateUniversity(
          getAccessToken.data!.access_token.token,
          tenant.id,
          body
        ),
        {
          loading: 'Đang cập nhật người dùng',
          success: 'Cập nhật người dùng thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(AccountUniversityKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
