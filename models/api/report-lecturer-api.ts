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
  status: 'OVERDUE'
  attachments: string[]
  upload_time: string
  expired_time: number
  comment: string[]
  activities: {
    action: string
    actor: {
      id: string
      fullname: string
      email: string
    }
    time: string
  }
  score: number
}
// export interface UpdateReportLecturerRequest {
//   code: string
//   name?: string
//   // website: string
//   // location?: string
//   is_active?: boolean
// }