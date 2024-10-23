import PostApi from '@/apis/post-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { PostKeys } from '@/hooks/query/post'
import { ErrorResponse, PostDetail } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ConfirmDeletePostModal = (props: {
  isOpen: boolean
  closeModal: () => void
  postDetail: PostDetail
}) => {
  const mutation = useDeletePostMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Xóa bài đăng đã chọn'}
        description={'Bài đăng đã xóa sẽ không thể khôi phục'}
        type="Delete"
        action={() => {
          mutation.mutate(props.postDetail?.id ?? '')
          props.closeModal()
        }}
      />
    </>
  )
}

const useDeletePostMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<any, AxiosError, string, any>(
    (body) =>
      toast.promise(
        PostApi.deletePost(getAccessToken.data!.access_token.token, body),
        {
          loading: 'Đang xóa bài đăng',
          success: 'Bài đăng đã được xóa thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(PostKeys.all)
        action()
      },
    }
  )
}
export default ConfirmDeletePostModal
