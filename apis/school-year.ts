import { GetAllSchoolYearResponse, SchoolYearFilterRequest, UpdateSchoolYearRequest, UpdateSemesterRequest } from "@/models/api/school-year-api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const SchoolYearApi = {
  getAllSchoolYear(
    accessToken: string,
    filter: SchoolYearFilterRequest,
  ): Promise<GetAllSchoolYearResponse> {
    const url = `/school-year/`
    let query =
      filter.name != ''
        ? `or(like(name,"${filter.name}"),like(semester.name,"${filter.name}"))`
        : ''

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
  createSchoolYear(accessToken: string, data: UpdateSchoolYearRequest): Promise<any> {
    const url = '/school-year/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  createSemester(
    accessToken: string,
    id: string,
    data: UpdateSemesterRequest
  ): Promise<any> {
    const url = `/school-year/${id}/semester/`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}

export default SchoolYearApi