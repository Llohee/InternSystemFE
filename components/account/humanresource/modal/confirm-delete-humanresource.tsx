import accountHumanresourceApi from '@/apis/account-humanresource-api'
import { ConfirmModal } from '@/components/common/confirm'
import { AccountHumanresourceKeys } from '@/hooks/query/account/humanresource'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ErrorResponse, UserGetDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteHumanresourceModal = (props: {
  isOpen: boolean
  closeModal: () => void
  humanresourceDetail: UserGetDetail
}) => {
  const mutation = useDeleteHumanresourceMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa người dùng đã chọn'}
        description={'Người dùng đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.humanresourceDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteHumanresourceMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        accountHumanresourceApi.deleteHumanresource(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa người dùng',
          success: 'Người dùng đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(AccountHumanresourceKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteHumanresourceModal
