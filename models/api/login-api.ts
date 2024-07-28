export interface LoginRequest {
  email: string
  password: string
}
export type UserDetail = {
  id: string
  fullname: string
  email: string
  phone: number
  is_active: string
  role: string
  create_time: string
  activities: string
  access_token: string
  refresh_token: string
}
export interface AccessTokenDecoded {
  email: string
  exp: number
  // iat: number
  id: string
  // session: string
}
export type LoginType = 'AD' | 'NORMAL' | 'KEYCLOAK' | 'ANONYMOUS'

export interface CheckEmailRequest {
  email: string
}

export interface CheckEmailResponse {
  url: string | undefined
  type: LoginType
}