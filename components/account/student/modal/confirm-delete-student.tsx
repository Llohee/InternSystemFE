import accountStudentApi from '@/apis/account-student-api'
import { ConfirmModal } from '@/components/common/confirm'
import { AccountStudentKeys } from '@/hooks/query/account/student'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ErrorResponse, UserGetDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteStudentModal = (props: {
  isOpen: boolean
  closeModal: () => void
  studentDetail: UserGetDetail
}) => {
  const mutation = useDeleteStudentMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa sinh viên đã chọn'}
        description={'Sinh viên đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.studentDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteStudentMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        accountStudentApi.deleteStudent(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa sinh viên',
          success: 'Sinh viên đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(AccountStudentKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteStudentModal
