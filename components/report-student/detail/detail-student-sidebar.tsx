import { StatusView } from '@/components/report-lecturer/common/status-view'
import Avatar from '@/components/ui/avatar/avatar'
import { UserGetDetail } from '@/models/api'
import React from 'react'

const DetailStudentSideBar = (props: { detailStudent: UserGetDetail }) => {
  return (
    <div className="sticky top-5">
      <div className="p-6 bg-grey-1 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center mt-3">
          <div className="text-title-2">Thông tin</div>
        </div>
        <div className="flex flex-col h-full  rounded-lg rounded-t-none">
          <div className="text-sm break-all flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-heading-8">Trạng thái sinh viên</div>
              <StatusView data={props.detailStudent.status ?? 'Không có'} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 h-[180px]">
          <div className="text-heading-8">Thành viên nhóm</div>
          <div className="flex flex-col mx-2 max-h-[180px] overflow-y-auto bg-grey-2 rounded-md shadow-sm">
            {props.detailStudent.group.students.map((e) => {
              return (
                <div className="flex gap-2 items-center p-2 hover:bg-white hover:cursor-pointer">
                  <Avatar name={e.fullname} size="small" />
                  <div className="flex flex-col text-title-6">
                    <div className="">{e.fullname}</div>
                    <div className="">{e.email}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="">
          <div className="text-heading-6">Giảng viên phụ trách</div>
          <div className={`flex gap-2 text-sm break-all pt-5 items-center`}>
            <Avatar
              name={props.detailStudent.group.lecturer_id.email}
              size="medium"
            />
            <div className="flex flex-col text-heading-7">
              <div>{props.detailStudent.group.lecturer_id.fullname}</div>
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
              {props.detailStudent.group.lecturer_id.email}
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
              {props.detailStudent.group.lecturer_id.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailStudentSideBar
