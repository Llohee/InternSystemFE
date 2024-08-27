import { GetAllScheduleResponse, ScheduleDetail, ScheduleFilterRequest, UpdateScheduleRequest } from "@/models/api"
import axiosClient from "./axios-client"
import { getQuery } from "./common-api"
import { trymObject } from "@/utils"

const ScheduleApi = {
  getAllSchedule(
    accessToken: string,
    filter: ScheduleFilterRequest,
  ): Promise<GetAllScheduleResponse> {
    const url = '/schedule/get_schedules_lecturer'
    let query = getQuery(filter.query, filter.name, [
      'name',
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
  createSchedule(accessToken: string, data: UpdateScheduleRequest): Promise<ScheduleDetail> {
    const url = '/schedule'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  // getConfigSchedule(accessToken: string): Promise<GetAllScheduleResponse> {
  //   const url = '/tenant/Schedule'
  //   return axiosClient.get(url, {
  //     headers: {
  //       token: accessToken,
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   })
  // }
}

export default ScheduleApi