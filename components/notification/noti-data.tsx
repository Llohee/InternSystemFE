import { GetAllNotification, SysNotification } from '@/models/api'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { EmptyView, EmptyViewTitle } from '../ui/empty-view'
import { EmptyInboxIcon } from '../ui/icon/empty'
import { MenuBarItemLink } from '../ui/menu-bar/menu-bar'
import toast from 'react-hot-toast'
import { useNotificationReadMutation } from './hook'
import { Tooltip } from '../ui/tooltip/tooltip'
import Avatar from '../ui/avatar/avatar'
import { Tag } from '../ui/tag'
import DOMPurify from 'dompurify'
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT_VIEW } from '../common/constant'
import { Button } from '../ui/button/button'

const NotiData = (props: {
  getAllSysNotification: UseInfiniteQueryResult<GetAllNotification, unknown>
  notiData: InfiniteData<GetAllNotification>
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const readNotiMutation = useNotificationReadMutation()

  useEffect(() => {
    if (isInView) {
      props.getAllSysNotification.fetchNextPage()
    }
  }, [isInView])
  if (props.notiData.pages[0].total === 0) {
    return (
      <div className="p-3 h-[430px]">
        <EmptyView intent="transparent-background">
          <EmptyInboxIcon />
          <EmptyViewTitle>Thông báo trống</EmptyViewTitle>
        </EmptyView>
      </div>
    )
  }
  return (
    <div className="flex flex-col divide-y-[1px] divide-border-2 h-[430px] overflow-auto">
      {props.notiData.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((noti) =>
            noti.is_redirect ? (
              <MenuBarItemLink
                href={noti.meta_data.type === 'REQUEST' ? `/report/lecturer/${noti.meta_data.student_id}?post_id=${noti.meta_data.post_id}&student_id=${noti.meta_data.student_id}` :  ``}
                key={noti.notify_id}
                onClick={() =>
                  readNotiMutation.mutate({
                    notify_ids: [noti.notify_id],
                    is_readed: true,
                  })
                }
              >
                <NotificationMenuItem
                  notify_id={noti.notify_id}
                  description={noti.content}
                  createTime={noti.created_time}
                  readed={noti.is_readed}
                  updaterName={noti.meta_data.Lecturer}
                  type={noti.meta_data.type}
                />
              </MenuBarItemLink>
            ) : (
              <div
                className="flex items-center first:rounded-t-md last:rounded-b-md gap-3 px-3 py-3.5 hover:bg-grey-hover ui-active:bg-grey-hover z-[500]"
                key={noti.notify_id}
                onClick={() => {
                  toast(
                    'Bạn không có quyền. Vui lòng liên hệ giảng viên để được hỗ trợ',
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5 text-secondary1-base"
                        >
                          <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                        </svg>
                      ),
                      id: 'noti-alert-variant',
                    }
                  )
                  readNotiMutation.mutate({
                    notify_ids: [noti.notify_id],
                    is_readed: true,
                    // type: props.type,
                  })
                }}
              >
                <NotificationMenuItem
                  notify_id={noti.notify_id}
                  description={noti.content}
                  createTime={noti.created_time}
                  readed={noti.is_readed}
                  updaterName={noti.meta_data.Lecturer}
                  type={noti.meta_data.type}
                />
              </div>
            )
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const NotificationMenuItem = (props: {
  // title: string
  notify_id: string
  description: string
  createTime: string
  readed: boolean
  updaterName: string
  type: 'REPORT' | 'REQUEST'
}) => {
  const readNotiMutation = useNotificationReadMutation()
  return (
    <div
      className={`w-full group flex justify-between items-center border-spacing-0.5 border-border-2  hover:bg-grey-hover cursor-default `}
    >
      <div className="flex-1 flex gap-2 items-start">
        <div className={`relative`}>
          <Tooltip
            tootipDetail={
              props.updaterName ? (
                <span className="whitespace-nowrap">{props.updaterName}</span>
              ) : (
                <span className="whitespace-nowrap">
                 Chưa xác định
                </span>
              )
            }
            placementTootip="bottom"
            dark
          >
            <Avatar
              name={props.updaterName}
              className={`shrink-0 size-11 ${props.readed && 'opacity-50'}`}
            />
          </Tooltip>
          {/* <Tag
            iconOnly
            intent={
              props.type === 'REQUEST'
                ? 'primary'
                : props.type === 'INCIDENT'
                ? 'warning'
                : props.type === 'KB'
                ? 'purple'
                : props.type === 'SLA'
                ? 'error'
                : 'success'
            }
            size="small"
            style="solid"
            className={`absolute -bottom-[20%] -right-[20%] ${
              props.readed && 'opacity-50'
            }`}
          >
            {props.type === 'REQUEST' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
            ) : props.type === 'INCIDENT' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 -rotate-90"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                ></path>
              </svg>
            ) : props.type === 'KB' ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.41667 3C6.05797 3 4.77079 3.29248 3.79296 3.81806C2.8439 4.32818 2 5.1756 2 6.33333V20.5C2 20.9602 2.3731 21.3333 2.83333 21.3333C3.29357 21.3333 3.66667 20.9602 3.66667 20.5C3.66667 20.2411 3.86443 19.8385 4.58204 19.4528C5.27088 19.0825 6.27537 18.8333 7.41667 18.8333C8.55797 18.8333 9.56245 19.0825 10.2513 19.4528C10.9689 19.8385 11.1667 20.2411 11.1667 20.5C11.1667 20.9602 11.5398 21.3333 12 21.3333C12.4602 21.3333 12.8333 20.9602 12.8333 20.5C12.8333 20.2411 13.0311 19.8385 13.7487 19.4528C14.4375 19.0825 15.442 18.8333 16.5833 18.8333C17.7246 18.8333 18.7291 19.0825 19.418 19.4528C20.1356 19.8385 20.3333 20.2411 20.3333 20.5C20.3333 20.9602 20.7064 21.3333 21.1667 21.3333C21.6269 21.3333 22 20.9602 22 20.5V6.33333C22 5.1756 21.1561 4.32818 20.207 3.81806C19.2292 3.29248 17.942 3 16.5833 3C15.2246 3 13.9375 3.29248 12.9596 3.81806C12.6139 4.0039 12.2821 4.23449 12 4.50855C11.7179 4.23449 11.3861 4.0039 11.0404 3.81806C10.0625 3.29248 8.77537 3 7.41667 3ZM3.79296 17.9847C3.75063 18.0075 3.70851 18.0309 3.66667 18.055V6.33333C3.66667 6.0744 3.86443 5.67182 4.58204 5.2861C5.27088 4.91585 6.27537 4.66667 7.41667 4.66667C8.55797 4.66667 9.56245 4.91585 10.2513 5.2861C10.9689 5.67182 11.1667 6.0744 11.1667 6.33333V18.055C11.1248 18.0309 11.0827 18.0075 11.0404 17.9847C10.0625 17.4592 8.77537 17.1667 7.41667 17.1667C6.05797 17.1667 4.77079 17.4592 3.79296 17.9847ZM12.8333 18.055C12.8752 18.0309 12.9173 18.0075 12.9596 17.9847C13.9375 17.4592 15.2246 17.1667 16.5833 17.1667C17.942 17.1667 19.2292 17.4592 20.207 17.9847C20.2494 18.0075 20.2915 18.0309 20.3333 18.055V6.33333C20.3333 6.0744 20.1356 5.67182 19.418 5.2861C18.7291 4.91585 17.7246 4.66667 16.5833 4.66667C15.442 4.66667 14.4375 4.91585 13.7487 5.2861C13.0311 5.67182 12.8333 6.0744 12.8333 6.33333V18.055Z"
                />
              </svg>
            ) : props.type === 'SLA' ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.95472 2H15.5298L13.863 7.83369H19.5378L7.73253 22L10.024 12.834H5L7.95472 2ZM9.22779 3.66677L7.18222 11.1672H12.1588L11.1168 15.3354L15.9792 9.50045H11.6533L13.3201 3.66677H9.22779Z"
                />
              </svg>
            ) : (
              <></>
            )}
          </Tag> */}
        </div>
        <div className={`flex flex-col gap-1 justify-between`}>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.description),
            }}
            className={`text-body-3 text-typography-body [&_span]:text-primary-base [&_span]:font-semibold ${
              props.readed && 'opacity-50'
            }`}
          />
          <div className="flex items-center gap-3">
            <div
              className={`text-caption-2 text-typography-subtitle ${
                props.readed && 'opacity-50'
              }`}
            >
              {dayjs(props.createTime).format(DATE_TIME_FORMAT_VIEW)}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition ease-in-out duration-75">
              <Tooltip
                tootipDetail={
                  props.readed ? (
                    <span className="whitespace-nowrap">
                      Đánh dấu là chưa đọc
                    </span>
                  ) : (
                    <span className="whitespace-nowrap">
                      Đánh dấu là đã đọc
                    </span>
                  )
                }
                placementTootip="top"
                dark
              >
                <Button
                  btnStyle="no-background"
                  intent="grey"
                  // posting={readNotiMutation.isLoading}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    readNotiMutation.mutate({
                      notify_ids: [props.notify_id],
                      is_readed: !props.readed,
                      // type: props.readType,
                    })
                  }}
                >
                  {props.readed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-5 flex items-center justify-end">
        {!props.readed && (
          <svg
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="size-2 text-primary-base"
          >
            <path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" />
          </svg>
        )}
      </div>
    </div>
  )
}

export default NotiData
