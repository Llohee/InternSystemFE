import { GetAllNotification } from "@/models/api/notification-api"
import axiosClient from "./axios-client"
import { trymObject } from "@/utils"

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
}

export default notificationApi