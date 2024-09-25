import { ActivityDetail } from "./activities-api"

export interface PostDetail {
  id: string
  position: {
    id: string
    name: string
  }
  local: {
    id: string
    name: string
  }
  description: string
  created_time: string
  expired_time: number
  slot: number
  activities: ActivityDetail[]
} 