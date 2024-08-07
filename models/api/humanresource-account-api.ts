import { TypeQuery, TypeSort } from "./common"

export interface HumanresourceAccountFilterRequest {
  name: string
  limit: number
  humanresource?: string
  page: number
  query: TypeQuery[]
  sort: TypeSort[]
}
