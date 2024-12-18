import { TypeQuery, TypeSort } from './common'
import { SchoolYearDetail, SemesterDetail } from './school-year-api'
import { UserGetDetail } from './user-api'

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
  school_year: SchoolYearDetail
  semester: SemesterDetail
  overdue_apply: Date
  lecturer: UserGetDetail
  students: UserGetDetail[]
  university: string
  created_time: string
  num_of_student: string
}
export interface UpdateGroupRequest {
  name: string
  school_year: string
  semester: string
  overdue_apply: Date | null
  lecturer: string
  students: string[]
  is_active?: boolean
  created_time: string
}
