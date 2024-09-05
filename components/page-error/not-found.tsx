import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button/button'
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewTitle,
} from '../ui/empty-view'
import { ErrorIcon } from '../ui/icon/empty'

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      <EmptyView textSize="extra" intent="transparent-background">
        <ErrorIcon className="w-full max-w-[450px] h-[378px] -mb-12 -mt-40" />
        <EmptyViewTitle>404 ERROR!</EmptyViewTitle>
        <EmptyViewDescription>
          Không tồn tại hoặc bạn không có quyền truy cập vào trang này!
        </EmptyViewDescription>
        <Link href="/dashboard" className="mt-8" passHref>
          <Button size="large" bounce>
            Quay về trang chủ
          </Button>
        </Link>
      </EmptyView>
    </div>
  )
}

export default NotFoundPage
