import PostApi from "@/apis/post-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { PostKeys } from "@/hooks/query/post"
import { ErrorResponse, PostDetail, UpdatePostRequest } from "@/models/api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const usePostCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdatePostRequest>()
  const mutation = usePostCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdatePostRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function usePostCreateMutation(
  reset: UseFormReset<UpdatePostRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdatePostRequest, any>(
    (createPostBody) =>
      toast.promise(
        PostApi.createPost(getAccessToken.data!.access_token.token, createPostBody),
        {
          loading: 'Đang tạo bài đăng',
          success: 'Tạo bài đăng thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(PostKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const usePostUpdate = (closeModal: () => void, Post: PostDetail) => {
  const formUpdate = useForm<UpdatePostRequest>({
    defaultValues: {
      position: Post.position.id,
      local: Post.local.id,
      profession: Post.profession.id,
      description: Post.description
    }
  })

  const mutation = usePostUpdateMutation(formUpdate.reset, closeModal, Post)
  const handleFormSubmit: SubmitHandler<UpdatePostRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function usePostUpdateMutation(
  reset: UseFormReset<UpdatePostRequest>,
  closeModal: () => void,
  Post: PostDetail
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdatePostRequest, any>(
    (updatePostBody) =>
      toast.promise(
        PostApi.updatePost(
          getAccessToken.data!.access_token.token,
          updatePostBody,
          Post.id
        ),
        {
          loading: 'Đang cập nhật bài đăng',
          success: 'Cập nhật thành công bài đăng',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(PostKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}