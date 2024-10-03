import { GetAllBusinessResponse, BusinessDetail, BusinessFilterRequest, UpdateBusinessRequest, UniversityFilterRequest, GetAllUniversityResponse, RequestLinkUniversity, AcceptLinkUniversity } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const BusinessApi = {
  getAllBusiness(
    accessToken: string,
    filter: BusinessFilterRequest,
  ): Promise<GetAllBusinessResponse> {
    const url = '/tenant/business'
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

  createBusiness(accessToken: string, data: UpdateBusinessRequest): Promise<BusinessDetail> {
    const url = '/tenant/business'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },

  getAllUniversityLink(
    accessToken: string,
    filter: UniversityFilterRequest,
    type: string
  ): Promise<GetAllUniversityResponse> {
    const url = `/tenant/business/filter/link-university?type=${type}`
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

  requestLinkUniversity(
    accessToken: string,
    data: RequestLinkUniversity
  ): Promise<any> {
    const url = `/auth/users/notify/university-link`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  acceptLinkBusiness(
    accessToken: string,
    data: AcceptLinkUniversity
  ): Promise<any> {
    const url = `/tenant/business/linkuniversity`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}

export default BusinessApi