import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import Avatar from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { Pill } from '@/components/ui/pill'
import { ScheduleDetail, UserGetDetail } from '@/models/api'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { StatusView } from '../common/status-view'
import ReportWrapper from './report'
import { Tag } from '@/components/ui/tag'

const ReportView = (props: {
  id: string
  isOpenSideListReport: boolean
  scheduleLecturer: ScheduleDetail
  studentById: UserGetDetail
}) => {
  const [selectedTab, onChangeSelectedTab] = useState(0)
  return (
    <div className="">
      <div className="w-full relative">
        <div className="w-full px-5">
          <div
            className={`block  ${
              props.isOpenSideListReport ? 'xl:hidden' : 'md:hidden'
            }`}
          >
            <ReportTileView {...props} />
          </div>
          <div
            className={`flex flex-col ${
              props.isOpenSideListReport
                ? 'xl:grid xl:grid-cols-12'
                : 'lg:grid lg:grid-cols-12'
            } gap-5 divide-x-2 divide-solid divide-grey-1`}
          >
            <div
              className={`col lg:col-span-8 flex flex-col items-start ${
                props.isOpenSideListReport ? ' order-2' : 'lg:order-1'
              }`}
            >
              <div
                className={`hidden w-full top-0 bg-white z-20 ${
                  props.isOpenSideListReport ? 'xl:block' : 'md:block'
                }`}
              >
                <ReportTileView {...props} />
              </div>
              <div className="flex flex-col w-full">
                <div className="grow w-full overflow-auto">
                  <ListTab
                    selectedIndex={selectedTab}
                    onChange={onChangeSelectedTab}
                    titles={[
                      {
                        title: 'Báo cáo',
                        node: <ReportWrapper studentId={props.id} />,
                      },
                      {
                        title: 'Bình luận',
                        node: <></>,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div
              className={`col lg:row-span-full flex flex-col gap-5 relative ${
                props.isOpenSideListReport
                  ? 'col-span-full xl:col-start-9 xl:col-span-4'
                  : 'order-1 col-span-full lg:order-2 lg:col-start-9 lg:col-span-4'
              }`}
            >
              <DetailSideBar
                scheduleLecturer={props.scheduleLecturer}
                studentById={props.studentById}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const DetailSideBar = (props: {
  scheduleLecturer: ScheduleDetail
  studentById: UserGetDetail
}) => {
  return (
    <div className="sticky top-5">
      <div className="p-6 bg-grey-1 rounded-lg">
        <div className="flex justify-between items-center my-3">
          <div className="text-title-2">Thông tin</div>
        </div>
        <div className="flex flex-col h-full  rounded-lg rounded-t-none">
          <div className="text-sm break-all flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-heading-8">Trạng thái sinh viên</div>
              <StatusView data={props.studentById.status ?? 'Không có'} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-heading-8">Hạn nộp báo cáo</div>
              {props.scheduleLecturer.milestones.map((e) => {
                return (
                  <Tag intent={'success'} size={'medium'}>
                    <span
                      className="w-2 h-2 rounded-full border"
                    />
                    {e.description} - {dayjs(e.time).format(DATE_FORMAT_VIEW)}
                  </Tag>
                )
              })}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-heading-6">Thông tin sinh viên</div>
          <div className={`flex gap-2 text-sm break-all pt-5 items-center`}>
            <Avatar name={props.studentById.fullname} size="medium" />
            <div>
              <div className="flex flex-col text-heading-7">
                {props.studentById.fullname ?? 'Không tên'}
              </div>
              <div className="text-subtitle-4 whitespace-nowrap truncate">
                {props.studentById.code ?? ''}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-5 text-button-3">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="!w-5 !h-5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              {props.studentById.email}
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="!w-5 !h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {props.studentById.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const ReportTileView = (props: {
  id: string
  isOpenSideListReport: boolean
  scheduleLecturer: ScheduleDetail
  studentById: UserGetDetail
}) => {
  const router = useRouter()

  return (
    <div className="">
      <div className="sticky top-0 flex gap-2 z-30 bg-white py-5 shadow-b-md">
        <Button
          type="button"
          intent={'grey'}
          btnStyle={'ghost'}
          className="flex-2 !border-0 !p-0 text-button-3"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
          Quay lại
        </Button>
        {props.studentById.code && (
          <Pill intent="primary">{props.studentById.code ?? ''}</Pill>
        )}
      </div>
      <div className="flex justify-center w-full relative">
        <div className="w-full relative">
          <div className="mt-2 grid lg:grid-cols-12 auto-rows-max gap-x-6 gap-y-0 divide-x-2 divide-solid divide-grey-3">
            <div className="lg:col-span-full flex flex-col items-start">
              <div className="w-full">
                <div className="flex gap-5 grow">
                  <div className="flex justify-between gap-3 w-full">
                    <div className="grow">
                      <div className="flex gap-2 items-start text-heading-5 text-typography-title">
                        <div className="break-all">
                          {props.studentById.fullname}
                        </div>
                      </div>
                      <div className="flex gap-5 text-subtitle-3 items-center text-typography-subtitle">
                        <div className="break-all">
                          {props.studentById.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 p-5 justify-between items-start bg-grey-1 gap-2 rounded-lg my-2">
            <div className="col">
              <div className="">Ngày bắt đầu</div>
              <div className="text-typography-label text-heading-8 flex flex-wrap gap-1 items-center whitespace-pre-wrap">
                {dayjs(props.scheduleLecturer.start_day).format(
                  DATE_FORMAT_VIEW
                )}
              </div>
            </div>
            <div className="col">
              <div className="">Ngày kết thúc</div>
              <div className="text-typography-label text-heading-8 flex flex-wrap gap-1 items-center whitespace-pre-wrap">
                {dayjs(props.scheduleLecturer.finish_day).format(
                  DATE_FORMAT_VIEW
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReportView
