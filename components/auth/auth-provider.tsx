import {
  useInitialPageAccessToken,
  useInitialPageUserDetail,
} from '@/hooks/query/auth'
import { useLogoutNavigate } from '@/hooks/useLogout'
import { UserDetail } from '@/models/api'
import { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query'
import React from 'react'

export const UserDetailQueryContext = React.createContext<DefinedUseQueryResult<
  UserDetail,
  unknown
> | null>(null)
export const AccessTokenContext = React.createContext<UseQueryResult<
  UserDetail,
  unknown
> | null>(null)

interface AuthProviderProps {
  isPublic: boolean
  children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
  if (props.isPublic) return <>{props.children}</>
  return <AuthProviderInternal>{props.children}</AuthProviderInternal>
}

const AuthProviderInternal = (props: { children: React.ReactNode }) => {
  const getPageUserDetail = useInitialPageUserDetail()
  const getPageAccessToken = useInitialPageAccessToken()
  const logoutNavigate = useLogoutNavigate()

  if (getPageUserDetail.data === null) {
    logoutNavigate()
    return (
      <div className="opacity-5">
        Looks like there is no User Detail from Local Storage when this page
        loads. However, this should not be happening
      </div>
    )
  }

  if (getPageAccessToken.data === undefined) {
    return (
      <div className="opacity-5">
        Access Token appears to be undefined. It could be that it can't get
        access token from local storage when the app first load. What else?
      </div>
    )
  }

  return (
    <AccessTokenContext.Provider value={getPageAccessToken}>
      <UserDetailQueryContext.Provider
        value={getPageUserDetail as DefinedUseQueryResult<UserDetail, unknown>}
      >
        {props.children}
      </UserDetailQueryContext.Provider>
    </AccessTokenContext.Provider>
  )
}

export default AuthProvider
