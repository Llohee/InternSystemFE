import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { TenantDetail } from '@/models/api'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ConfirmRequestLink from './confirm-request-link'
import AcceptRequestLink from './accept-request-link'

const DetailView = (props: {
  tenantDetail: TenantDetail
  closeModal: () => void
  type: string
}) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
  const [isShowModalAccept, setIsShowModalAccept] = useState(false)
  return (
    <>
      <ContainerFormBody>
        <div className="bg-grey-2 px-8 py-8 rounded-lg grid grid-cols-2 gap-4 col-span-2">
          <div className="col-span-1">
            <Image
              src={props.tenantDetail.image_url}
              alt=""
              width={100}
              height={100}
              className="border border-border-1 rounded-md col-span-1"
            />
          </div>
          <div className="col-span-1 text-heading-6 text-typography-label">
            {props.tenantDetail.name}
          </div>

          <div className="flex items-center text-label-3 text-typography-label gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2379 22.0732C11.2381 22.0734 11.2382 22.0735 11.8746 21.4371L12.511 22.0735L11.8746 22.7099L11.2379 22.0732Z"
                fill="#00204D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8746 6.47461C9.99684 6.47461 8.47461 7.99684 8.47461 9.87461C8.47461 11.7524 9.99684 13.2746 11.8746 13.2746C13.7524 13.2746 15.2746 11.7524 15.2746 9.87461C15.2746 7.99684 13.7524 6.47461 11.8746 6.47461ZM10.2746 9.87461C10.2746 8.99095 10.991 8.27461 11.8746 8.27461C12.7583 8.27461 13.4746 8.99095 13.4746 9.87461C13.4746 10.7583 12.7583 11.4746 11.8746 11.4746C10.991 11.4746 10.2746 10.7583 10.2746 9.87461Z"
                fill="#00204D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.2379 22.0732L11.8746 21.4371C12.511 22.0735 12.5116 22.0729 12.5117 22.0728L12.5177 22.0668L12.5342 22.0502L12.5953 21.988C12.6481 21.934 12.7246 21.8552 12.8213 21.7538C13.0146 21.5511 13.2893 21.2577 13.6183 20.8916C14.2752 20.1605 15.1531 19.1341 16.0332 17.956C16.9111 16.7807 17.8044 15.4367 18.4817 14.0712C19.1521 12.7195 19.6496 11.2702 19.6496 9.9043C19.6496 4.95569 15.6075 2.09961 11.8746 2.09961C8.14173 2.09961 4.09961 4.95569 4.09961 9.9043C4.09961 11.2702 4.59715 12.7195 5.26755 14.0712C5.9448 15.4367 6.83817 16.7807 7.71606 17.956C8.59609 19.1341 9.47398 20.1605 10.1309 20.8916C10.4599 21.2577 10.7346 21.5511 10.928 21.7538C11.0247 21.8552 11.1011 21.934 11.1539 21.988L11.215 22.0502L11.2315 22.0668L11.2379 22.0732ZM5.89961 9.9043C5.89961 6.11416 8.96311 3.89961 11.8746 3.89961C14.7861 3.89961 17.8496 6.11416 17.8496 9.9043C17.8496 10.8673 17.4878 12.024 16.8691 13.2714C16.2573 14.505 15.4319 15.7531 14.5911 16.8788C13.7523 18.0016 12.9115 18.9851 12.2794 19.6886C12.1319 19.8527 11.9961 20.0012 11.8746 20.1325C11.7531 20.0012 11.6173 19.8527 11.4698 19.6886C10.8377 18.9851 9.99688 18.0016 9.15816 16.8788C8.3173 15.7531 7.49192 14.505 6.88011 13.2714C6.26145 12.024 5.89961 10.8673 5.89961 9.9043Z"
                fill="#00204D"
              />
            </svg>
            Địa điểm :
          </div>
          <div className="text-label-3 text-typography-label">
            {props.tenantDetail.location}
          </div>
          <div className="flex items-center text-label-3 text-typography-label gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.6282 4.49584C15.7554 4.70525 15.8748 4.92254 15.9863 5.14551C16.7892 6.75142 17.2993 8.85818 17.3988 11.1667H20.2922C19.9999 8.22293 18.1758 5.72984 15.6282 4.49584ZM15.6282 19.5042C18.1758 18.2702 19.9999 15.7771 20.2922 12.8333H17.3988C17.2993 15.1418 16.7892 17.2486 15.9863 18.8545C15.8748 19.0775 15.7554 19.2947 15.6282 19.5042ZM8.37181 19.5042C8.24465 19.2947 8.12522 19.0775 8.01374 18.8545C7.21078 17.2486 6.70073 15.1418 6.60122 12.8333H3.70781C4.00008 15.7771 5.82423 18.2702 8.37181 19.5042ZM8.3718 4.49584C5.82423 5.72984 4.00008 8.22293 3.70781 11.1667H6.60122C6.70073 8.85818 7.21078 6.75142 8.01374 5.14551C8.12522 4.92254 8.24465 4.70526 8.3718 4.49584ZM9.50445 5.89087C8.83235 7.23507 8.36813 9.07823 8.26956 11.1667H11.1667V3.9022C10.6061 4.21516 10.0235 4.85277 9.50445 5.89087ZM14.4956 5.89087C15.1677 7.23507 15.6319 9.07823 15.7304 11.1667H12.8333V3.9022C13.3939 4.21516 13.9765 4.85277 14.4956 5.89087ZM14.4956 18.1091C13.9765 19.1472 13.3939 19.7848 12.8333 20.0978V12.8333H15.7304C15.6319 14.9218 15.1677 16.7649 14.4956 18.1091ZM9.50445 18.1091C10.0235 19.1472 10.6061 19.7848 11.1667 20.0978V12.8333H8.26956C8.36813 14.9218 8.83235 16.7649 9.50445 18.1091Z"
                fill="#00204D"
              />
            </svg>
            Trang chủ :
          </div>
          <Link href={`${props.tenantDetail.website}`} target="_blank">
            <div className="text-label-3 text-typography-label hover:underline hover:text-brand-hover hover:underline-offset-2">
              {props.tenantDetail.website}
            </div>
          </Link>
        </div>
      </ContainerFormBody>
      {JSON.stringify(props.tenantDetail.id)}
      <ContainerFormFooter>
        <Button
          btnStyle={'no-background'}
          intent={'grey'}
          onClick={props.closeModal}
        >
          Đóng
        </Button>
        <div className={`${props.type === 'link' ? 'hidden' : 'flex gap-2'}`}>
          <Button
            intent={'primary'}
            type={'submit'}
            onClick={() => setIsShowModalAccept(true)}
          >
            Chấp nhận liên kết
          </Button>
          <Button
            intent={'success'}
            type={'submit'}
            onClick={() => setIsShowModalConfirm(true)}
          >
            Yêu cầu liên kết
          </Button>
        </div>
      </ContainerFormFooter>
      <ConfirmRequestLink
        isOpen={isShowModalConfirm}
        closeModal={() => {
          setIsShowModalConfirm(false)
          props.closeModal
        }}
        tenantDetail={props.tenantDetail}
      />
      <AcceptRequestLink
        isOpen={isShowModalAccept}
        closeModal={() => {
          setIsShowModalAccept(false)
          // router.push('/tenant-link')
        }}
        tenantDetail={props.tenantDetail}
      />
    </>
  )
}

export default DetailView
