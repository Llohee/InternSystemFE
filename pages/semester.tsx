import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import SemesterWrapper from '@/components/semester'
import { NextPageWithAuthLayout } from '@/pages/_app'

const SemesterPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <SemesterWrapper />
    </>
  )
}
SemesterPage.Layout = MainLayout
SemesterPage.Auth = AllUserAuth
SemesterPage.title = 'Năm học - kì học'

export default SemesterPage
