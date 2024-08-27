import ScheduleApi from '@/apis/schedule-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ScheduleKeys } from '@/hooks/query/schedule'
import { ErrorResponse, UpdateScheduleRequest } from '@/models/api'
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
//         ScheduleApi.updateUser(
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
//         queryClient.invalidateQueries(ScheduleKeys.all)
//         // reset()
//         closeModal()
//       },
//     }
//   )
// }
