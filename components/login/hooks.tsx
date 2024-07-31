import loginApi from '@/apis/login-api'
import { useLoginSuccess } from '@/hooks/useLoginSuccess'
import {
  CheckEmailRequest,
  CheckEmailResponse,
  LoginRequest,
  LoginType,
  UserDetail,
} from '@/models/api/login-api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { create } from 'zustand'

export const useLoginForm = () => {
  const onLoginSuccess = useLoginSuccess()
  const formlogin = useForm<LoginRequest>()
  const mutation = useMutation<UserDetail, AxiosError, LoginRequest>(
    (formData) => {
      return loginApi.login(formData)
    },
    {
      onSuccess: onLoginSuccess,
    }
  )
  const handleFormSubmit: SubmitHandler<LoginRequest> = async (data) => {
    mutation.mutate(data)
  }
  return {
    formlogin,
    handleFormSubmit,
    mutation,
  }
}
