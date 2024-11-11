import ScheduleApi from '@/apis/schedule-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ScheduleKeys } from '@/hooks/query/schedule'
import { ErrorResponse, ScheduleDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeleteScheduleModal = (props: {
  isOpen: boolean
  closeModal: () => void
  scheduleDetail: ScheduleDetail
}) => {
  const mutation = useDeleteScheduleMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa mốc thời gian đã chọn'}
        description={'Mốc thời gian đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.scheduleDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeleteScheduleMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        ScheduleApi.deleteSchedule(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang xóa mốc thời gian',
          success: 'Mốc thời gian đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(ScheduleKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeleteScheduleModal
