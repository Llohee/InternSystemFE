import { AllUserAuth } from '@/components/auth/page-auth'
import DashboardWrapper from '@/components/dashboard'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const DashboardPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <DashboardWrapper />
    </>
  )
}
DashboardPage.Layout = MainLayout
DashboardPage.Auth = AllUserAuth
DashboardPage.title = 'Trang chủ'

export default DashboardPage
