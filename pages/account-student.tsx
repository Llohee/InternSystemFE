import StudentAccount from '@/components/account/student'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const StudentAccountPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <StudentAccount />
    </>
  )
}
StudentAccountPage.Layout = MainLayout
StudentAccountPage.Auth = AllUserAuth
StudentAccountPage.title = 'Quản lý tài khoản sinh viên'

export default StudentAccountPage
