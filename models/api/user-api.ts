import { roleUser } from "./common"

export interface UserGetDetail {
  id: string
  fullname: string
  university: string
  business: string
  email: string
  phone: string
  created_time: string
  is_active: boolean
  roles: roleUser[]
  updated_time: string
  type: "STUDENT" | "BUSINESS" | "UNIVERSITY"
}
export interface GetAllUsersResponse {
  page: number
  total: number
  total_page: number
  data: UserGetDetail[]
}
export interface UpdateUserRequest {
  email: string
  fullname: string
  password: string
  phone?: string
  university: string
  business: string
  roles: roleUser[]
  role: string
  type: string
  is_active: boolean
}