import { ConfigDetail, GetAllPostResponse, PostDetail, PostFilterRequest, UpdatePostRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const PostApi = {
  getAllPost(
    accessToken: string,
    filter: PostFilterRequest,
  ): Promise<GetAllPostResponse> {
    const url = '/post/'
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
        local: filter.local,
        profession: filter.profession,
        page: filter.page,
        ...query,
        sort,
      },
    })
  },
  getConfigPostLocal(accessToken: string): Promise<ConfigDetail[]> {
    const url = '/local/'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getConfigPostProfession(accessToken: string): Promise<ConfigDetail[]> {
    const url = '/profession/'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getAllPostBusiness(
    accessToken: string,
    filter: PostFilterRequest
  ): Promise<GetAllPostResponse> {
    const url = '/post/business'

    let query =
      filter.profession != ''
        ? `or(like(name,"${filter.profession}"),))`
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
  getDetailPost(
    accessToken: string,
    id: string
  ): Promise<PostDetail> {
    const url = `/post/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.get(url, config)
  },
  createPost(accessToken: string, data: UpdatePostRequest): Promise<PostDetail> {
    const url = '/post/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  updatePost(
    accessToken: string,
    data: UpdatePostRequest,
    id: string
  ): Promise<PostDetail> {
    const url = `/post/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
}
export default PostApi