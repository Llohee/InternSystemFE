import { UserGetDetail } from "./user-api"

export interface GetAllReportComment {
  page: number
  total: number
  total_page: number
  data: ReportCommentDetail[]
}
export interface ReportCommentDetail{
  id: string
  side: "STUDENT"
  content: string
  created_time: string
  creator: UserGetDetail
}