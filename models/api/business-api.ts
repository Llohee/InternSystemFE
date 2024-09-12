import { TypeQuery, TypeSort } from "./common"

export interface BusinessFilterRequest {
  name: string
  limit: number
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
export interface GetAllBusinessResponse {
  page: number
  total: number
  total_page: number
  data: BusinessDetail[]
}
export interface BusinessDetail {
  id: string
  name: string
  code: string
  created_time: string
  is_active: boolean
  email: string
  location: string
  website: string
  image_url: any
}
export interface UpdateBusinessRequest {
  code: string
  name?: string
  website: string
  location?: string
  is_active?: boolean
  image_url: any
}