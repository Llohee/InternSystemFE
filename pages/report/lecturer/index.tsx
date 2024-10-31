import { useRoleIsLecturer } from '@/components/auth/hooks'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ReportHUmanresourceWrapper from '@/components/report/report-humanresource'
import ReportLecturerWrapper from '@/components/report/report-lecturer'
import { ReportLecturerKeys } from '@/hooks/query/report-lecturer'
import { NextPageWithAuthLayout, queryClient } from '@/pages/_app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ReportLecturerPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const isRoleLecturer = useRoleIsLecturer()
  const { profession } = router.query
  useEffect(() => {
    if (router) {
      queryClient.removeQueries(ReportLecturerKeys.all)
    }
  }, [router])
  return (
    <>
      {isRoleLecturer ? (
        <ReportLecturerWrapper profession="" />
      ) : (
        <>
          <div className={`${(profession as string) ? 'hidden' : 'block'}`}>
            <ReportHUmanresourceWrapper />
          </div>
          <div className={`${(profession as string) ? 'block' : 'hidden'}`}>
            <ReportLecturerWrapper profession={profession as string} />
          </div>
        </>
      )}
    </>
  )
}
ReportLecturerPage.Layout = MainLayout
ReportLecturerPage.Auth = AllUserAuth
ReportLecturerPage.title = 'Quản lý và chấm điểm'

export default ReportLecturerPage
