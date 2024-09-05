import { GetAllUniversityResponse, UniversityDetail, UniversityFilterRequest, UpdateUniversityRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const UniversityApi = {
  getAllUniversity(
    accessToken: string,
    filter: UniversityFilterRequest,
  ): Promise<GetAllUniversityResponse> {
    const url = '/tenant/university'
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
  createUniversity(accessToken: string, data: UpdateUniversityRequest): Promise<UniversityDetail> {
    const url = '/tenant/university'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  getConfigUniversity(accessToken: string): Promise<GetAllUniversityResponse> {
    const url = '/tenant/university'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export default UniversityApi