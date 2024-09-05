import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ReportStudentWrapper from '@/components/report-student'
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
ReportStudentPage.title = 'Quản lý và chấm điểm'

export default ReportStudentPage
