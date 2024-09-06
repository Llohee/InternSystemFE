import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import ReportStudentDetailWrapper from '@/components/report-student/detail'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

const ReportStudentDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId } = router.query
  return (
    <>
      {slugId ? (
        <ReportStudentDetailWrapper id={slugId as string} />
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
ReportStudentDetailPage.Layout = MainLayout
ReportStudentDetailPage.Auth = AllUserAuth
ReportStudentDetailPage.title = ''

export default ReportStudentDetailPage
