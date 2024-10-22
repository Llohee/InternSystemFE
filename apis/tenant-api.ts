import { AcceptLink, GetAllTenantResponse, RequestLink, TenantDetail, TenantFilterRequest, UpdateTenantRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const TenantApi = {
  getAllTenant(
    accessToken: string,
    filter: TenantFilterRequest,
    type: string
  ): Promise<GetAllTenantResponse> {
    const url = `/tenant/${type}`
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
  createTenant(accessToken: string, data: UpdateTenantRequest, type: string): Promise<TenantDetail> {
    const url = `/tenant/${type}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  updateTenant(
    accessToken: string,
    id: string,
    data: UpdateTenantRequest,
    type: string
  ): Promise<any> {
    const url = `/tenant/${type}/update/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  deleteTenant(accessToken: string, id: string, type: string): Promise<any> {
    const url = `/tenant/${type}/delete/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.delete(url, config)
  },
  getTenantById(accessToken: string, id: string, type: string): Promise<TenantDetail> {
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    const url = `/tenant/${type}/${id}`
    return axiosClient.get(url, config)
  },
  getConfigTenant(accessToken: string, type: string): Promise<GetAllTenantResponse> {
    const url = `/tenant/${type}`
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getAllTenantLink(
    accessToken: string,
    filter: TenantFilterRequest,
    type: string
  ): Promise<GetAllTenantResponse> {
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
  requestLink(
    accessToken: string,
    data: RequestLink
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
  acceptLink(
    accessToken: string,
    data: AcceptLink
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

export default TenantApi