import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Pill } from '@/components/ui/pill'
import { ScheduleDetail, UserGetDetail } from '@/models/api'
import dayjs from 'dayjs'

const TileStudentView = (props: {
  detailStudent: UserGetDetail
  scheduleByStudent: ScheduleDetail
}) => {
  return (
    <div className="flex justify-center w-full relative">
      <div className="w-full relative">
        <div className="w-full grid grid-cols-2 p-5 justify-between items-start bg-grey-1 gap-2 rounded-lg my-2">
          <div className="flex justify-between gap-3 w-full col-span-2">
            <div className="grow">
              <div className="flex gap-2 items-center text-heading-5 text-typography-title">
                <div className="break-all">
                  <Pill intent="primary" size={'large'}>
                    <p className="text-heading-8">
                      {props.detailStudent.id_number ?? ''}
                    </p>
                  </Pill>
                </div>
                <div className="break-all">{props.detailStudent.fullname}</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="">Ngày bắt đầu</div>
            <div className="text-typography-label text-heading-8 flex flex-wrap gap-1 items-center whitespace-pre-wrap">
              {dayjs(props.scheduleByStudent.start_day).format(DATE_FORMAT_VIEW)}
            </div>
          </div>
          <div className="col">
            <div className="">Ngày kết thúc</div>
            <div className="text-typography-label text-heading-8 flex flex-wrap gap-1 items-center whitespace-pre-wrap">
              {dayjs(props.scheduleByStudent.finish_day).format(
                DATE_FORMAT_VIEW
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TileStudentView
