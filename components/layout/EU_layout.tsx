// import { Footer } from '@/components/common/footer'
import { LayoutProps } from '@/pages/_app'
import MetaHeader from './meta-header'

export function EULayout({ children }: LayoutProps) {
  return (
    <div className="bg-grey-3 flex flex-col lg:flex-row h-screen ">
      <MetaHeader />

      <div
        id="body-overflow"
        className="flex-1 lg:h-full lg:mt-0 h-body rounded-t-md "
      >
        <div className="flex flex-col grow h-screen md:min-h-screen bg-grey-1">
          <div className="grow">{children}</div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
}
