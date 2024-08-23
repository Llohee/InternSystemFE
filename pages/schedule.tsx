import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import ScheduleWrapper from '@/components/schedule'
import { NextPageWithAuthLayout } from '@/pages/_app'

const SchedulePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <ScheduleWrapper />
    </>
  )
}
SchedulePage.Layout = MainLayout
SchedulePage.Auth = AllUserAuth
SchedulePage.title = 'Cấu hình mốc thời gian'

export default SchedulePage
