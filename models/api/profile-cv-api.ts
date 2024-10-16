import { ConfigDetail } from "./common"
import { UserGetDetail } from "./user-api"

export interface CVDetail {
  user: UserGetDetail
  target_job: string
  experient_job: string
  created_time: string
  educational_level: string
  is_deleted: boolean
  layout_optional: string[]
}

export interface UpdateCVRequest {
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