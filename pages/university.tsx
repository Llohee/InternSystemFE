import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import UniversityWrapper from '@/components/university'
import { NextPageWithAuthLayout } from '@/pages/_app'

const UniversityPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <UniversityWrapper />
    </>
  )
}
UniversityPage.Layout = MainLayout
UniversityPage.Auth = AllUserAuth
UniversityPage.title = 'Trường học'

export default UniversityPage
