import React, { useState } from 'react'
import CreatescoreModal from './create-score'
import { queryClient } from '@/pages/_app'
import { ReportLecturerKeys } from '@/hooks/query/report-lecturer'
import { useRouter } from 'next/router'

const ReportPopup = (props: {
  report_id: string
  student_id: string
  defaultTabReport: boolean
}) => {
  const [isOpenModalScore, setIsOpenModalSscore] = useState(true)
  const router = useRouter()
  return (
    <>
      <CreatescoreModal
        isOpen={isOpenModalScore}
        closeModal={() => {
          setIsOpenModalSscore(false)
          queryClient.removeQueries(
            ReportLecturerKeys.getReportById(props.report_id)
          )
          router.push(`/report/lecturer/${props.student_id}`)
        }}
        report_id={props.report_id}
        defaultTabReport={props.defaultTabReport}
      />
    </>
  )
}

export default ReportPopup
