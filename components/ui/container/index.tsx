import React from 'react'
import dayjs from 'dayjs'
import { cx } from 'class-variance-authority'
import { humanizeDurationConfig } from '@/components/common/duration'

export const ContainerFormBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx('px-6 py-4 flex flex-col gap-6', className)}
    {...props}
  />
))

export const ContainerFormFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      'flex justify-between px-6 py-4 shadow-top bg-white sticky bottom-0 z-50',
      className
    )}
    {...props}
  />
))

interface LastUpdatedProps {
  updated_by?: string
  updated_time?: string
}

export const ContainerLastUpdated = (props: LastUpdatedProps) => {
  return (
    <div className="flex gap-3 py-2.5 px-4 items-center justify-between rounded-lg bg-grey-2 border border-border-2">
      <p className="flex flex-wrap gap-2">
        <span className="text-label-3 text-typography-label">
          Cập nhật lần cuối:
        </span>
        <span className="text-body-3 text-typography-body">
          {props.updated_by}
        </span>
      </p>
      <p className="flex flex-wrap gap-2">
        <span className="text-label-3 text-typography-label">Lúc:</span>
        <span className="text-body-3 text-typography-body">
          {dayjs(props.updated_time).format('DD/MM/YYYY HH:mm')}
        </span>
      </p>
    </div>
  )
}

interface CreateReportTimeProps {
  upload_time?: string
  expired_time?: number
}

export const ContainerCreateReportTime = (props: CreateReportTimeProps) => {
  return (
    <div className="flex gap-3 py-2.5 px-4 items-center justify-between rounded-lg bg-grey-2 border border-border-2">
      <p className="flex flex-wrap gap-2">
        <span className="text-label-3 text-typography-label">
          Thời gian nộp:
        </span>
        <span className="text-body-3 text-typography-body">
          {dayjs(props.upload_time).format('DD/MM/YYYY HH:mm')}
        </span>
      </p>
      {(props.expired_time ?? 0) > 0 && (
        <p className="flex flex-wrap gap-2">
          <span className="text-label-3 text-typography-label">Trễ hạn:</span>
          <span className="text-body-3 text-typography-body">
            {humanizeDurationConfig(props.expired_time ?? 0)}
          </span>
        </p>
      )}
    </div>
  )
}
