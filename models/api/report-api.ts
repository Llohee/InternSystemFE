import { TypeQuery, TypeSort } from "./common"

export interface ReportStudentFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllReportStudentResponse {
  page: number
  total: number
  total_page: number
  data: ReportStudentDetail[]
}
export interface ReportStudentDetail {
  id: string
  fullname: string
  code: string
  email: string
  phone: string
}
// export interface UpdateReportStudentRequest {
//   code: string
//   name?: string
//   // website: string
//   // location?: string
//   is_active?: boolean
// }