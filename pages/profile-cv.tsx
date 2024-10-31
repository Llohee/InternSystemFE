import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ProfielAndCVWrapper from '@/components/profile-cv'
import { NextPageWithAuthLayout } from '@/pages/_app'

const ProfielAndCVPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <ProfielAndCVWrapper />
    </>
  )
}
ProfielAndCVPage.Layout = MainLayout
ProfielAndCVPage.Auth = AllUserAuth
ProfielAndCVPage.title = 'Hồ sơ và CV'

export default ProfielAndCVPage
