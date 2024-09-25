export interface GetAllNotification {
  page: number
  total: number
  total_page: number
  data: SysNotification[]
}

export interface SysNotification {
  notify_id: string
  content: string
  created_time: string
  meta_data: {
    post_id: string
    Lecturer: string
    type: 'REPORT' | 'REQUEST'
    student_id: string
    action: 'CREATE' | 'COMMENT' | 'UPDATE' | 'REQUEST'
  }
  is_redirect: boolean
  is_readed: boolean
  is_expired: string
}