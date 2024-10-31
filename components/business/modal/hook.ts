import TenantApi from '@/apis/tenant-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import { ErrorResponse, TenantDetail, UpdateTenantRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useBusinessCreate = (closeModal: () => void, type: string) => {
  const formCreate = useForm<UpdateTenantRequest>()
  const mutation = useBusinessCreateMutation(formCreate.reset, closeModal, type)
  const handleFormSubmit: SubmitHandler<UpdateTenantRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}
export function useBusinessCreateMutation(
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
          loading: 'Đang tạo mới doanh nghiệp',
          success: 'Tạo mới doanh nghiệp thành công',
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
export const useBusinessUpdate = (closeModal: () => void, tenant: TenantDetail, type: string) => {
  const formUpdate = useForm<UpdateTenantRequest>({
    defaultValues: {
      name: tenant.name,
      code: tenant.code,
      website: tenant.website,
      location: tenant.location,
      is_active: tenant.is_active,
    },
  })

  const mutation = useBusinessUpdateMutation(formUpdate.reset, closeModal, tenant, type)
  const handleFormSubmit: SubmitHandler<UpdateTenantRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useBusinessUpdateMutation(
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
          loading: 'Đang cập nhật doanh nghiệp',
          success: 'Cập nhật doanh nghiệp thành công',
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
