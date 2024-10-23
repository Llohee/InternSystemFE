import accountStudentApi from '@/apis/account-student-api'
import { AccountStudentKeys } from '@/hooks/query/account/student'
import { useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import {
  emailRegex,
  passwordRegex,
  phoneRegex
} from '@/hooks/regex'
import { ErrorResponse, UpdateUserRequest, UserDetail, UserGetDetail } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useStudentAccountCreate = (closeModal: () => void) => {
  // const useGetDetail = useGetUserDetail()
  const formCreate = useForm<UpdateUserRequest>()
  // formCreate.register('type', { value: 'STUDENT' })
  // formCreate.register('role', { value: 'ST' })
  // formCreate.register('university', { value: useGetDetail.data.university })
  formCreate.register('phone', {
    pattern: {
      value: phoneRegex,
      message: 'Không đúng định dạng số điện thoại',
    },
  })
  formCreate.register('email', {
    required: 'Email là bắt buộc',
    pattern: {
      value: emailRegex,
      message: 'Không đúng định dạng email',
    },
  })
  formCreate.register('password', {
    pattern: {
      value: passwordRegex,
      message: 'Ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt',
    },
  })
  formCreate.register('fullname', {
    required: 'Tên trường là bắt buộc',
    maxLength: { value: 100, message: 'a' },
    pattern: {
      value: /.{3,}/,
      message: 'a',
    },
  })
  const mutation = useStudentAccountCreateMutation(formCreate.reset, closeModal)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    // Form
    formCreate,
    handleFormSubmit,
    mutation,
  }
}

export function useStudentAccountCreateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (createUserBody) =>
      toast.promise(
        accountStudentApi.createStudent(getAccessToken.data!.access_token.token, createUserBody),
        {
          loading: 'Đang tạo mới người dùng',
          success: 'Tạo mới người dùng thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(AccountStudentKeys.all)
        reset()
        closeModal()
      },
    }
  )
}
export const useStudentUpdate = (closeModal: () => void, student: UserGetDetail) => {
  const formUpdate = useForm<UpdateUserRequest>({
    defaultValues: {
      fullname: student.fullname,
      email: student.email,
      id_number: student.id_number,
      faculty: student.faculty,
      institute: student.institute,
      major: student.major,
      program_training: student.program_training,
      class: student.class,
      academic_year: { start: student.academic_year.start, end: student.academic_year.end },
      phone: student.phone,
    },
  })

  const mutation = useStudentUpdateMutation(formUpdate.reset, closeModal, student)
  const handleFormSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    mutation.mutate(data)
  }

  return {
    formUpdate,
    handleFormSubmit,
    mutation,
  }
}
export function useStudentUpdateMutation(
  reset: UseFormReset<UpdateUserRequest>,
  closeModal: () => void,
  tenant: UserGetDetail,
) {
  const getAccessToken = useGetAccessToken()
  return useMutation<any, AxiosError, UpdateUserRequest, any>(
    (body) =>
      toast.promise(
        accountStudentApi.updateStudent(
          getAccessToken.data!.access_token.token,
          tenant.id,
          body
        ),
        {
          loading: 'Đang cập nhật sinh viên',
          success: 'Cập nhật sinh viên thành công',
          error: (err) =>
            (err as AxiosError<ErrorResponse>).response?.data?.description ??
            (err as AxiosError).message,
        },
        {}
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(AccountStudentKeys.all)
        // reset()
        closeModal()
      },
    }
  )
}
