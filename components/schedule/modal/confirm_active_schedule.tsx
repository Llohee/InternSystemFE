import scheduleApi from '@/apis/schedule-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ScheduleKeys } from '@/hooks/query/schedule'
import {
  ErrorResponse,
  ScheduleDetail,
  UpdateActiveSchedule,
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface UpdateActivationProps {
  isOpen: boolean
  closeModal: () => void
  schedule?: ScheduleDetail
}
const ActiveScheduleModal = (props: UpdateActivationProps) => {
  const mutation = useActivescheduleMutation(props.closeModal)

  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xác nhận thay đổi mốc thời gian'}
        description={'Mốc thời gian sẽ được áp dụng với tất cả sinh viên'}
        type="Info"
        action={() => {
          mutation.mutate({
            id: `${props.schedule?.id}`,
          })
          props.closeModal()
        }}
      />
    </>
  )
}

const useActivescheduleMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateActiveSchedule, any>(
    (body) =>
      toast.promise(
        scheduleApi.updateActiveSchedule(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang áp dụng mốc thời gian',
          success: 'Áp dụng thành công mốc thời gian',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        action()
        queryClient.invalidateQueries(ScheduleKeys.all)
      },
    }
  )
}
export default ActiveScheduleModal
