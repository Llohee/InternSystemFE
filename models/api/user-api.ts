import { roleUser } from "./common"

export interface UserGetDetail {
  id: string
  fullname: string
  university: string
  business: string
  email: string
  phone: string
  is_active: boolean
  role: roleUser[]
  created_time: string
  activities: {
    actor: string
    action: string
    time: string
  }[]
  id_number: string
  faculty: string
  institute: string
  class: string
  program_training: string
  academic_year: string
  group: {
    id: string
    name: string
    students: {
      fullname: string
      email: string
    }[]
    created_time: string
    lecturer_id: {
      fullname: string
      email: string
      phone: string
    }
  }
  status: string
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