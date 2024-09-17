import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ReportLecturerWrapper from '@/components/report-lecturer'
import { NextPageWithAuthLayout } from '@/pages/_app'

const ReportLecturerPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <ReportLecturerWrapper />
    </>
  )
}
ReportLecturerPage.Layout = MainLayout
ReportLecturerPage.Auth = AllUserAuth
ReportLecturerPage.title = 'Quản lý và chấm điểm'

export default ReportLecturerPage
