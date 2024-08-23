import accountStudentApi from '@/apis/account-student-api'
import { AccountStudentKeys } from '@/hooks/query/account/student'
import { useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import {
  emailRegex,
  passwordRegex,
  phoneRegex
} from '@/hooks/regex'
import { ErrorResponse, UpdateUserRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useStudentAccountCreate = (closeModal: () => void) => {
  const useGetDetail = useGetUserDetail()
  const formCreate = useForm<UpdateUserRequest>()
  formCreate.register('type', { value: 'STUDENT' })
  formCreate.register('role', { value: 'ST' })
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
      message: 'Không đúng định dạng mật khẩu',
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
  const mutation = useStudentAccountCreateMutation(formCreate.reset, closeModal)
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

export function useStudentAccountCreateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (createUserBody) =>
      toast.promise(
        accountStudentApi.createStudent(getAccessToken.data!.access_token.token, createUserBody),
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
        queryClient.invalidateQueries(AccountStudentKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
// export const useUserUpdate = (closeModal: () => void, user: UserGetDetail) => {
//   const { t } = useTranslation()
//   const formUpdate = useForm<UpdateUserRequest>({
//     defaultValues: {
//       email: user.email,
//       fullname: user.fullname,
//       phone: user.phone,
//       roles: user.roles,
//       is_active: user.is_active,
//     },
//   })

//   formUpdate.register('phone', {
//     pattern: {
//       value: phoneRegex,
//       message: t('input.mess.error_phone'),
//     },
//   })
//   formUpdate.register('email', {
//     required: t('input.mess.required.none'),
//     maxLength: { value: 50, message: 'user.display_name_max' },

//     pattern: {
//       value: emailRegex,
//       message: t('input.mess.error_email'),
//     },
//   })
//   formUpdate.register('fullname', {
//     required: t('input.mess.required.label', { label: 'Tên hiển thị' }),
//     maxLength: { value: 100, message: t('user.display_name_max') },
//   })
//   const mutation = useUserUpdateMutation(formUpdate.reset, closeModal, user)
//   const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
//     mutation.mutate(data)
//   }

//   return {
//     // Form
//     formUpdate,
//     handleFormSubmit,
//     mutation,
//   }
// }
// export function useUserUpdateMutation(
//   reset: UseFormReset<UpdateUserRequest>,
//   closeModal: () => void,
//   user: UserGetDetail
// ) {
//   const getAccessToken = useGetAccessToken()
//   const { t } = useTranslation()
//   return useMutation<any, AxiosError, UpdateUserRequest, any>(
//     (updateUserBody) =>
//       toast.promise(
//         accountStudentApi.updateUser(
//           getAccessToken.data!.accessToken,
//           user.id,
//           updateUserBody
//         ),
//         {
//           loading: t('user.updating'),
//           success: t('user.update_successfully'),
//           error: (err) =>
//             (err as AxiosError<ErrorResponse>).response?.data?.description ??
//             (err as AxiosError).message,
//         },
//         {}
//       ),
//     {
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(AccountStudentKeys.all)
//         // reset()
//         closeModal()
//       },
//     }
//   )
// }
