import { TypeQuery, TypeSort } from './common'

export interface SchoolYearFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export type SemesterStatus = 'PAST' | 'ONGOING' | 'UPCOMING'

export interface GetAllSchoolYearResponse {
  page: number
  total: number
  total_page: number
  data: SchoolYearDetail[]
}
export interface SchoolYearDetail {
  id: string
  name: any
  description: string
  start_day: Date
  end_day: Date
  status: SemesterStatus
  created_time?: string
  is_active?: boolean
  semester?: SemesterDetail[]
}
export interface SemesterDetail {
  id: string
  name: any
  description: string
  status: SemesterStatus
  start_day: Date
  end_day: Date
}
export interface UpdateSchoolYearRequest {
  name: { start: Date; end: Date }
  description: string
  start_day: Date
  end_day: Date
  is_active: boolean
}
export interface UpdateSemesterRequest {
  name: string
  description: string
  // status: SemesterStatus
  start_day: Date
  end_day: Date
  is_active: boolean
}
