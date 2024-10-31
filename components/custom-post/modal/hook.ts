import CustomPostApi from "@/apis/custom-post"
import { useGetAccessToken } from "@/hooks/query/auth"
import { CustomPostKeys } from "@/hooks/query/custom-post"
import { ErrorResponse } from "@/models/api"
import { UpdateCustomPostRequest } from "@/models/api/custom-post-api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const useCustomPostCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateCustomPostRequest>()

  const mutation = useCustomPostCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateCustomPostRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useCustomPostCreateMutation(
  reset: UseFormReset<UpdateCustomPostRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateCustomPostRequest, any>(
    (createPostBody) =>
      toast.promise(
        CustomPostApi.createCustomPost(getAccessToken.data!.access_token.token, createPostBody),
        {
          loading: 'Đang tạo đề tài',
          success: 'Tạo đề tài thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(CustomPostKeys.all)
        reset()
        closeModal()
      },
    }
  )
}