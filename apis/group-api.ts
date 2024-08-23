import { GetAllGroupResponse, GroupDetail, GroupFilterRequest, UpdateGroupRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const GroupApi = {
  getAllGroup(
    accessToken: string,
    filter: GroupFilterRequest,
  ): Promise<GetAllGroupResponse> {
    const url = '/auth/groups'
    let query = getQuery(filter.query, filter.name, [
      'name'
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
  createGroup(accessToken: string, data: UpdateGroupRequest): Promise<GroupDetail> {
    const url = '/auth/groups'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}

export default GroupApi