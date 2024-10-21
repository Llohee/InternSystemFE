import PostApi from '@/apis/post-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import {
  ErrorResponse,
  UpdateApplyCVRequest,
  PostDetail,
  UserDetail,
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { PostKeys } from '@/hooks/query/post'

interface UpdateActivationProps {
  isOpen: boolean
  closeModal: () => void
  post_id: string
  CV_applying: { cv_id: string; user_info: UserDetail; status: string }
}
const ConfirmApproveModal = (props: UpdateActivationProps) => {
  const mutation = useApproveMutation(props.closeModal)

  return (
    <>
      <ConfirmModal
        {...props}
        title={`Xác nhận phê duyệt ứng viên ${props.CV_applying.user_info.fullname}`}
        description={''}
        type="Info"
        action={() => {
          mutation.mutate({
            post_id: props.post_id,
            cv_id: props.CV_applying.cv_id,
          })
          props.closeModal()
        }}
      />
    </>
  )
}

const useApproveMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateApplyCVRequest, any>(
    (body) =>
      toast.promise(
        PostApi.HRapproveCV(getAccessToken.data!.access_token.token, body),
        {
          loading: 'Đang phê duyệt ứng viên',
          success: 'Phê duyệt ứng viên thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        action()
        queryClient.invalidateQueries(PostKeys.all)
      },
    }
  )
}
export default ConfirmApproveModal
