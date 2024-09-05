import GroupApi from '@/apis/group-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { GroupKeys } from '@/hooks/query/group'
import { ErrorResponse, UpdateGroupRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useGroupCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateGroupRequest>()
  const mutation = useGroupCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateGroupRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useGroupCreateMutation(
  reset: UseFormReset<UpdateGroupRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateGroupRequest, any>(
    (createGroupBody) =>
      toast.promise(
        GroupApi.createGroup(getAccessToken.data!.access_token.token, createGroupBody),
        {
          loading: 'Đang tạo mới trường học',
          success: 'Tạo mới trường học thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(GroupKeys.all)
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
//         GroupApi.updateUser(
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
//         queryClient.invalidateQueries(GroupKeys.all)
//         // reset()
//         closeModal()
//       },
//     }
//   )
// }
