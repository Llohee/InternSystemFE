import accountLecturerApi from '@/apis/account-lecturer-api'
import { ConfirmModal } from '@/components/common/confirm'
import { AccountLecturerKeys } from '@/hooks/query/account/lecturer'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ErrorResponse, UserGetDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteLecturerModal = (props: {
  isOpen: boolean
  closeModal: () => void
  lecturerDetail: UserGetDetail
}) => {
  const mutation = useDeleteLecturerMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa giảng viên đã chọn'}
        description={'Giảng viên đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.lecturerDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteLecturerMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        accountLecturerApi.deleteLecturer(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa giảng viên',
          success: 'Giảng viên đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(AccountLecturerKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteLecturerModal
