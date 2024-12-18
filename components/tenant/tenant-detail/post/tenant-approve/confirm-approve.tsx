import PostApi from '@/apis/post-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { PostKeys } from '@/hooks/query/post'
import {
  ErrorResponse,
  UpdateApplyCVRequest,
  UserGetDetail
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface UpdateActivationProps {
  isOpen: boolean
  closeModal: () => void
  post_id: string
  CV_applying: { cv_id: string; user_info: UserGetDetail; status: 'Pending' | 'HR Approver' | 'AU Approver' }
}
const TenantConfirmApproveModal = (props: UpdateActivationProps) => {
  const mutation = useApproveMutation(props.closeModal)
  const router = useRouter()
  const { tenant_code } = router.query
  return (
    <>
      <ConfirmModal
        {...props}
        title={`Xác nhận phê duyệt sinh viên ${props.CV_applying.user_info.fullname}`}
        description={''}
        type="Info"
        action={() => {
          mutation.mutate({
            post_id: props.post_id,
            cv_id: props.CV_applying.cv_id,
            business_code: tenant_code as string
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
        PostApi.AUapproveCV(getAccessToken.data!.access_token.token, body),
        {
          loading: 'Đang phê duyệt sinh viên',
          success: 'Phê duyệt sinh viên thành công',
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
export default TenantConfirmApproveModal
