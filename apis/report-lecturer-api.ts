import { CurentReportStudentDetail, GetAllReportLecturerResponse, GetAllReportResponse, ReportDetail, ReportLecturerFilterRequest, UpdateReportRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"
import { GetAllReportComment, ReportCommentDetail } from "@/models/api/comment-api"
import { useGetUserDetail } from "@/hooks/query/auth"
import { useRoleIsHumanResource } from "@/components/auth/hooks"

const ReportLecturerApi = {

  getAllStudent(
    accessToken: string,
    filter: ReportLecturerFilterRequest,
    profession: string,
    group_id: string
  ): Promise<GetAllReportLecturerResponse> {
    const url = `/auth/users/students?profession=${profession}&group_id=${group_id}`
    let query = getQuery(filter.query, filter.name, [
      'name',
      'code'
    ])
    let sort = filter.sort
      .map((val: any) => `${val.name}=${val.type ? '-1' : '1'}`)
      .join(';')
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        size: filter.limit,
        page: filter.page,
        query,
        sort,
      },
    })
  },
  getAllReportbyStudentId(
    accessToken: string,
    studentId: string,
    filter: ReportLecturerFilterRequest,
  ): Promise<GetAllReportResponse> {
    const url = `/report/report-student/?student_id=${studentId}`

    let query = `${filter.name != '' ? `like(name,"${filter.name}")` : ''}`

    let sort = filter.sort
      .map((val: any) => `${val.name}=${val.type ? '-1' : '1'}`)
      .join(';')
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        size: filter.limit,
        page: filter.page,
        query,
        sort,
      },
    })
  },
  getCurrentReport(accessToken: string): Promise<CurentReportStudentDetail[]> {
    const url = '/report/current-reports'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    })
  },
  createReport(accessToken: string, data: UpdateReportRequest): Promise<ReportDetail> {
    const url = '/report/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  updateReport(
    accessToken: string,
    data: UpdateReportRequest
  ): Promise<ReportDetail> {
    const url = `/report/`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  getReportComments(
    accessToken: string,
    ReportId: string
  ): Promise<ReportCommentDetail[]> {
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    const url = `/report/comment/${ReportId}`
    return axiosClient.get(url, config)
  },
  postReportComment(
    accessToken: string,
    ReportId: string,
    content: string,
    module: string
  ): Promise<any> {
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    const url = `/report/${ReportId}/${module}`
    return axiosClient.post(url, { content, report_id: ReportId }, config)
  },
  createScore(
    accessToken: string,
    isRoleHR: boolean,
    ReportId: string,
    score_business?: number,
    score_lecturer?: number
  ): Promise<any> {
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    const url = `/report/${ReportId}/score`
    // const isRoleHR = useRoleIsHumanResource()
    const body = isRoleHR ? { score_business: score_business, report_id: ReportId } : { score_lecturer, report_id: ReportId }
    // console.log(body)
    return axiosClient.post(url, body, config)
  },
  getReportbyId(
    accessToken: string,
    ReportId: string
  ): Promise<ReportDetail> {
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    const url = `/report/${ReportId}`
    return axiosClient.get(url, config)
  },
}

export default ReportLecturerApi