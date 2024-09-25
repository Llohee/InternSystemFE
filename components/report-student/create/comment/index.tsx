import { DATE_TIME_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewTitle,
} from '@/components/ui/empty-view'
import { NoMessagesIcon } from '@/components/ui/icon/empty'
import { Input } from '@/components/ui/input/input'
import { Pagination } from '@/components/ui/pagination/pagination'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetUserDetail } from '@/hooks/query/auth'
import { ErrorResponse } from '@/models/api'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useReportCommentCreate } from './hook'
import { Divider } from 'antd'
import { Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Avatar from '@/components/ui/avatar/avatar'
import { Editor } from '@/components/ui/editor/editor'
import { useGetReportComments } from '@/hooks/query/report-lecturer'

interface ReportCommentProps {
  closeModal: () => void
  ReportId: string
  module: string
}

const ReportComment = (props: ReportCommentProps) => {
  const getUserDetail = useGetUserDetail()
  const { createComment, handleFormSubmit, mutation } = useReportCommentCreate(
    props.ReportId,
    props.module
  )
  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '').trim()
  }
  const getReportComments = useGetReportComments(props.ReportId)
  return (
    <div className="px-6 py-4 flex flex-col gap-3">
      <form
        className="flex gap-3 w-full border-b border-border-2 pb-2.5"
        onSubmit={createComment.handleSubmit(handleFormSubmit)}
      >
        {/* <Avatar name={getUserDetail.data.fullname} /> */}
        <div className="grow flex flex-col gap-2">
          <Controller
            control={createComment.control}
            name="content"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Editor
                register={createComment.register}
                name="content"
                value={value}
                onChange={(data) => {
                  if (removeHtmlTags(data).length <= 0) onChange('')
                  else onChange(data)
                }}
                intent={error ? 'error' : 'default'}
                required
                placeholder={'Thêm bình luận'}
              />
            )}
          />

          {createComment.formState.errors.content && (
            <div className="text-error-base text-caption-2">
              Vui lòng nhập bình luận
            </div>
          )}

          {mutation.isError && (
            <div className="flex gap-2 items-center italic text-error-base text-caption-2">
              {(mutation.error.response?.data as ErrorResponse)?.description ??
                mutation.error.response}
            </div>
          )}
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" posting={mutation.isLoading}>
              Bình luận
            </Button>
          </div>
        </div>
        <DevTool control={createComment.control} />
      </form>
      <div className="flex flex-col gap-4 h-[calc(100vh-28.5rem)] overflow-auto">
        {getReportComments.status === 'loading' && (
          <TableSkeleton numberRow={6} />
        )}
        {getReportComments.data?.length === 0 && (
          <EmptyView intent="transparent-background">
            <NoMessagesIcon />
            <EmptyViewTitle>Chưa có bình luận</EmptyViewTitle>
            <EmptyViewDescription>
              Tạo bình luận mới để bắt đầu cuộc trò chuyện!
            </EmptyViewDescription>
          </EmptyView>
        )}
        {getReportComments.data?.map((item) => {
          return (
            item.content &&
            item.content.length > 0 && (
              <div
                className={`px-4 flex gap-2 rounded-md hover:bg-grey-2 py-1
              ${
                getUserDetail.data.id === item.creator.id
                  ? 'flex-row-reverse text-right'
                  : 'items-start'
              }
              `}
              >
                <Avatar
                  size="xs"
                  name={item.creator.fullname ?? item.creator.email ?? ''}
                />
                <div className="flex flex-col gap-1">
                  <div
                    className={`flex gap-2 items-center ${
                      getUserDetail.data.id === item.creator.id
                        ? 'flex-row-reverse'
                        : ''
                    }`}
                  >
                    <span className="text-title-5 text-typography-title">
                      {item.creator.fullname}
                    </span>
                    <p className="text-caption-3 text-typography-subtitle/50 pt-[1px]">
                      {dayjs(item.created_time).format(DATE_TIME_FORMAT_VIEW)}
                    </p>
                  </div>
                  <div
                    className="text-body-3 text-typography-body w-full"
                    dangerouslySetInnerHTML={{ __html: item.content ?? '' }}
                  />
                </div>
              </div>
            )
          )
        })}
      </div>
      {/* <div className="flex gap-2 items-start mt-1">
        <Avatar size="xs" name={ReportTicket.created_by.fullname} />
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1">
            <span className="text-title-5 text-typography-title">
              {ReportTicket.created_by.fullname}
            </span>
            <span className="text-body-3 text-typography-body">
              tạo mới công việc
            </span>
          </div>
          <p className="text-caption-2 text-typography-subtitle">
            {dayjs(ReportTicket.created_time).format(DATE_TIME_FORMAT_VIEW)}
          </p>
        </div>
      </div> */}
      {/* {getReportComments.data && (
        <div
          className={`visible ${
            getReportComments.data.total_page <= 1 && 'invisible'
          }`}
        >
          <Pagination
            changePage={(e) => {
              setCurrentPage(e - 1)
            }}
            pageCurrent={getReportComments.data.page + 1}
            totalPage={getReportComments.data.total_page}
            isPreviousData={getReportComments.isPreviousData}
          ></Pagination>
        </div>
      )}
      <CreateUpdateInfo
        created_by={ReportTicket.created_by.fullname}
        created_time={ReportTicket.created_time}
        updated_by={ReportTicket?.updated_by}
        updated_time={ReportTicket?.updated_time}
      /> */}
    </div>
  )
}

export default ReportComment
