import {
  CurentReportStudentDetail,
  ScheduleDetail,
  UserGetDetail,
} from '@/models/api'
import DetailStudentSideBar from './detail-student-sidebar'
import TileStudentView from './title-student-view'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { useState } from 'react'
import ReportStudentWrapper from '../create'

const ReportStudentView = (props: {
  detailStudent: UserGetDetail
  scheduleByStudent: ScheduleDetail
}) => {
  const [selectedTab, onChangeSelectedTab] = useState(0)

  return (
    <div className="">
      <div className="w-full relative">
        <div className="w-full px-5">
          <div
            className={`block md:hidden`}
          >
            <TileStudentView {...props} />
          </div>
          <div
            className={`flex flex-col lg:grid lg:grid-cols-12 gap-5 divide-x-2 divide-solid divide-grey-1`}
          >
            <div
              className={`col lg:col-span-8 flex flex-col items-start lg:order-1`}
            >
              <div className={`hidden w-full top-0 bg-white z-20 md:block`}>
                <TileStudentView {...props} />
              </div>
              <div className="flex flex-col w-full">
                <div className="grow w-full overflow-auto">
                  <ListTab
                    selectedIndex={selectedTab}
                    onChange={onChangeSelectedTab}
                    titles={[
                      {
                        title: 'Báo cáo',
                        node: <ReportStudentWrapper scheduleByStudent={props.scheduleByStudent}/>,
                      },
                      {
                        title: 'Lịch sử',
                        node: <></>,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="col lg:row-span-full flex flex-col gap-5 relative order-1 col-span-full lg:order-2 lg:col-start-9 lg:col-span-4">
              <DetailStudentSideBar detailStudent={props.detailStudent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportStudentView
