import { ActivityDetail } from "./activities-api"
import { TypeQuery, TypeSort } from "./common"
import { UserGetDetail } from "./user-api"

export interface ReportLecturerFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllReportLecturerResponse {
  page: number
  total: number
  total_page: number
  data: UserGetDetail[]
}
export interface GetAllReportResponse {
  page: number
  total: number
  total_page: number
  data: ReportDetail[]
}
export interface ReportDetail {
  id: string
  student: {
    id: string
    fullname: string
    email: string
  }
  description: string
  business: string
  milestone: {
    id: string
    description: string
    time: string
  }
  status: 'WAITTING_SCORE' | 'BUSINESS_CHECKED' | 'LECTURER_CHECKED'
  attachments: any
  upload_time: string
  expired_time: number
  comments: string[]
  activities: ActivityDetail[]
  score_business: number
  score_lecturer: number
}
export interface CurentReportStudentDetail {
  id: string
  description: string
  time: string
  reports: ReportDetail[]
}
export interface UpdateReportRequest {
  milestone_id: string
  schedule_id: string
  attachments: any
  description: string
}