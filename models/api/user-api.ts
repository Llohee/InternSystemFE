import { ActivityDetail } from "./activities-api"
import { roleUser } from "./common"
import { GroupDetail } from "./group-api"

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
  group: GroupDetail
  activities: ActivityDetail[]
  id_number: string //MSSV
  faculty: string //Khoa
  institute: string //Viện
  class: string //Lớp
  major: string //Ngành
  program_training: string //CT đào tạo
  academic_year: string
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
  password: string
  id_number: string
  fullname: string
  phone?: string
  faculty: string
  institute: string
  program_training: string
  class: string
  major: string
  academic_year: any
  university: string
  business: string
  roles: roleUser[]
  role: string
  type: string
  is_active: boolean
}