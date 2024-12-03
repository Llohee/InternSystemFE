import { trymObject } from '@/utils'
import axiosClient from './axios-client'
import {
  CVDetail,
  CVFilterRequest,
  GetAllCVResponse,
  UpdateCVRequest,
} from '@/models/api/profile-cv-api'
import { getQuery } from './common-api'

const ProfileAndCVApi = {
  createCV(accessToken: string, data: UpdateCVRequest): Promise<CVDetail> {
    const url = '/cv/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  getALLCV(
    accessToken: string,
    filter: CVFilterRequest
  ): Promise<GetAllCVResponse> {
    const url = `/cv/cv_info`
    let query = getQuery(filter.query, filter.name, ['name', 'code'])
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
  getCVById(accessToken: string, id: string): Promise<CVDetail> {
    const url = `/cv/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.get(url, config)
  },
}
export default ProfileAndCVApi
