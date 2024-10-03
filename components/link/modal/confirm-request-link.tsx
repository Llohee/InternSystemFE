import BusinessApi from '@/apis/business-api'
import { ConfirmModal } from '@/components/common/confirm'
import { useGetAccessToken } from '@/hooks/query/auth'
import { BusinessKeys } from '@/hooks/query/business'
import {
  ErrorResponse,
  RequestLinkUniversity,
  UniversityDetail,
  UpdateActiveSchedule,
} from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

const ConfirmRequestLink = (props: {
  isOpen: boolean
  closeModal: () => void
  universityDetail?: UniversityDetail
}) => {
  const mutation = useRequestLinkMutation(props.closeModal)
  return (
    <>
      <ConfirmModal
        {...props}
        title={'Liên kết đến trường học'}
        description={'Yêu cầu sẽ được gửi đến nhà trường'}
        type="Info"
        action={() => {
          mutation.mutate({
            university_id: `${props.universityDetail?.id}`,
          })
          props.closeModal()
        }}
      />
    </>
  )
}
const useRequestLinkMutation = (action: () => void) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, RequestLinkUniversity, any>(
    (body) =>
      toast.promise(
        BusinessApi.requestLinkUniversity(
          getAccessToken.data!.access_token.token,
          body
        ),
        {
          loading: 'Đang gửi yêu cầu',
          success: 'Yêu cầu đã được gửi thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data, variables, context) => {
        action()
        queryClient.invalidateQueries(BusinessKeys.all)
      },
    }
  )
}

export default ConfirmRequestLink
