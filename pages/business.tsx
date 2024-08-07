import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import BusinessWrapper from '@/components/business'
import { NextPageWithAuthLayout } from '@/pages/_app'

const BusinessPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <BusinessWrapper />
    </>
  )
}
BusinessPage.Layout = MainLayout
BusinessPage.Auth = AllUserAuth
BusinessPage.title = 'Doanh nghiệp'

export default BusinessPage
