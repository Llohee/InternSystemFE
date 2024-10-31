import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ReportStudentWrapper from '@/components/report/report-student'
import { NextPageWithAuthLayout } from '@/pages/_app'

const ReportStudentPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <ReportStudentWrapper />
    </>
  )
}
ReportStudentPage.Layout = MainLayout
ReportStudentPage.Auth = AllUserAuth
ReportStudentPage.title = 'Báo cáo'

export default ReportStudentPage
