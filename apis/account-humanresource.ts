import { GetAllUsersResponse, HumanresourceAccountFilterRequest, UpdateUserRequest, UserGetDetail } from "@/models/api"
import { getQuery } from "./common-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"

const accountHumanresource = {
  getAllAccountHumanresource(
    accessToken: string,
    filter: HumanresourceAccountFilterRequest,
    isSA?: boolean
  ): Promise<GetAllUsersResponse> {
    const url = 'auth/users/?role_user=HR'

    let query = getQuery(filter.query, filter.name, isSA === true ? [
      'fullname',
      'email',
      'humanresource'
    ] : [
      'fullname',
      'email',
    ])
    if (query && filter.humanresource) {
      query = `and(${query},eq(humanresource,"${filter.humanresource}"))`
    } else if (filter.humanresource) {
      query = `eq(humanresource, '${filter.humanresource}')`
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
        size: filter.limit,
        page: filter.page,
        query,
        sort,
        
      },
    })
  },
  createHumanresource(accessToken: string, data: UpdateUserRequest): Promise<UserGetDetail> {
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

export default accountHumanresource