import { CustomPostDetail, CustomPostFilterRequest, GetAllCustomPostResponse, UpdateCustomPostRequest } from "@/models/api/custom-post-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"

const CustomPostApi = {
  getAllPost(
    accessToken: string,
    filter: CustomPostFilterRequest,
  ): Promise<GetAllCustomPostResponse> {
    const url = '/custom-post/'
    let query = <any>{}
    filter.query.forEach(item => {
      query[item.name] = item.value
    })
    let sort = filter.sort
      .map((val: any) => `${val.local}=${val.type ? '-1' : '1'}`)
      .join(';')
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        size: filter.limit,
        page: filter.page,
        ...query,
        sort,
      },
    })
  },
  createCustomPost(accessToken: string, data: UpdateCustomPostRequest): Promise<CustomPostDetail> {
    const url = '/custom-post/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}
export default CustomPostApi