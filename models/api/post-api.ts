import { ActivityDetail } from "./activities-api"
import { ConfigDetail, TypeQuery, TypeSort } from "./common"

export interface PostFilterRequest {
  local: string
  profession: string
  salary_min?: number,
  salary_max?: number,
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface ExportPostFilterRequest {
  // name: string
  size: number
  page: number
  local?: string
  profession?: string
  sort: TypeSort[]
  query: TypeQuery[]
  // params: TypeParam[]
}
export interface GetAllPostResponse {
  page: number
  total: number
  total_page: number
  data: PostDetail[]
}
export interface PostDetail {
  id: string
  position: ConfigDetail
  local: ConfigDetail
  business: {
    id: string
    name: string
    code: string
    created_time: string
    is_active: string
    image_url: string
    location: string
    website: string
  }
  uni_postings: any[]
  display_in: any[]
  CV_appplying: any[]
  description: string
  created_time: string
  expired_time: number
  slot: number
  activities: ActivityDetail[]
  profession: ConfigDetail
  salary_min: number
  salary_max: number
  negotiable_salary: boolean
  currency_unit: string
}

export interface UpdatePostRequest {
  id: string
  position: string
  local: string
  description: string
  slot: number
  business: string
  is_active: boolean
  profession: string
  salary_min: number
  salary_max: number
  negotiable_salary: boolean
  currency: string
  request: string
  interest: string
  expired_time: number
}