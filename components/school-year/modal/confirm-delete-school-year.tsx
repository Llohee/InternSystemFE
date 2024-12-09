import SchoolYearApi from '@/apis/school-year'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { SchoolYearKeys } from '@/hooks/query/school-year'
import { ErrorResponse, SchoolYearDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteSchoolYearModal = (props: {
  isOpen: boolean
  closeModal: () => void
  schoolyearDetail: SchoolYearDetail
}) => {
  const mutation = useDeleteSchoolYearMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa năm học đã chọn'}
        description={'Năm học đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.schoolyearDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteSchoolYearMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        SchoolYearApi.deleteSchoolYear(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa năm học',
          success: 'Năm học đã được xóa thành công',
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
export default ConfirmDeleteSchoolYearModal
