import { roleUser } from "../api/common"

export interface SideBarItemType {
  link: string
  icon?: React.ReactNode
  iconFilled?: React.ReactNode
  text: string
  subSideBarItem?: SideBarSubItemType[]
  onlyFor: roleUser[]
}
export interface SideBarSubItemType {
  link: string
  text: string
  onlyFor: roleUser[]
}
