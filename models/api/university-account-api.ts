import { roleUser, TypeQuery, TypeSort } from "./common"

export interface UniversityAccountGetDetail {
  id: string
  fullname: string
  email: string
  phone: string
  is_active: boolean
  role: roleUser[],
  created_time: string
}
export interface UniversityAccountFilterRequest {
  name: string
  limit: number
  university?: string
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllUniversityAccountResponse {
  page: number
  total: number
  total_page: number
  data: UniversityAccountGetDetail[]
}