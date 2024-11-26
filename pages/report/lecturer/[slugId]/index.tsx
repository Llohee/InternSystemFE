import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import ReportDetailWrapper from '@/components/report/report-lecturer/detail'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

const ReportDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId, profession, group_id } = router.query
  return (
    <>
      {slugId ? (
        <ReportDetailWrapper
          id={slugId as string}
          profession={profession as string}
          group_id={group_id as string}
        />
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
ReportDetailPage.Layout = MainLayout
ReportDetailPage.Auth = AllUserAuth
ReportDetailPage.title = ''

export default ReportDetailPage
