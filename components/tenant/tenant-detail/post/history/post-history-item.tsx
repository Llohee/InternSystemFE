import Avatar from '@/components/ui/avatar/avatar'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { ActivityDetail } from '@/models/api'
import { Disclosure, DisclosureButton } from '@headlessui/react'
import dayjs from 'dayjs'
import React from 'react'

const PostHistoryItem = (props: { activity: ActivityDetail }) => {
  return (
    <div className="flex gap-2 items-start">
      <Avatar name={props.activity.actor} className="mt-1" />
      <div className="grow flex flex-col items-start">
        <div className="flex gap-2 items-center">
          <i className="text-label-3">
            <Tooltip
              tootipDetail={
                props.activity.actor ? (
                  <div className="flex flex-col  text-caption-2">
                    <div>{props.activity.actor}</div>
                  </div>
                ) : (
                  <></>
                )
              }
            >
              {props.activity.actor ?? 'Hệ thống'}
            </Tooltip>
          </i>
          <span className="w-1 h-1 aspect-square rounded-full bg-typography-body" />
          {props.activity.time && (
            <div
              className={`${
                props.activity.action === 'CREATE' && 'text-secondary1-pressed'
              }`}
            >
              {dayjs(props.activity.time).format('HH:mm')}
            </div>
          )}
        </div>
        <Disclosure as="div" className="inline-block text-left col col-span-11">
          {({ open }) => (
            <>
              <DisclosureButton as="div">
                <div className="flex items-center gap-2">
                  <span className="inline-flex gap-1 ">
                    {props.activity.action === 'CREATE'
                      ? 'Đã tạo bài đăng'
                      : props.activity.action === 'UPDATE'
                      ? 'Đã cập nhật bài đăng'
                      : props.activity.action}
                  </span>
                  {/* {activity.updates && activity.updates.length > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-3 h-3 transition ease-in-out duration-100 ${
                        open ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )} */}
                </div>
              </DisclosureButton>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default PostHistoryItem
