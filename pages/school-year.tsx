import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import SchoolYearWrapper from '@/components/school-year'
import { NextPageWithAuthLayout } from '@/pages/_app'

const SchoolYearPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <SchoolYearWrapper />
    </>
  )
}
SchoolYearPage.Layout = MainLayout
SchoolYearPage.Auth = AllUserAuth
SchoolYearPage.title = 'Năm học - Kì học'

export default SchoolYearPage
