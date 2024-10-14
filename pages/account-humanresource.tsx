import HumanresourceAccount from '@/components/account/humanresource'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const HumanresourceAccountPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <HumanresourceAccount type={'business'} />
    </>
  )
}
HumanresourceAccountPage.Layout = MainLayout
HumanresourceAccountPage.Auth = AllUserAuth
HumanresourceAccountPage.title = 'Quản lý tài khoản doanh nghiệp'

export default HumanresourceAccountPage
