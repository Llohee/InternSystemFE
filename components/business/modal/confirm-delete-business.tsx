import TenantApi from '@/apis/tenant-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import { ErrorResponse, TenantDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteBusinessModal = (props: {
  isOpen: boolean
  closeModal: () => void
  businessDetail: TenantDetail
  type: string
}) => {
  const mutation = useDeleteBusinessMutation(props.closeModal, props.type)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa doanh nghiệp đã chọn'}
        description={'Doanh nghiệp đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.businessDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteBusinessMutation = (action: () => void, type: string) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        TenantApi.deleteTenant(
          getAccessToken.data!.access_token.token,
          body,
          type
        ),
        {
          loading: 'Đang xóa doanh nghiệp',
          success: 'Doanh nghiệp đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(TenantKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteBusinessModal
