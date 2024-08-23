import { TypeQuery, TypeSort } from "./common"
import { UserGetDetail } from "./user-api"

export interface GroupFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllGroupResponse {
  page: number
  total: number
  total_page: number
  data: GroupDetail[]
}
export interface GroupDetail {
  id: string
  name: string
  lecturer: {
    id: string,
    fullname: string
  }
  university: string
  created_time: string
  num_of_student: string
}
export interface UpdateGroupRequest {
  name?: string
  lecturer: string
  students: string[]
  is_active?: boolean
  created_time: string
}