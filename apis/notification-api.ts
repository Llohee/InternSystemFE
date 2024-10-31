import { GetAllNotification } from "@/models/api/notification-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"
import { RequestLink } from "@/models/api"

const notificationApi = {
  getNotification(accessToken: string, page: number,): Promise<GetAllNotification> {
    const url = `/notify/`
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        size: 10,
        page
      },
    })
  },
  readNotification(
    accessToken: string,
    notify_ids: string[],
    is_readed: boolean
  ): Promise<{
    notify_ids: string[],
    is_readed: boolean
  }> {
    const url = `/notify/read`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(
      url,
      trymObject({
        notify_ids: notify_ids,
        is_readed: is_readed,
      }),
      config
    )
  },
  requestLink(
    accessToken: string,
    data: RequestLink
  ): Promise<any> {
    const url = `/auth/users/notify/university-link`
    // const url = `/auth/users/notify/bussiness-link`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}

export default notificationApi