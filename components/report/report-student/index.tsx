import { useGetDetailStudent } from '@/hooks/query/account/student'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ReportDetailSkeleton } from '../report-lecturer/detail/skeleton'
import ReportStudentView from './detail'
import { useGetScheduleByStudent } from '@/hooks/query/schedule'
import { useGetCurrentReport } from '@/hooks/query/report-lecturer'

const ReportStudentWrapper = () => {
  const router = useRouter()
  const GetDetailStudent = useGetDetailStudent()
  const GetScheduleByStudent = useGetScheduleByStudent()
  if (
    GetDetailStudent.status === 'loading' ||
    GetScheduleByStudent.status === 'loading'
  )
    return <ReportDetailSkeleton />
  if (
    GetDetailStudent.status === 'error' ||
    GetScheduleByStudent.status === 'error'
  ) {
    const errorCode = (
      (GetDetailStudent.error as AxiosError) ||
      (GetScheduleByStudent.error as AxiosError)
    ).response?.status
    switch (errorCode) {
      case 401:
        router.replace('/401', router.asPath)
        break
      case 404:
        router.replace('/404', router.asPath)
        break
      default:
        router.replace('/error', router.asPath)
        return <></>
    }
    return <></>
  }
  return (
    <>
      <ReportStudentView
        detailStudent={GetDetailStudent.data}
        scheduleByStudent={GetScheduleByStudent.data}
      />
    </>
  )
}

export default ReportStudentWrapper
