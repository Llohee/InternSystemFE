import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewTitle,
} from '../ui/empty-view'
import { ErrorIcon } from '../ui/icon/empty'

const PageError = (props: { title?: string; discription?: string }) => {
  return (
    <>
      <EmptyView className="!h-fit" intent="transparent-background">
        <ErrorIcon className="-mb-6" />
        <EmptyViewTitle>{props.title ?? 'Lỗi hệ thống'}</EmptyViewTitle>
        <EmptyViewDescription>{props.discription ?? ''}</EmptyViewDescription>
      </EmptyView>
    </>
  )
}

export default PageError
