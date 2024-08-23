import LecturerAccount from '@/components/account/lecturer'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const LecturerAccountPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <LecturerAccount />
    </>
  )
}
LecturerAccountPage.Layout = MainLayout
LecturerAccountPage.Auth = AllUserAuth
LecturerAccountPage.title = 'Quản lý tài khoản giảng viên'

export default LecturerAccountPage
