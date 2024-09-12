import { TypeQuery, TypeSort } from "./common"

export interface UniversityFilterRequest {
  name: string
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
  image_url: any
}
export interface UpdateUniversityRequest {
  code: string
  name?: string
  image_url: any
  is_active?: boolean
}