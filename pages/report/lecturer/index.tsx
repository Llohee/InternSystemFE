import { useRoleIsLecturer } from '@/components/auth/hooks'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ReportHumanresourceWrapper from '@/components/report/report-home/humanresource'
import ReportLecturerWrapper from '@/components/report/report-home/lecturer'
import ReportWrapper from '@/components/report/report-lecturer'
import { ReportLecturerKeys } from '@/hooks/query/report-lecturer'
import { NextPageWithAuthLayout, queryClient } from '@/pages/_app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ReportLecturerPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const isRoleLecturer = useRoleIsLecturer()
  const { profession, group_id } = router.query
  // useEffect(() => {
  //   if (router) {
  //     queryClient.removeQueries(ReportLecturerKeys.all)
  //   }
  // }, [router])
  return (
    <>
      {isRoleLecturer ? (
        <>{!group_id && <ReportLecturerWrapper />}</>
      ) : (
        <>{!profession && <ReportHumanresourceWrapper />}</>
      )}
      {(profession || group_id) && (
        <ReportWrapper
          profession={profession as string}
          group_id={group_id as string}
        />
      )}
    </>
  )
}
ReportLecturerPage.Layout = MainLayout
ReportLecturerPage.Auth = AllUserAuth
ReportLecturerPage.title = 'Quản lý và chấm điểm'

export default ReportLecturerPage
