import { ActivityDetail } from "./activities-api"
import { ConfigDetail, TypeQuery, TypeSort } from "./common"

export interface CustomPostFilterRequest {
  title: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllCustomPostResponse {
  page: number
  total: number
  total_page: number
  data: CustomPostDetail[]
}
export interface CustomPostDetail {
  id: string
  title: string
  position: ConfigDetail
  is_active: boolean
  // CV_applying: { cv_id: string, user_info: UserDetail, status: 'Pending' | 'HR Approver' | 'AU Approver' }[]
  description: string
  created_time?: string
  expired_time?: string
  slot: number
  activities: ActivityDetail[]
  profession: ConfigDetail
  salary_min: number
  salary_max: number
  currency: string
  negotiable_salary: boolean
}

export interface UpdateCustomPostRequest {
  id: string
  title: string
  description: string
  slot: number
  is_active: boolean
  profession: string
  salary_min?: number
  salary_max?: number
  negotiable_salary: boolean
  currency: string
  expired_time: string
}
