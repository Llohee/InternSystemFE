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
export interface ConfigDetail {
  id: string
  name: string
}
export type roleUser = 'SA' | 'AU' | 'LT' | 'ST' | 'HR' | ''
export interface AttachmentDetail {
  name: string
  object: string
  dowload_url: string
}
export const ColorStatus = [
  { name: 'open', value: '#5cc0bf' },
  { name: 'inprogress', value: '#1da1f2' },
  { name: 'onhold', value: '#e57b31' },
  { name: 'cancelled', value: '#7b42d1' },
  { name: 'resolved', value: '#6bc950' },
  { name: 'reopen', value: '#eb3dae' },
  { name: 'closed', value: '#7c828d' },

  { name: 'chưa xử lý', value: '#5cc0bf' },// xanh lá đậm
  { name: 'đang chấm', value: '#1da1f2' },//xanh dương
  { name: 'chờ bổ sung thông tin', value: '#e57b31' },//cam
  { name: 'hủy xử lý', value: '#7b42d1' },//tím
  { name: 'đã xử lý', value: '#6bc950' },// xanh lá
  { name: 'xử lý lại', value: '#eb3dae' },// hồng
  { name: 'xử lý xong', value: '#7c828d' },// xám
  { name: 'quá hạn', value: '#FF4500' },// cam đậm
]