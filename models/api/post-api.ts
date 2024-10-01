import { ActivityDetail } from "./activities-api"
import { ConfigDetail, TypeQuery, TypeSort } from "./common"

export interface PostFilterRequest {
  local: string
  profession: string
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
  description: string
  created_time: string
  expired_time: number
  slot: number
  activities: ActivityDetail[]
  profession: ConfigDetail
}

export interface UpdatePostRequest {
  id: string
  position: string
  local: string
  uni_postings: any[]
  description: string
  created_time: string
  expired_time: number
  slot: number
  business: string
  is_active: boolean
  activities: ActivityDetail[]
  display_in: any[]
  CV_appplying: any[]
  profession: string
}