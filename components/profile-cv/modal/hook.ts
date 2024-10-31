import ProfileAndCV from "@/apis/profile-cv-api"
import { useGetAccessToken } from "@/hooks/query/auth"
import { ProfileCVKeys } from "@/hooks/query/profile-cv"
import { ErrorResponse } from "@/models/api"
import { UpdateCVRequest } from "@/models/api/profile-cv-api"
import { queryClient } from "@/pages/_app"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"

export const useCVCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateCVRequest>()

  const mutation = useCVCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateCVRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useCVCreateMutation(
  reset: UseFormReset<UpdateCVRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateCVRequest, any>(
    (createCVBody) =>
      toast.promise(
        ProfileAndCV.createCV(getAccessToken.data!.access_token.token, createCVBody),
        {
          loading: 'Đang tạo CV',
          success: 'Tạo CV thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ProfileCVKeys.all)
        closeModal()
        reset()
      },
    }
  )
}