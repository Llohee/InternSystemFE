import Avatar from '@/components/ui/avatar/avatar'
import { ContainerFormBody } from '@/components/ui/container'
import { CVDetail } from '@/models/api'
import React from 'react'

const CvDetail = (props: { cvDetaildata: CVDetail }) => {
  return (
    <>
      <ContainerFormBody>
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-3 justify-center items-center col-span-1 row-span-2">
            <Avatar name={props.cvDetaildata.user.fullname} />
            <p className="text-heading-4">{props.cvDetaildata.user.fullname}</p>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <div className="px-6 py-3 border-border-1 border rounded-md text-title-3 text-typography-title">
              Mục tiêu nghề nghiệp
            </div>
            <div className="px-2">{props.cvDetaildata.target_job}</div>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <div className="px-6 py-3 border-border-1 border rounded-md text-title-3 text-typography-title">
              Trình độ học vấn
            </div>
            <div className="px-2">{props.cvDetaildata.educational_level}</div>
          </div>
          <div className="flex flex-col gap-2 col-span-1">
            <div className="px-6 py-3 border-border-1 border rounded-md text-title-3 text-typography-title">
              Thông tin cá nhân
            </div>
            <div className="flex flex-col gap-2 px-2">
              <div className="">SĐT :{props.cvDetaildata.user.phone}</div>
              <div className="flex whitespace-nowrap">
                Email: {props.cvDetaildata.user.email}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <div className="px-6 py-3 border-border-1 border rounded-md text-title-3 text-typography-title">
              Kinh nghiệm làm việc
            </div>
            <div className="px-2">{props.cvDetaildata.experient_job}</div>
          </div>
        </div>
      </ContainerFormBody>
    </>
  )
}

export default CvDetail
