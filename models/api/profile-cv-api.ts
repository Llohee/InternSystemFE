import { TypeQuery, TypeSort } from "./common"
import { TenantDetail } from "./tenant-api"
import { UserGetDetail } from "./user-api"
export interface CVFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllCVResponse {
  page: number
  total: number
  total_page: number
  data: CVDetail[]
}
export interface CVDetail {
  id: string
  title: string
  user: UserGetDetail
  target_job: string
  experient_job: string
  created_time: string
  educational_level: string
  is_deleted: boolean
  layout_optional: string[]
}

export interface UpdateCVRequest {
  title: string
  target_job: string
  experient_job: string
  educational_level: string
  layout_optional: {
    field: string
    values: any
    // {
    //   year?: string
    //   cer?: string
    //   role_project?: string
    //   description_role?: string
    //   time_project?: string
    //   company_project?: string
    //   name?: string
    // }[]
  }[]
  layout_demo?: { [key: string]: string }
}
export interface UpdateApplyCVRequest {
  post_id: string
  description?: string
  cv_id: string
  business_code?: string
}