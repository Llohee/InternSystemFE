import { useState } from 'react'
import ReportLecturerListView from './list-view'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AxiosError } from 'axios'
import { ReportDetailSkeleton } from './skeleton'
import { useGetAllReportbyStudentId } from '@/hooks/query/report-lecturer'
import ReportView from './report-view'
import { useGetScheduleByLecturer } from '@/hooks/query/schedule'
import { useGetStudentById } from '@/hooks/query/account/student'

const ReportLecturerDetailWrapper = (props: {
  id: string
  profession: string
}) => {
  const [showList, setShowList] = useState(true)
  return (
    <>
      <div
        className={`lg:flex w-full ${
          !showList && 'h-[calc(100vh_-_5rem)] '
        } md:h-[calc(100vh_-_3rem)] overflow-auto`}
      >
        <div
          className={`${
            showList ? 'w-[100%] lg:w-[24rem] xl:w-[22rem]' : 'w-[80%] md:w-fit'
          } overflow-hidden bg-grey-3 flex-nowrap max-w-[28rem]`}
        >
          <ReportLecturerListView
            idLecturer={props.id}
            showList={showList}
            setShowList={setShowList}
            {...props}
          />
        </div>
        <div
          className={`${
            showList ? '' : ''
          } grow w-full lg:relative md:!h-[calc(100vh_-_3rem)] overflow-auto`}
        >
          <ReportLecturerViewWrapper
            {...props}
            isOpenSideListReport={showList}
          />
        </div>
      </div>
    </>
  )
}
const ReportLecturerViewWrapper = (props: {
  id: string
  isOpenSideListReport: boolean
}) => {
  const router = useRouter()
  const scheduleLecturer = useGetScheduleByLecturer(props.id)
  const studentByID = useGetStudentById(props.id)
  if (scheduleLecturer.status === 'loading' || studentByID.status === 'loading')
    return <ReportDetailSkeleton />
  if (scheduleLecturer.status === 'error' || studentByID.status === 'error') {
    const errorCode =
      (scheduleLecturer.error as AxiosError).response?.status ||
      (studentByID.error as AxiosError).response?.status
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
      <ReportView
        studentById={studentByID.data}
        scheduleLecturer={scheduleLecturer.data}
        {...props}
      />
    </>
  )
}
export default ReportLecturerDetailWrapper
