import { GetAllReportLecturerResponse, ReportLecturerFilterRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"

const ReportLecturerApi = {
  getAllReportLecturer(
    accessToken: string,
    filter: ReportLecturerFilterRequest,
  ): Promise<GetAllReportLecturerResponse> {
    const url = '/auth/users/students'
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
}

export default ReportLecturerApi