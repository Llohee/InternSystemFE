import { ConfigDetail, GetAllPostResponse, PostDetail, PostFilterRequest, UpdateApplyCVRequest, UpdatePostRequest } from "@/models/api"
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
        salary_min: filter.salary_min,
        salary_max: filter.salary_max,
        profession: filter.profession,
        page: filter.page,
        ...query,
        sort,
      },
    })
  },
  getConfigPostLocal(accessToken: string): Promise<ConfigDetail[]> {
    const url = '/post/local/'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getConfigPostProfession(accessToken: string): Promise<ConfigDetail[]> {
    const url = '/post/profession/'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getAllPostBusiness(
    accessToken: string,
    filter: PostFilterRequest,
    tenant: string
  ): Promise<GetAllPostResponse> {
    const url = '/post/'

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
        tenant: tenant,
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
  deletePost(accessToken: string, id: string): Promise<any> {
    const url = `/post/delete/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, config)
  },
  applyCV(accessToken: string, data: UpdateApplyCVRequest): Promise<any> {
    const url = '/post/applycv'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  HRapproveCV(accessToken: string, data: UpdateApplyCVRequest): Promise<any> {
    const url = '/post/hrapply'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  AUapproveCV(accessToken: string, data: UpdateApplyCVRequest): Promise<any> {
    const url = '/post/auapply'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  }
}
export default PostApi