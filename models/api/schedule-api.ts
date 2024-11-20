import { TypeQuery, TypeSort } from "./common"

export interface ScheduleFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllScheduleResponse {
  page: number
  total: number
  total_page: number
  data: ScheduleDetail[]
}
export interface ScheduleDetail {
  id: string
  name: string
  lecturer: {
    id: string
    fullname: string
    email: string
  }
  start_day: string
  finish_day: string
  milestones: MilestonesDetail[]
  university: string
  created_by: {
    id: string
    fullname: string
    email: string
  }
  created_time: string
  is_active: boolean
  type: "DEFAULT" | "CUSTOM"
}
export interface MilestonesDetail {
  id: string
  description: string
  time: string
}
export interface UpdateScheduleRequest {
  id: string
  name: string
  start_day: string
  finish_day: string
  milestones: {
    description: string
    time: string
  }[]
  milestones_demo?: { [key: string]: string }
  is_active: boolean
}
export interface UpdateActiveSchedule {
  id: string
}