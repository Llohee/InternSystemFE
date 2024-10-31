import { DATE_TIME_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import {
  CurentReportStudentDetail,
  ReportDetail,
  ScheduleDetail,
} from '@/models/api'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Createreport from '../modal/create-report'
import Updatereport from '../modal/update-report'

const ReportStudentListView = (props: {
  currentReport: CurentReportStudentDetail[]
  scheduleByStudent: ScheduleDetail
}) => {
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [currentReport, setCurrentReport] = useState<ReportDetail | undefined>(
    undefined
  )
  const [currentMilestone, setCurrentMilestone] = useState<string>()
  useEffect(() => {
    if (currentReport) {
      setIsShowModalUpdate(true)
    }
  }, [currentReport])
  return (
    <>
      <div className="w-full max-h-table-task-ticket">
        <div className="mx-auto w-full rounded-xl bg-white p-2 px-5 !max-h-full overflow-x-auto">
          {props.currentReport.map((val, index) => (
            <>
              <Disclosure as={'div'} className={'mt-3 '} key={index}>
                {({ open, close }) => (
                  <>
                    <DisclosureButton
                      className={`shadow-sm flex w-full justify-between rounded-lg bg-grey-1  border border-grey-5 hover:bg-grey-3 px-4 py-3 text-left focus-visible:ring-opacity-75 ${
                        open === true && '!bg-primary-background'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="items-baseline">
                          <div className="col col-span-1 font-medium text-title-4 max-w-xs truncate flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-[20px] w-[20px] text-typography-subtitle`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                              />
                            </svg>
                            <div className="">
                              <p className="">{val.description}</p>
                              <p
                                className={`${
                                  dayjs().isAfter(dayjs(val.time))
                                    ? 'text-error-base'
                                    : ''
                                }`}
                              >
                                Hạn nộp:{' '}
                                {dayjs(val.time).format(DATE_TIME_FORMAT_VIEW)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex gap-2"
                          data-headlessui-state="open"
                        >
                          {/* <div className="col col-span-1 font-medium text-title-3 max-w-xs truncate">
                            Đã nộp vào:{' '}
                            {dayjs(val.reports).format(DATE_TIME_FORMAT_VIEW)}
                          </div> */}
                        </div>
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 ">
                      <div className="flex flex-col">
                        {(val.reports ?? []).length <= 0 ? (
                          <>
                            <div className="flex flex-col gap-3 items-center justify-center">
                              Bạn chưa nộp bài tập cho mốc này
                              <div>
                                <Button
                                  onClick={() => {
                                    setIsShowModalCreate(true)
                                    setCurrentMilestone(val.id)
                                  }}
                                  className="flex gap-2 items-center "
                                >
                                  <span className="text-grey-1">Thêm mới</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 "
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          (val.reports ?? []).map((report, index) => (
                            <>
                              <div
                                key={report.id}
                                className="flex items-center gap-3 px-4 py-2 bg-grey-1 odd:bg-grey-3 cursor-pointer"
                                onClick={() => setCurrentReport(report)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                  />
                                </svg>
                                <Tooltip
                                  tootipDetail={
                                    <div className="grow max-w-sm truncate">
                                      {report.description}
                                    </div>
                                  }
                                >
                                  {report.description}
                                </Tooltip>
                              </div>
                            </>
                          ))
                        )}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              {currentReport && (
                <Updatereport
                  isOpen={isShowModalUpdate}
                  closeModal={() => {
                    setIsShowModalUpdate(false)
                    setCurrentReport(undefined)
                  }}
                  currentReportDetail={currentReport}
                />
              )}
              {currentMilestone && (
                <Createreport
                  isOpen={isShowModalCreate}
                  closeModal={() => {
                    setIsShowModalCreate(false)
                    setCurrentMilestone(undefined)
                  }}
                  scheduleByStudent={props.scheduleByStudent}
                  milestone_id={currentMilestone}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default ReportStudentListView
