import GroupApi from '@/apis/group-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { GroupKeys } from '@/hooks/query/group'
import { ErrorResponse, GroupDetail, UpdateGroupRequest } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useGroupCreate = (closeModal: () => void) => {
  const formCreate = useForm<UpdateGroupRequest>()
  formCreate.register('school_year', {
    required: 'Năm học là bắt buộc',
  })
  formCreate.register('semester', {
    required: 'Kì học là bắt buộc',
  })
  formCreate.register('lecturer', {
    required: 'Giảng viên phụ trách là bắt buộc',
  })
  formCreate.register('students', {
    required: 'Sinh viên là bắt buộc',
  })
  formCreate.register('overdue_apply', {
    required: 'Hạn ứng tuyển là bắt buộc',
  })
  const mutation = useGroupCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateGroupRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useGroupCreateMutation(
  reset: UseFormReset<UpdateGroupRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateGroupRequest, any>(
    (createGroupBody) =>
      toast.promise(
        GroupApi.createGroup(
          getAccessToken.data!.access_token.token,
          createGroupBody
        ),
        {
          loading: 'Đang tạo mới nhóm',
          success: 'Tạo mới nhóm thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(GroupKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useGroupUpdate = (closeModal: () => void, group: GroupDetail) => {
  const formUpdate = useForm<UpdateGroupRequest>({
    defaultValues: {
      name: group.name,
      lecturer: group.lecturer.id,
      students: group.students.map((e) => e.id),
      school_year: group.school_year.id,
      semester: group.semester.id,
      overdue_apply: group.overdue_apply,
    },
  })
  formUpdate.register('school_year', {
    required: 'Năm học là bắt buộc',
  })
  formUpdate.register('semester', {
    required: 'Kì học là bắt buộc',
  })
  formUpdate.register('lecturer', {
    required: 'Giảng viên phụ trách là bắt buộc',
  })
  formUpdate.register('students', {
    required: 'Sinh viên là bắt buộc',
  })
  formUpdate.register('overdue_apply', {
    required: 'Hạn ứng tuyển là bắt buộc',
  })

  const mutation = useGroupUpdateMutation(formUpdate.reset, closeModal, group)
  const handleFormSubmit: SubmitHandler<UpdateGroupRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useGroupUpdateMutation(
  reset: UseFormReset<UpdateGroupRequest>,
  closeModal: () => void,
  group: GroupDetail
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateGroupRequest, any>(
    (body) =>
      toast.promise(
        GroupApi.updateGroup(
          getAccessToken.data!.access_token.token,
          group.id,
          body
        ),
        {
          loading: 'Đang cập nhật nhóm',
          success: 'Cập nhật nhóm thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(GroupKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
