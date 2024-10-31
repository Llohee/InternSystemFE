import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import ReportLecturerDetailWrapper from '@/components/report/report-lecturer/detail'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

const ReportLecturerDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId } = router.query
  return (
    <>
      {slugId ? (
        <ReportLecturerDetailWrapper id={slugId as string} profession="" />
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
ReportLecturerDetailPage.Layout = MainLayout
ReportLecturerDetailPage.Auth = AllUserAuth
ReportLecturerDetailPage.title = ''

export default ReportLecturerDetailPage
