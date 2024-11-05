import { GetAllScheduleResponse, ScheduleDetail, ScheduleFilterRequest, UpdateActiveSchedule, UpdateScheduleRequest } from "@/models/api"
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
    const url = '/schedule/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
  getDetailSchedule(
    accessToken: string,
    id: string
  ): Promise<ScheduleDetail> {
    const url = `/schedule/${id}`

    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getDetailScheduleByLecturer(accessToken: string, student_id: string): Promise<ScheduleDetail> {
    const url = `/schedule/schedule_lecturer?student_id=${student_id}`
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    })
  },
  getDetailScheduleByStudent(accessToken: string): Promise<ScheduleDetail> {
    const url = '/schedule/schedule_student'
    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      }
    })
  },

  updateSchedule(
    accessToken: string,
    data: UpdateScheduleRequest,
    id: string
  ): Promise<ScheduleDetail> {
    const url = `/schedule/${id}`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.put(url, trymObject(data), config)
  },
  updateActiveSchedule(
    accessToken: string,
    data: UpdateActiveSchedule,
  ): Promise<any> {
    const url = `/schedule/active-schedule`
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}

export default ScheduleApi