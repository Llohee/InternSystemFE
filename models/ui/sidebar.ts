// import { roleUser, PermissionPaths } from '../api'

export interface SideBarItemType {
  link: string
  icon?: React.ReactNode
  iconFilled?: React.ReactNode
  text: string
  subSideBarItem?: SideBarSubItemType[]
  // permissions?: PermissionPaths[]
  // onlyFor?: roleUser[]
}
export interface SideBarSubItemType {
  link: string
  text: string
  // permissions?: PermissionPaths[]
  // onlyFor?: roleUser[]
}
