import Group from '@/components/group'
import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const GroupPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Group />
    </>
  )
}
GroupPage.Layout = MainLayout
GroupPage.Auth = AllUserAuth
GroupPage.title = 'Quản lý nhóm'

export default GroupPage
