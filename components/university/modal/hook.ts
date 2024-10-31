import TenantApi from '@/apis/tenant-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import { ErrorResponse, TenantDetail, UpdateTenantRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useUniversityCreate = (closeModal: () => void, type: string) => {
  const formCreate = useForm<UpdateTenantRequest>()
  const mutation = useUniversityCreateMutation(formCreate.reset, closeModal, type)
  const handleFormSubmit: SubmitHandler<UpdateTenantRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}
export function useUniversityCreateMutation(
  reset: UseFormReset<UpdateTenantRequest>,
  closeModal: () => void,
  type: string
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateTenantRequest, any>(
    (body) =>
      toast.promise(
        TenantApi.createTenant(getAccessToken.data!.access_token.token, body, type),
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
        queryClient.invalidateQueries(TenantKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useUniversityUpdate = (closeModal: () => void, tenant: TenantDetail, type: string) => {
  const formUpdate = useForm<UpdateTenantRequest>({
    defaultValues: {
      name: tenant.name,
      code: tenant.code,
      // website: tenant.website,
      // location: tenant.location,
      is_active: tenant.is_active,
    },
  })

  const mutation = useUniversityUpdateMutation(formUpdate.reset, closeModal, tenant, type)
  const handleFormSubmit: SubmitHandler<UpdateTenantRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useUniversityUpdateMutation(
  reset: UseFormReset<UpdateTenantRequest>,
  closeModal: () => void,
  tenant: TenantDetail,
  type: string
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateTenantRequest, any>(
    (body) =>
      toast.promise(
        TenantApi.updateTenant(
          getAccessToken.data!.access_token.token,
          tenant.id,
          body,
          type
        ),
        {
          loading: 'Đang cập nhật trường học',
          success: 'Cập nhật trường học thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(TenantKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
