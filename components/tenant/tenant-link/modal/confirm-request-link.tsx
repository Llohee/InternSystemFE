import notificationApi from '@/apis/notification-api'
import TenantApi from '@/apis/tenant-api'
import { useRoleIsAdminUniversity } from '@/components/auth/hooks'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import { ErrorResponse, RequestLink, TenantDetail } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmRequestLink = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
}) => {
  const isRoleAU = useRoleIsAdminUniversity()
  const mutation = useRequestLinkMutation(props.closeModal, isRoleAU)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Liên kết đến trường học'}
        description={`Yêu cầu sẽ được gửi đến ${
          isRoleAU ? 'doanh nghiệp' : 'nhà trường'
        }`}
        type="Info"
        action={() => {
          mutation.mutate(
            isRoleAU
              ? {
                  bussiness_id: `${props.tenantDetail.id}`,
                }
              : { university_id: `${props.tenantDetail.id}` }
          )
          props.closeModal()
        }}
      />
    </>
  )
}
const useRequestLinkMutation = (action: () => void, isRoleAU: boolean) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, RequestLink, any>(
    (body) =>
      toast.promise(
        notificationApi.requestLink(
          getAccessToken.data!.access_token.token,
          body,
          isRoleAU
        ),
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

export default ConfirmRequestLink
