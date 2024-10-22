import accountHumanresourceApi from '@/apis/account-humanresource-api'
import { AccountHumanresourceKeys } from '@/hooks/query/account/humanresource'
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

export const useHumanresourceAccountCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateUserRequest>()
  formCreate.register('type', { value: 'BUSINESS' })
  formCreate.register('role', { value: 'HR' })
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
  formCreate.register('business', {
    required: 'Doanh nghiệp là bắt buộc',
  })
  const mutation = useHumanresourceAccountCreateMutation(formCreate.reset, closeModal)
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
export function useHumanresourceAccountCreateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (createUserBody) =>
      toast.promise(
        accountHumanresourceApi.createHumanresource(getAccessToken.data!.access_token.token, createUserBody),
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
        queryClient.invalidateQueries(AccountHumanresourceKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useHumanresourceUpdate = (closeModal: () => void, Humanresource: UserGetDetail) => {
  const formUpdate = useForm<UpdateUserRequest>({
    defaultValues: {
      fullname: Humanresource.fullname,
      email: Humanresource.email,
      phone: Humanresource.phone,
      business: Humanresource.business
    },
  })

  const mutation = useHumanresourceUpdateMutation(formUpdate.reset, closeModal, Humanresource)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useHumanresourceUpdateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void,
  tenant: UserGetDetail,
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (body) =>
      toast.promise(
        accountHumanresourceApi.updateHumanresource(
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
        queryClient.invalidateQueries(AccountHumanresourceKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
