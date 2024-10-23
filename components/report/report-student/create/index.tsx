import PageError from '@/components/page-error/error'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetCurrentReport } from '@/hooks/query/report-lecturer'
import ReportStudentListView from './list-view'
import { ScheduleDetail } from '@/models/api'

const ReportStudentWrapper = (props: {scheduleByStudent: ScheduleDetail}) => {
  const GetCurrentReport = useGetCurrentReport()
  return (
    <div className="flex flex-col gap-3 relative">
      <div className="flex flex-col w-full">
        {GetCurrentReport.status === 'error' && <PageError />}
        {GetCurrentReport.status == 'loading' && <TableSkeleton />}
        {GetCurrentReport.status == 'success' && (
          <ReportStudentListView currentReport={GetCurrentReport.data} scheduleByStudent={props.scheduleByStudent}/>
        )}
      </div>
    </div>
  )
}

export default ReportStudentWrapper
