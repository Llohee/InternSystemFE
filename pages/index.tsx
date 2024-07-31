import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const UniversityPage: NextPageWithAuthLayout = () => {
  return <></>
}
UniversityPage.Layout = MainLayout
UniversityPage.Auth = AllUserAuth
UniversityPage.title = 'Trang chủ'

export default UniversityPage
