import { ActivityDetail } from "./activities-api"
import { ConfigDetail, TypeQuery, TypeSort } from "./common"
import { TenantDetail } from "./tenant-api"

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
  title: string
  work_experience: string
  position: ConfigDetail
  local: ConfigDetail
  tenant: {
    id: string
    name: string
    code: string
    image_url: string
    location: string
    website: string
  }
  is_active: boolean
  uni_postings: any[]
  display_in: any[]
  CV_appplying: any[]
  description: string
  created_time: string
  expired_time: string
  slot: number
  activities: ActivityDetail[]
  profession: ConfigDetail
  salary_min: number
  salary_max: number
  currency: string
  negotiable_salary: boolean
  request: string
  interest: string
}

export interface UpdatePostRequest {
  id: string
  title: string
  position: string
  work_experience: string
  local: string
  description: string
  slot: number
  business: string
  is_active: boolean
  profession: string
  salary_min?: number
  salary_max?: number
  negotiable_salary: boolean
  currency: string
  request: string
  interest: string
  expired_time: string
}