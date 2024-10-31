export interface ActivityDetail {
  actor: string
  action: 'CREATE' | 'UPDATE' | 'COMMENT'
  time: string
}