import fileApi from '@/apis/file-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ErrorResponse } from '@/models/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useUploadFileMutation(
  onSuccess: (res: { name: string; object: string; dowload_url: string }) => void,
  onError: (message: string) => void,
  module: string
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<
    {
      name: string
      object: string
      dowload_url: string
    },
    AxiosError,
    {
      file: File
      onUploadProgress: any
    },
    any
  >(
    (data) =>
      fileApi.upload(
        getAccessToken.data!.access_token.token,
        data.file,
        data.onUploadProgress,
        module
      ),
    {
      onSuccess,
      onError: (error) => {
        const err = error as AxiosError<ErrorResponse>
        const msg = err.response?.data?.description
        onError(msg ?? error.message)
      },
    }
  )
}
