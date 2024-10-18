import PostApi from "@/apis/post-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ProfileCVKeys } from "@/hooks/query/profile-cv"
import { ErrorResponse, UpdateApplyCVRequest } from "@/models/api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const useApplyCV = (closeModal: () => void, post_id: string) => {
  const formCreate = useForm<UpdateApplyCVRequest>()
  formCreate.register('post_id', { value: post_id })
  const mutation = useApplyCVMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateApplyCVRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useApplyCVMutation(
  reset: UseFormReset<UpdateApplyCVRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateApplyCVRequest, any>(
    (createGroupBody) =>
      toast.promise(
        PostApi.applyCV(getAccessToken.data!.access_token.token, createGroupBody),
        {
          loading: 'Đang gửi đơn ứng tuyển',
          success: 'Ứng tuyển thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries(ProfileCVKeys.all)
        reset()
        closeModal()
      },
    }
  )
}