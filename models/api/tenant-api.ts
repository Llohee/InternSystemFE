import { TypeQuery, TypeSort } from "./common"

export interface TenantFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllTenantResponse {
  page: number
  total: number
  total_page: number
  data: TenantDetail[]
}
export interface TenantDetail {
  id: string
  name: string
  code: string
  created_time: string
  is_active: boolean
  email: string
  location: string
  website: string
  image_url: any[]
}
export interface UpdateTenantRequest {
  code: string
  name?: string
  website: string
  location?: string
  is_active?: boolean
  image_url: any
}
export interface RequestLink {
  university_id?: string
  bussiness_id?: string
}

export interface AcceptLink {
  university_id?: string[]
  bussiness_id?: string[]
}