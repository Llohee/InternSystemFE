import React from 'react'
import {
  useRoleIsStudent,
  useRoleIsSuperAdmin,
} from './hooks'
import { useGetUserDetail } from '@/hooks/query/auth'

// Show when role it is ST
export function StudentWrapper({ children }: { children: React.ReactNode }) {
  const roleIsStudent = useRoleIsStudent()

  if (roleIsStudent) return <>{children}</>

  return <></>
}

// Show when role it is not ST but is still authenticated
export function NotStudentWrapper({ children }: { children: React.ReactNode }) {
  const getUserDetail = useGetUserDetail()

  if (getUserDetail.data.role && getUserDetail.data.role != 'ST')
    return <>{children}</>

  return <></>
}

// Show when role it is SA
export function SystemAdminWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const roleIsSuperAdmin = useRoleIsSuperAdmin()

  if (roleIsSuperAdmin) return <>{children}</>

  return <></>
}

// Show when role it is not SA
export function NotSystemAdminWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const roleIsSuperAdmin = !useRoleIsSuperAdmin()

  if (roleIsSuperAdmin) return <>{children}</>

  return <></>
}

