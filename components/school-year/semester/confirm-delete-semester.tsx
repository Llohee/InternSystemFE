import SchoolYearApi from '@/apis/school-year'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { SchoolYearKeys } from '@/hooks/query/school-year'
import { ErrorResponse, SemesterDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteSemesterModal = (props: {
  isOpen: boolean
  closeModal: () => void
  semesterDetail: SemesterDetail
}) => {
  const mutation = useDeleteSemesterMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa kì học đã chọn'}
        description={'Kì học đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.semesterDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteSemesterMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        SchoolYearApi.deleteSemester(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa kì học',
          success: 'Kì học đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(SchoolYearKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteSemesterModal
