import TenantApi from '@/apis/tenant-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { TenantKeys } from '@/hooks/query/tenant'
import { ErrorResponse, TenantDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteUniversityModal = (props: {
  isOpen: boolean
  closeModal: () => void
  universityDetail: TenantDetail
  type: string
}) => {
  const mutation = useDeleteUniversityMutation(props.closeModal, props.type)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa trường học đã chọn'}
        description={'Trường học đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.universityDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteUniversityMutation = (action: () => void, type: string) => {
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
          loading: 'Đang xóa trường học',
          success: 'Trường học đã được xóa thành công',
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
export default ConfirmDeleteUniversityModal
