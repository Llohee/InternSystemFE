import { LayoutProps } from '@/pages/_app'
import MetaHeader from './meta-header'

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <>
      <MetaHeader />
      {children}
    </>
  )
}
