import { TypeQuery, TypeSort } from "./common"

export interface UniversityFilterRequest {
  name: string
  code: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllUniversityResponse {
  page: number
  total: number
  total_page: number
  data: UniversityDetail[]
}
export interface UniversityDetail {
  id: string
  name: string
  code: string
  created_time: string
  is_active: boolean
  // email: string
  // location: string
  // website: string
}
export interface UpdateUniversityRequest {
  code: string
  name?: string
  // website: string
  // location?: string
  is_active?: boolean
}