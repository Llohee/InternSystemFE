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
// export interface UpdateReportLecturerRequest {
//   code: string
//   name?: string
//   // website: string
//   // location?: string
//   is_active?: boolean
// }