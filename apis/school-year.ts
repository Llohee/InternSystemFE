import {
  GetAllSchoolYearResponse,
  SchoolYearFilterRequest,
  UpdateSchoolYearRequest,
  UpdateSemesterRequest,
} from '@/models/api/school-year-api'
import axiosClient from './axios-client'
import { getQuery } from './common-api'
import { trymObject } from '@/utils'

const SchoolYearApi = {
  getAllSchoolYear(
    accessToken: string,
    filter: SchoolYearFilterRequest
  ): Promise<GetAllSchoolYearResponse> {
    const url = `/schedule/schoolyear/`
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
  createSchoolYear(
    accessToken: string,
    data: UpdateSchoolYearRequest
  ): Promise<any> {
    const url = 'schedule/schoolyear/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  updateSchoolYear(
    accessToken: string,
    id: string,
    data: UpdateSchoolYearRequest
  ): Promise<any> {
    const url = `/schedule/schoolyear/update/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  deleteSchoolYear(accessToken: string, id: string): Promise<any> {
    const url = `/schedule/schoolyear/delete-schoolyear/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.delete(url, config)
  },
  createSemester(
    accessToken: string,
    id: string,
    data: UpdateSemesterRequest
  ): Promise<any> {
    const url = `/schedule/schoolyear/${id}/semester/`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  updateSemester(
    accessToken: string,
    id: string,
    data: UpdateSemesterRequest
  ): Promise<any> {
    const url = `/schedule/schoolyear/semester/update/${id}/`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  deleteSemester(accessToken: string, id: string): Promise<any> {
    const url = `/schedule/schoolyear/delete-semester/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.delete(url, config)
  },
}

export default SchoolYearApi
