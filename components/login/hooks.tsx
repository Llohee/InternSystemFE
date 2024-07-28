import loginApi from "@/apis/login-api";
import { useLoginSuccess } from "@/hooks/useLoginSuccess";
import { CheckEmailRequest, CheckEmailResponse, LoginRequest, LoginType, UserDetail } from "@/models/api/login-api";
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { create } from "zustand";

export const useLoginForm = () => {
  const onLoginSuccess = useLoginSuccess();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoginRequest>()
  register('email', { required: "Email là bắt buộc" })
  register('password', { required: "Mật khẩu là bắt buộc" })
  const mutation = useMutation<UserDetail, AxiosError, LoginRequest>(
    (formData) => loginApi.login(formData),
    {
      onSuccess: onLoginSuccess,
    }
  )

  const handleFormSubmit: SubmitHandler<LoginRequest> = (data) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    handleFormSubmit,
    mutation,
  };
};

export const useLoginWithAccessCode = () => {
  const onLoginSuccess = useLoginSuccess()

  const mutation = useMutation<UserDetail, AxiosError, string>(
    (body) => loginApi.loginWithAccessCode(body),
    {
      onSuccess: (data) => {
        onLoginSuccess(data)
      },
    }
  )

  return { mutation }
}

export interface LoginState {
  type: LoginType
  email: string | undefined
  url: string | undefined
  updateLogin: (newType: LoginType, email: string | undefined) => void
  updateUrl: (newUrl: string | undefined) => void
  reset: () => void
}

export const useLoginTypeStore = create<LoginState>((set) => ({
  type: 'ANONYMOUS',
  email: undefined,
  url: undefined,
  updateLogin: (newType, newEmail) => {
    set({ type: newType, email: newEmail })
  },
  updateUrl: (newUrl) => {
    set({ url: newUrl })
  },
  reset: () => {
    set({ type: 'ANONYMOUS', email: undefined, url: undefined })
  },
}))

export const useCheckEmailForm = (email?: string) => {
  const checkForm = useForm<CheckEmailRequest>({ defaultValues: { email } })

  const loginType = useLoginTypeStore()
  const mutation = useMutation<
    CheckEmailResponse,
    AxiosError,
    CheckEmailRequest
  >((formData) => loginApi.ckeckEmail(formData), {
    onSuccess: (data, variables, context) => {
      loginType.updateLogin(data.type, checkForm.getValues('email'))
      if (data.type === 'KEYCLOAK') {
        loginType.updateUrl(data.url)
      }
    },
  })

  const handleFormSubmit: SubmitHandler<CheckEmailRequest> = (data) => {
    mutation.mutate(data)
  }

  return {
    checkForm,
    handleFormSubmit,
    mutation,
  }
}