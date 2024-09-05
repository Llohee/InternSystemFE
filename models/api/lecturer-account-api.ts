import { TypeQuery, TypeSort } from "./common"

export interface LecturerAccountFilterRequest {
  name: string
  limit: number
  university?: string
  // bisiness?: string
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
