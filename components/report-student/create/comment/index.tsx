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
import { useState } from 'react'
import { useReportCommentCreate } from './hook'
import { Divider } from 'antd'
import { Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Avatar from '@/components/ui/avatar/avatar'
import { Editor } from '@/components/ui/editor/editor'

interface ReportCommentProps {
  closeModal: () => void
  ReportId: string
  module: string
  getReportComments: any[]
}

const ReportComment = (props: ReportCommentProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const getUserDetail = useGetUserDetail()
  const { createComment, handleFormSubmit, mutation } = useReportCommentCreate(
    props.ReportId,
    props.module
  )
  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '').trim()
  }
  return (
    <div className="px-6 py-4 flex flex-col gap-3">
      <form
        className="flex gap-3 w-full border-b border-border-2 pb-2.5"
        onSubmit={createComment.handleSubmit(handleFormSubmit)}
      >
        <Avatar name={getUserDetail.data.fullname} />
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
        {props.getReportComments?.length === 0 && (
          <EmptyView intent="transparent-background">
            <NoMessagesIcon />
            <EmptyViewTitle>Chưa có bình luận</EmptyViewTitle>
            <EmptyViewDescription>
              Tạo bình luận mới để bắt đầu cuộc trò chuyện!
            </EmptyViewDescription>
          </EmptyView>
        )}
        {props.getReportComments?.map((item) => {
          return (
            item.content &&
            item.content.length > 0 && (
              <div className="flex gap-2 items-start">
                <Avatar
                  size="xs"
                  name={item.creator.fullname ?? item.creator.email ?? ''}
                />
                <div className="flex flex-col gap-1.5">
                  <span className="text-title-5 text-typography-title">
                    {item.creator.fullname}
                  </span>
                  <div
                    className=" text-body-3 text-typography-body w-full"
                    dangerouslySetInnerHTML={{ __html: item.content ?? '' }}
                  />
                  <p className="text-caption-2 text-typography-subtitle">
                    {dayjs(item.created_time).format(DATE_TIME_FORMAT_VIEW)}
                  </p>
                </div>
              </div>
            )
          )
        })}
      </div>
      {/* <div className="flex gap-2 items-start mt-1">
        <Avatar size="xs" name={props.ReportTicket.created_by.fullname} />
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1">
            <span className="text-title-5 text-typography-title">
              {props.ReportTicket.created_by.fullname}
            </span>
            <span className="text-body-3 text-typography-body">
              tạo mới công việc
            </span>
          </div>
          <p className="text-caption-2 text-typography-subtitle">
            {dayjs(props.ReportTicket.created_time).format(DATE_TIME_FORMAT_VIEW)}
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
        created_by={props.ReportTicket.created_by.fullname}
        created_time={props.ReportTicket.created_time}
        updated_by={props.ReportTicket?.updated_by}
        updated_time={props.ReportTicket?.updated_time}
      /> */}
    </div>
  )
}

export default ReportComment
