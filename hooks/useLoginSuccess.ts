import { AccessTokenDecoded, UserDetail } from '@/models/api'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { authKeys } from './query/auth'
import { jwtDecode } from 'jwt-decode'

export const useLoginSuccess = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const onLoginSuccess = useCallback((data: UserDetail) => {
    queryClient.clear()
    if (typeof window !== 'undefined') {
      localStorage.setItem('next-ca-userInfo', JSON.stringify(data))
      localStorage.setItem('next-ca-token', data.access_token.token)
      const decoded = jwtDecode<AccessTokenDecoded>(data.access_token.token)
      localStorage.setItem(
        'next-ca-nextTimeRefresh',
        (decoded.exp * 1000).toString()
      )
    }
    queryClient.setQueryData(authKeys.getAccessToken(), data)
    router.push('/dashboard')
  }, [])

  return onLoginSuccess
}
