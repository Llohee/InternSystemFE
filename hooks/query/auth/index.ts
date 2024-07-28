import loginApi from '@/apis/login-api'
import {
  AccessTokenContext,
  UserDetailQueryContext,
} from '@/components/auth/auth-provider'
import { useLogoutNavigate } from '@/hooks/useLogout'
import { AccessTokenDecoded, UserDetail } from '@/models/api'
import { queryClient } from '@/pages/_app'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { toast } from 'react-hot-toast'

export const authKeys = {
  getAccessToken: () => ['getAccessToken'] as const,
  getUserDetail: () => ['getUserDetail'] as const,
}

export function useInitialPageAccessToken() {
  const logoutNavigate = useLogoutNavigate()
  return useQuery(
    authKeys.getAccessToken(),
    async () => {
      // if it's not time for refreshing => get data on localstorage
      if (
        Number(localStorage.getItem('next-ca-nextTimeRefresh')) -
          Date.now() -
          5000 >
        0
      ) {
        return JSON.parse(
          localStorage.getItem('next-ca-userInfo')!
        ) as UserDetail as unknown as Promise<UserDetail>
      }
      const data = await loginApi.refreshToken(
        (JSON.parse(localStorage.getItem('next-ca-userInfo')!) as UserDetail)
          .refresh_token
      )
      localStorage.setItem('next-ca-userInfo', JSON.stringify(data))
      localStorage.setItem('next-ca-token', data.access_token)
      const decoded = jwtDecode<AccessTokenDecoded>(data.access_token)
      localStorage.setItem(
        'next-ca-nextTimeRefresh',
        (decoded.exp * 1000).toString()
      )
      queryClient.setQueryData(authKeys.getUserDetail(), data)
      return data
    },
    {
      // bc of active refetch, make this query fresh so it does not auto refetch
      // staleTime: localStorage.getItem('next-ca-nextTimeRefresh')
      //   ? Number(localStorage.getItem('next-ca-nextTimeRefresh')) -
      //     Date.now() -
      //     5000
      //   : 50 * 60 * 1000,
      staleTime: Infinity,
      // Whenever refreshToken API returns an error, log out immediately
      onError: (_err) => {
        toast.error('Failed when calling Refresh Token API')
        logoutNavigate()
      },
      // onSuccess: (data) => {
      //   toast.success('Refresh data')
      // },
      // onSuccess: (data) => console.log(data),
      // enable to make sure that local storage have data when refetch
      enabled:
        typeof window !== 'undefined' &&
        localStorage.getItem('next-ca-userInfo') !== null,
      // refetch every 50 minutes
      // refetchInterval: 10 * 60 * 1000,
      refetchInterval: (data) => {
        if (data !== undefined && data.access_token !== '') {
          const decoded = jwtDecode<AccessTokenDecoded>(data.access_token)
          const remainingTime = decoded.exp * 1000 - Date.now() - 5000
          return remainingTime
        }
        return false
      },
      refetchIntervalInBackground: true,
      retry: false,
      // Always take UserDetail data from Local Storage
    }
  )
}

export function useGetAccessToken() {
  const accessToken = React.useContext(AccessTokenContext)
  if (!accessToken) {
    throw new Error('AccessTokenContext: No value provided')
  }
  return accessToken
}

export function useInitialPageUserDetail() {
  return useQuery<UserDetail | null>(
    authKeys.getUserDetail(),
    () =>
      // Just place holder code. This Promise will never be called
      Promise.resolve(null),
    {
      // Does not refetch ever!
      enabled: false,
      // Always take UserDetail data from Local Storage
      initialData:
        typeof window !== 'undefined' &&
        localStorage.getItem('next-ca-userInfo')
          ? (JSON.parse(
              localStorage.getItem('next-ca-userInfo')!
            ) as UserDetail) // eslint-disable-line
          : null,
    }
  )
}

export function useGetUserDetail() {
  const userDetailQuery = React.useContext(UserDetailQueryContext)
  if (!userDetailQuery) {
    throw new Error('UserDetailContext: No value provided')
  }
  return userDetailQuery
}
// export function getUserDetailFromLocalStorage() {
//   const userDetail = React.useContext(UserDetailContext)
//   if (!userDetail) {
//     throw new Error('UserDetailContext: No value provided')
//   }
//   return userDetail
// }
export function getUserDetailFromLocalStorage() {
  return localStorage.getItem('next-ca-userInfo')
    ? (JSON.parse(localStorage.getItem('next-ca-userInfo')!) as UserDetail) // eslint-disable-line
    : ({} as UserDetail)
}
