import accountUniversityApi from '@/apis/account-university-api'
import { ConfirmModal } from '@/components/common/confirm'
import { AccountUniversityKeys } from '@/hooks/query/account/university'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ErrorResponse, UserGetDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteUniversityModal = (props: {
  isOpen: boolean
  closeModal: () => void
  universityDetail: UserGetDetail
}) => {
  const mutation = useDeleteUniversityMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa người dùng đã chọn'}
        description={'Người dùng đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.universityDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteUniversityMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        accountUniversityApi.deleteUniversity(
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
        queryClient.invalidateQueries(AccountUniversityKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteUniversityModal
