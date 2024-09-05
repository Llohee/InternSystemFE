import { TypeQuery, TypeSort } from "./common"

export interface UniversityAccountFilterRequest {
  name: string
  limit: number
  university?: string
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
