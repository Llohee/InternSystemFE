import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import { PostDetail } from '@/models/api'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import ApplyCVModal from './apply/modal-apply'
import { useState } from 'react'
import Link from 'next/link'
import { useGetUserDetail } from '@/hooks/query/auth'

const PostDetailView = (props: { postDetail: PostDetail }) => {
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false)
  const userDetail = useGetUserDetail()
  return (
    <>
      <div className="container mx-auto grid grid-cols-3 gap-6 mt-[60px]">
        <div className="col-span-2">
          <div className="bg-grey-2 px-8 py-6 rounded-lg flex flex-col gap-6">
            <div className="text-heading-6 text-typography-title">
              {props.postDetail.title}
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.92 16.75C21.59 19.41 19.41 21.59 16.75 21.92C15.14 22.12 13.64 21.68 12.47 20.82C11.8 20.33 11.96 19.29 12.76 19.05C15.77 18.14 18.14 15.76 19.06 12.75C19.3 11.96 20.34 11.8 20.83 12.46C21.68 13.64 22.12 15.14 21.92 16.75Z"
                      fill="white"
                    ></path>
                    <path
                      d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-3 font-normal">Mức lương</span>
                  {props.postDetail.negotiable_salary === false ? (
                    <div className="bg-white px-2 rounded-lg hover:shadow-sm">
                      {props.postDetail.salary_min} -{' '}
                      {props.postDetail.salary_max} {props.postDetail.currency}
                    </div>
                  ) : (
                    <div className="text-label-3">Thỏa thuận</div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.2866 8.45C20.2366 3.83 16.2066 1.75 12.6666 1.75C12.6666 1.75 12.6666 1.75 12.6566 1.75C9.1266 1.75 5.0866 3.82 4.0366 8.44C2.8666 13.6 6.0266 17.97 8.8866 20.72C9.9466 21.74 11.3066 22.25 12.6666 22.25C14.0266 22.25 15.3866 21.74 16.4366 20.72C19.2966 17.97 22.4566 13.61 21.2866 8.45ZM12.6666 13.46C10.9266 13.46 9.5166 12.05 9.5166 10.31C9.5166 8.57 10.9266 7.16 12.6666 7.16C14.4066 7.16 15.8166 8.57 15.8166 10.31C15.8166 12.05 14.4066 13.46 12.6666 13.46Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-3 font-normal">Địa điểm</span>
                  <div className="text-label-3">
                    {props.postDetail.local.name}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
                      fill="white"
                    ></path>
                    <path
                      d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-3 font-normal">Kinh nghiệm</span>
                  <div className="text-label-3">
                    {props.postDetail.work_experience}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-label-3 font-normal bg-grey-3 w-fit px-3 py-2 rounded-lg">
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
                  d="M12 3.66667C7.39763 3.66667 3.66667 7.39763 3.66667 12C3.66667 16.6024 7.39763 20.3333 12 20.3333C16.6024 20.3333 20.3333 16.6024 20.3333 12C20.3333 7.39763 16.6024 3.66667 12 3.66667ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                  fill="#00204D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 6.16667C12.4602 6.16667 12.8333 6.53976 12.8333 7V11.1667H17C17.4602 11.1667 17.8333 11.5398 17.8333 12C17.8333 12.4602 17.4602 12.8333 17 12.8333H12C11.5398 12.8333 11.1667 12.4602 11.1667 12V7C11.1667 6.53976 11.5398 6.16667 12 6.16667Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
              </svg>
              Hạn ứng tuyển :{' '}
              <span className="text-label-3">
                {dayjs(props.postDetail.expired_time).format(DATE_FORMAT_VIEW)}
              </span>
            </div>
            <Button
              className="!w-full"
              onClick={() => setIsOpenApplyModal(true)}
            >
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
                  d="M21.7337 2.26627C21.8899 2.42247 21.9774 2.62138 21.9961 2.8254C22.0026 2.89496 22.001 2.96549 21.9912 3.03559C21.9821 3.10068 21.9659 3.16497 21.9427 3.22723L15.5853 21.3912C15.4698 21.7212 15.1754 21.9557 14.8279 21.9944C14.4805 22.0331 14.1416 21.8692 13.9564 21.5727L9.5221 14.4779L2.42729 10.0436C2.13084 9.85837 1.9669 9.51951 2.00561 9.17207C2.04432 8.82464 2.27883 8.53018 2.60879 8.41469L20.7703 2.05814C20.7703 2.05814 20.7703 2.05814 20.7703 2.05814C20.8571 2.02554 20.9478 2.00665 21.0391 2.00147C21.0651 1.99999 21.0911 1.99963 21.117 2.00038C21.3409 2.00677 21.5628 2.0954 21.7337 2.26627ZM17.6311 5.0832L4.99649 9.50532L10.0503 12.664L17.6311 5.0832ZM11.336 13.9496L18.9168 6.36876L14.4947 19.0035L11.336 13.9496Z"
                  fill="#FFF"
                />
              </svg>
              <span>Ứng tuyển ngay</span>
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-grey-2 px-8 py-8 rounded-lg grid grid-cols-2 gap-4 col-span-2">
            <div className="col-span-1 flex items-center">
              <Image
                src={props.postDetail.tenant.image_url}
                alt=""
                width={150}
                height={150}
                className="border border-border-1 rounded-md col-span-1"
              />
            </div>
            <div className="col-span-1 text-heading-6 text-typography-label">
              {props.postDetail.tenant.name}
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
                  d="M11.7381 2.11876C12.002 1.96041 12.3317 1.96041 12.5956 2.11876L20.9289 7.11876C21.1799 7.26936 21.3335 7.54061 21.3335 7.83333C21.3335 8.12605 21.1799 8.39731 20.9289 8.54791L12.5956 13.5479C12.3317 13.7063 12.002 13.7063 11.7381 13.5479L3.40474 8.54791C3.15373 8.39731 3.00015 8.12605 3.00015 7.83333C3.00015 7.54061 3.15373 7.26936 3.40474 7.11876L11.7381 2.11876ZM5.45319 7.83333L12.1668 11.8615L18.8804 7.83333L12.1668 3.80516L5.45319 7.83333Z"
                  fill="#00204D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.11888 11.5713C3.35567 11.1766 3.86756 11.0487 4.26221 11.2854L12.1668 16.0282L20.0714 11.2854C20.466 11.0487 20.9779 11.1766 21.2147 11.5713C21.4515 11.9659 21.3235 12.4778 20.9289 12.7146L12.5955 17.7146C12.3316 17.8729 12.0019 17.8729 11.738 17.7146L3.40471 12.7146C3.01006 12.4778 2.88209 11.9659 3.11888 11.5713Z"
                  fill="#00204D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.11888 15.7379C3.35567 15.3433 3.86756 15.2153 4.26221 15.4521L12.1668 20.1949L20.0714 15.4521C20.466 15.2153 20.9779 15.3433 21.2147 15.7379C21.4515 16.1326 21.3235 16.6445 20.9289 16.8813L12.5955 21.8813C12.3316 22.0396 12.0019 22.0396 11.738 21.8813L3.40471 16.8813C3.01006 16.6445 2.88209 16.1326 3.11888 15.7379Z"
                  fill="#00204D"
                />
              </svg>
              Lĩnh vực :
            </div>
            <div className="text-label-3 text-typography-label">
              {props.postDetail.profession.name}
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
              {props.postDetail.local.name}
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
            <Link href={`${props.postDetail.tenant.website}`} target="_blank">
              <div className="text-label-3 text-typography-label hover:underline hover:text-brand-hover hover:underline-offset-2">
                {props.postDetail.tenant.website}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-grey-2 px-5 py-6 rounded-lg flex flex-col gap-6">
            <div className="border-l-8 border-brand px-5 text-heading-6">
              Chi tiết bài đăng tuyển dụng
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-label-1 text-typography-label">
                Mô tả công việc
              </div>
              <div className="container mx-auto">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.postDetail.description),
                  }}
                  className={`text-body-2 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold 
                }`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-label-1 text-typography-label">
                Yêu cầu ứng viên
              </div>
              <div className="container mx-auto">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.postDetail.request),
                  }}
                  className={`text-body-2 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold 
                }`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-label-1 text-typography-label">
                Quyền lợi
              </div>
              <div className="container mx-auto">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.postDetail.interest),
                  }}
                  className={`text-body-2 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold 
                }`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-label-1 text-typography-label">
                Địa điểm làm việc
              </div>
              <div className="container mx-auto">
                <p className="text-body-2 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold">
                  {props.postDetail.tenant.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-label-1 text-typography-label">
                Cách thức ứng tuyển
              </div>
              <div className="px-2">
                <p className="text-body-2 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold">
                  Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{' '}
                  <span className="bold hover:cursor-pointer">Ứng tuyển</span>{' '}
                  ngay dưới đây.
                </p>
              </div>
            </div>
            <div className="text-label-3">
              Hạn nộp hồ sơ:{' '}
              {dayjs(props.postDetail.expired_time).format(DATE_FORMAT_VIEW)}
            </div>
            <Button className="" onClick={() => setIsOpenApplyModal(true)}>
              <span>Ứng tuyển ngay</span>
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-grey-2 px-8 py-8 rounded-lg flex flex-col gap-8">
            <div className="text-heading-6 text-typography-title">
              Thông tin chung
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.81 5.49V6.23L14.27 4.18C12.93 3.41 11.06 3.41 9.73 4.18L6.19 6.24V5.49C6.19 3.24 7.42 2 9.67 2H14.33C16.58 2 17.81 3.24 17.81 5.49Z"
                    fill="white"
                  ></path>
                  <path
                    d="M17.84 7.96999L17.7 7.89999L16.34 7.11999L13.52 5.48999C12.66 4.98999 11.34 4.98999 10.48 5.48999L7.66 7.10999L6.3 7.90999L6.12 7.99999C4.37 9.17999 4.25 9.39999 4.25 11.29V15.81C4.25 17.7 4.37 17.92 6.16 19.13L10.48 21.62C10.91 21.88 11.45 21.99 12 21.99C12.54 21.99 13.09 21.87 13.52 21.62L17.88 19.1C19.64 17.92 19.75 17.71 19.75 15.81V11.29C19.75 9.39999 19.63 9.17999 17.84 7.96999ZM14.79 13.5L14.18 14.25C14.08 14.36 14.01 14.57 14.02 14.72L14.08 15.68C14.12 16.27 13.7 16.57 13.15 16.36L12.26 16C12.12 15.95 11.89 15.95 11.75 16L10.86 16.35C10.31 16.57 9.89 16.26 9.93 15.67L9.99 14.71C10 14.56 9.93 14.35 9.83 14.24L9.21 13.5C8.83 13.05 9 12.55 9.57 12.4L10.5 12.16C10.65 12.12 10.82 11.98 10.9 11.86L11.42 11.06C11.74 10.56 12.25 10.56 12.58 11.06L13.1 11.86C13.18 11.99 13.36 12.12 13.5 12.16L14.43 12.4C15 12.55 15.17 13.05 14.79 13.5Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-label-3 font-normal">Cấp bậc</span>
                <div className="text-label-3">
                  {props.postDetail.position.name}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
                    fill="white"
                  ></path>
                  <path
                    d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-label-3 font-normal">Kinh nghiệp</span>
                <div className="text-label-3">
                  {props.postDetail.work_experience}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                    fill="white"
                  ></path>
                  <path
                    d="M14.08 14.15C11.29 12.29 6.74002 12.29 3.93002 14.15C2.66002 15 1.96002 16.15 1.96002 17.38C1.96002 18.61 2.66002 19.75 3.92002 20.59C5.32002 21.53 7.16002 22 9.00002 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
                    fill="white"
                  ></path>
                  <path
                    d="M19.99 7.34001C20.15 9.28001 18.77 10.98 16.86 11.21C16.85 11.21 16.85 11.21 16.84 11.21H16.81C16.75 11.21 16.69 11.21 16.64 11.23C15.67 11.28 14.78 10.97 14.11 10.4C15.14 9.48001 15.73 8.10001 15.61 6.60001C15.54 5.79001 15.26 5.05001 14.84 4.42001C15.22 4.23001 15.66 4.11001 16.11 4.07001C18.07 3.90001 19.82 5.36001 19.99 7.34001Z"
                    fill="white"
                  ></path>
                  <path
                    d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-label-3 font-normal">Số lượng tuyển</span>
                <div className="text-label-3">{props.postDetail.slot}</div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-brand-tag w-fit h-fit rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                    fill="white"
                  ></path>
                  <path
                    d="M17.08 14.15C14.29 12.29 9.74002 12.29 6.93002 14.15C5.66002 15 4.96002 16.15 4.96002 17.38C4.96002 18.61 5.66002 19.75 6.92002 20.59C8.32002 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-label-3 font-normal">Giới tính</span>
                <div className="text-label-3">Không yêu cầu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userDetail.status === 'success' && (
        <ApplyCVModal
          isOpen={isOpenApplyModal}
          closeModal={() => setIsOpenApplyModal(false)}
          postDetail={props.postDetail}
          userDetail={userDetail.data}
        />
      )}
    </>
  )
}
export default PostDetailView
