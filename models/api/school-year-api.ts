import { TypeQuery, TypeSort } from "./common"

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
  name?: { start: Date, end: Date }
  description: string
  status: SemesterStatus
  created_time: string
  is_active: boolean
  semester: SemesterDetail[]
}
export interface SemesterDetail {
  semester_name?: string
  description: string
  status: SemesterStatus
  time?: {
    start: Date,
    end: Date
  }
}
export interface UpdateSchoolYearRequest {
  name: { start: Date, end: Date }
  description: string
  // status: SemesterStatus
  start_time: Date
  end_time: Date
  is_active: boolean
}
export interface UpdateSemesterRequest {
  name: string
  description: string
  // status: SemesterStatus
  time: { start: Date, end: Date }
  is_active: boolean
}