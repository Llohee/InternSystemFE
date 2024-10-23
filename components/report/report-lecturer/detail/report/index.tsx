import PageError from "@/components/page-error/error"
import { SearchIcon } from "@/components/ui/icon"
import { DebouncedInput } from "@/components/ui/input/debouced-input"
import { TableSkeleton } from "@/components/ui/skeleton"
import { useGetAllReportbyStudentId } from "@/hooks/query/report-lecturer"
import { useFilterForReportStore } from "@/hooks/zustand/filter-for-report-lecturer"
import produce from "immer"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReportTable from "./table"
import { ReportDetail } from "@/models/api"

const ReportWrapper = (props: {
  studentId: string
}) => {
  const getAllReport = useGetAllReportbyStudentId(props.studentId)
  const filterReport = useFilterForReportStore()
  const router = useRouter()
  const [ReportChoose, setReportChoose] =
    useState<ReportDetail[]>()
  useEffect(() => {
    filterReport.reset()
  }, [router])
  return (
    <div className="flex flex-col gap-3 relative">
      <div className="flex items-center mt-5">
      <div className="flex gap-5 grow items-center mr-2">
          <div className="flex flex-col">
            <DebouncedInput
              placeholder={'Tìm kiếm báo cáo'}
              value={filterReport.filter.name}
              className="lg:w-96 "
              onChange={(value) => {
                filterReport.update(
                  produce(filterReport.filter, (draftState) => {
                    draftState.name = value.toString()
                    draftState.page = 0
                  })
                )
              }}
              icon={<SearchIcon />}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {getAllReport.status === 'error' && <PageError />}
        {getAllReport.status == 'loading' && <TableSkeleton />}
        {getAllReport.status == 'success' && (
          <ReportTable
            // ref={tableRef}
            getAllReportData={getAllReport.data}
            setReportChoose={setReportChoose}
            // isPreviousData={getAllTicket.isPreviousData}
          />
        )}
      </div>
    </div>
  )
}

export default ReportWrapper