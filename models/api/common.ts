export interface ErrorResponse {
  code: string
  description: string
}
export interface TypeSort {
  name: string
  type: boolean
}
export interface TypeQuery {
  name: string
  value: string | boolean | string[] | undefined
  type: 'like' | 'eq' | 'eqID'
}
export type roleUser = 'SA' | 'AU' | 'LT' | 'ST' | 'HR' | ''
export interface AttachmentDetail {
  name: string
  object: string
  dowload_url: string
}