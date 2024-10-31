import GroupApi from '@/apis/group-api'
import TenantApi from '@/apis/tenant-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { GroupKeys } from '@/hooks/query/group'
import { ErrorResponse, GroupDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteGroupModal = (props: {
  isOpen: boolean
  closeModal: () => void
  groupDetail: GroupDetail
}) => {
  const mutation = useDeleteGroupMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa nhóm đã chọn'}
        description={'Nhóm đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.groupDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteGroupMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        GroupApi.deleteGroup(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa nhóm',
          success: 'Nhóm đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GroupKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteGroupModal
