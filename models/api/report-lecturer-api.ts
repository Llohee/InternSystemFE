import { ActivityDetail } from "./activities-api"
import { TypeQuery, TypeSort } from "./common"

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
  data: ReportLecturerDetail[]
}
export interface ReportLecturerDetail {
  id: string
  fullname: string
  code: string
  email: string
  phone: string
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
  status: 'OVERDUE' | 'ONTIME'
  attachments: any
  upload_time: string
  expired_time: number
  comments: string[]
  activities: ActivityDetail[]
  score: number
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