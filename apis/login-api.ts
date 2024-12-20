import {  LoginRequest, UserDetail } from "@/models/api/login-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"

const loginApi = {
  // ckeckEmail(data: CheckEmailRequest): Promise<CheckEmailResponse> {
  //   const url = '/auth/check/'
  //   return axiosClient.post(url, data)
  // },
  login(data: LoginRequest): Promise<UserDetail> {
    const url = '/auth/login/'
    return axiosClient.post(url, {
      ...trymObject(data),
      device: localStorage.getItem('fcmToken') || undefined,
    })
  },
  // logout(accessToken: string): Promise<UserDetail> {
  //   const url = '/auth/logout/'
  //   return axiosClient.post(
  //     url,
  //     {
  //       device: localStorage.getItem('fcmToken'),
  //     },
  //     { headers: { token: accessToken } }
  //   )
  // },
  // loginWithAccessCode(accessCode: string): Promise<UserDetail> {
  //   const url = '/auth/login-ad/'
  //   const config = {
  //     headers: { 'access-code': accessCode },
  //   }
  //   return axiosClient.post(url, {}, config)
  // },
  refreshToken(refreshToken: string): Promise<UserDetail> {
    const config = {
      headers: { 'refresh-token': refreshToken },
    }
    const url = '/auth/refresh-token/'
    return axiosClient.post(url, {}, config)
  },
  loginWithAccessCode(data: string): Promise<UserDetail> {
    const url = '/auth/sso/login_azure'
  
    return axiosClient.post(url,{code :data})
  },
}

export default loginApi