import { useGetUserDetail } from '@/hooks/query/auth'

export const useRoleIsSuperAdmin = () => {
  const getUserDetail = useGetUserDetail()
  return getUserDetail.data.role === 'SA'
}

export const useRoleIsAdminUniversity = () => {
  const getUserDetail = useGetUserDetail()
  return getUserDetail.data.role === 'AU'
}

export const useRoleIsLecturer = () => {
  const getUserDetail = useGetUserDetail()
  return getUserDetail.data.role === 'LT'
}

export const useRoleIsStudent = () => {
  const getUserDetail = useGetUserDetail()
  return getUserDetail.data.role === 'ST'
}

export const useRoleIsHumanResource = () => {
  const getUserDetail = useGetUserDetail()
  return getUserDetail.data.role === 'HR'
}

