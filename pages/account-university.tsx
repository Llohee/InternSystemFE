import UniversityAccount from '@/components/account/university'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const UniversityAccountPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <UniversityAccount type={'university'} />
    </>
  )
}
UniversityAccountPage.Layout = MainLayout
UniversityAccountPage.Auth = AllUserAuth
UniversityAccountPage.title = 'Quản lý tài khoản trường học'

export default UniversityAccountPage
