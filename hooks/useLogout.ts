import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useGetAccessToken } from './query/auth'
import { AxiosError } from 'axios'
import loginApi from '@/apis/login-api'

export const useLogoutNavigate = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  // const mutation = useLogoutMutation()
  const logoutNavigate = useCallback(async (token?: string) => {
    // if (token) mutation.mutateAsync(token)
    if (typeof window !== 'undefined')
      localStorage.removeItem('next-ca-userInfo')
    toast.remove()
    queryClient.clear()
    router.push('/login', undefined, {
      shallow: true,
      unstable_skipClientCache: true,
    })
  }, [])

  return logoutNavigate
}

export const useStaffLogout = () => {
  const router = useRouter()

  const staffLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])

  return { staffLogoutNavigate }
}

export const useUserLogout = () => {
  const router = useRouter()

  const userLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])

  return { userLogoutNavigate }
}

export const useAdminLogout = () => {
  const router = useRouter()
  const adminLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])
  return { adminLogoutNavigate }
}
// const useLogoutMutation = () => {
//   return useMutation<any, AxiosError, string, any>({
//     mutationFn: (accessToken) => loginApi.logout(accessToken),
//   })
// }
