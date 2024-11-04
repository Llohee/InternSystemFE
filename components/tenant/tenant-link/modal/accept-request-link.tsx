import TenantApi from '@/apis/tenant-api'
import { useRoleIsAdminUniversity } from '@/components/auth/hooks'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import {
  AcceptLink,
  ErrorResponse,
  RequestLink,
  TenantDetail,
  UpdateActiveSchedule,
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

const AcceptRequestLink = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
}) => {
  const mutation = useRequestLinkMutation(props.closeModal)
  const isroleAU = useRoleIsAdminUniversity()
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Chấp nhận liên kết'}
        description={`Chấp nhận liên kết với ${
          isroleAU ? 'doanh nghiệp' : 'nhà trường'
        }`}
        type="Info"
        action={() => {
          mutation.mutate(
            isroleAU
              ? { bussiness_id: [`${props.tenantDetail.id}`] }
              : { university_id: [`${props.tenantDetail.id}`] }
          )
          props.closeModal()
        }}
      />
    </>
  )
}
const useRequestLinkMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, AcceptLink, any>(
    (body) =>
      toast.promise(
        TenantApi.acceptLink(getAccessToken.data!.access_token.token, body),
        {
          loading: 'Đang gửi yêu cầu',
          success: 'Yêu cầu đã được gửi thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        action()
        queryClient.invalidateQueries(TenantKeys.all)
      },
    }
  )
}

export default AcceptRequestLink
