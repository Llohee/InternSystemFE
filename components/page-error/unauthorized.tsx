import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../ui/button/button'
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewTitle,
} from '../ui/empty-view'
import { ErrorIcon } from '../ui/icon/empty'

const UnauthorizedPage = () => {
  return (
    <>
      <Head>
        <title>Không thể truy cập</title>
      </Head>
      <div className="h-screen">
        <EmptyView textSize="extra" intent="transparent-background">
          <ErrorIcon className="w-full max-w-[450px] h-[378px] -mb-12 -mt-40" />
          <EmptyViewTitle>401 ERROR!</EmptyViewTitle>
          <EmptyViewDescription>
            Không có quyền truy cập vào trang này!
          </EmptyViewDescription>
          <Link href="/dashboard" className="mt-8" passHref>
            <Button size="large" bounce>
              Quay về trang chủ
            </Button>
          </Link>
        </EmptyView>
      </div>
    </>
  )
}

export default UnauthorizedPage
