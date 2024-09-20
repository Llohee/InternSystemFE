import ReportLecturerApi from '@/apis/report-lecturer-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { ReportLecturerKeys } from '@/hooks/query/report-lecturer'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

export const useReportCommentCreate = (ReportId: string, module: string) => {
  const createComment = useForm<{ content: string, report_id: string }>()
  createComment.register('report_id', { value: ReportId })
  const mutation = usePostReportCommentMutation(ReportId, module, () => {
    createComment.reset()
  })
  const handleFormSubmit: SubmitHandler<{ content: string }> = async (data) => {
    mutation.mutate(data)
    // console.log(data, typeReport)
  }

  return {
    // Form
    createComment,
    handleFormSubmit,
    mutation,
  }
}

const usePostReportCommentMutation = (
  ReportId: string,
  module: string,
  reset: () => void
) => {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, { content: string }, any>(
    (body) =>
      ReportLecturerApi.postReportComment(
        getAccessToken.data!.access_token.token,
        ReportId,
        body.content,
        module
      ),
    {
      onSuccess: (data) => {
        reset()
        return queryClient.invalidateQueries(ReportLecturerKeys.all)
      },
    }
  )
}
