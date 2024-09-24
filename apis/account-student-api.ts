import { StudentAccountFilterRequest, UpdateUserRequest, GetAllUsersResponse, UserGetDetail } from "@/models/api"
import { getQuery } from "./common-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"
import { StringGradients } from "antd/es/progress/progress"

const accountStudentApi = {
  getAllAccountStudent(
    accessToken: string,
    filter: StudentAccountFilterRequest,
    isSA?: boolean
  ): Promise<GetAllUsersResponse> {
    const url = 'auth/users/'

    let query = getQuery(filter.query, filter.name, [
      'fullname',
      'email',
      'university',
      'business'
    ])
    if (query && filter.university) {
      query = `and(${query},eq(university,"${filter.university}"))`
    } else if (filter.university) {
      query = `eq(university, '${filter.university}')`
    }

    let sort = filter.sort
      .map((val: any) => `${val.name}=${val.type ? '-1' : '1'}`)
      .join(';')

    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        role_user: "ST",
        size: filter.limit,
        page: filter.page,
        query,
        sort,
      },
    })
  },
  createStudent(accessToken: string, data: UpdateUserRequest): Promise<UserGetDetail> {
    const url = 'auth/students'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  getConfigSTWhithoutGroup(accessToken: string): Promise<UserGetDetail[]> {
    const url = '/auth/users/without-group'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }, params: {
        role: 'ST'
      }
    })
  },
  getStudentById(accessToken: string, id: string): Promise<UserGetDetail> {
    const url = `/auth/users/${id}`
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    })
  },
  getDetailStudent(accessToken: string): Promise<UserGetDetail> {
    const url = `/auth/users/detail-student`
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}

export default accountStudentApi