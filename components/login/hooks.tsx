import loginApi from '@/apis/login-api'
import { useLoginSuccess } from '@/hooks/useLoginSuccess'
import { LoginRequest, UserDetail } from '@/models/api/login-api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

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
export const useLoginAzure = () => {
  const onLoginSuccess = useLoginSuccess()
  const mutationAzure = useMutation<UserDetail, AxiosError, any>(
    (code) => {
      return loginApi.loginWithAccessCode(code as string) 
    },
    {
      onSuccess: onLoginSuccess,
    }
  )
  return { 
    mutationAzure
  }
}
