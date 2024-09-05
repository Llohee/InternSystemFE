import { UniversityAccountFilterRequest, UpdateUserRequest, GetAllUsersResponse, UserGetDetail } from "@/models/api"
import { getQuery } from "./common-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"

const accountUniversityApi = {
  getAllAccountUniversity(
    accessToken: string,
    filter: UniversityAccountFilterRequest,
    isSA?: boolean
  ): Promise<GetAllUsersResponse> {
    const url = 'auth/users/'

    let query = getQuery(filter.query, filter.name, isSA === true ? [
      'fullname',
      'email',
      'university'
    ] : [
      'fullname',
      'email',
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
        role_user: "AU",
        size: filter.limit,
        page: filter.page,
        query,
        sort,
      },
    })
  },
  createUniversity(accessToken: string, data: UpdateUserRequest): Promise<UserGetDetail> {
    const url = 'auth/users'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  }
}

export default accountUniversityApi