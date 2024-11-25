import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import MajorWrapper from '@/components/major'
import { NextPageWithAuthLayout } from '@/pages/_app'

const MajorPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <MajorWrapper />
    </>
  )
}
MajorPage.Layout = MainLayout
MajorPage.Auth = AllUserAuth
MajorPage.title = 'Khoa - Ngành - Viện - Lớp'

export default MajorPage
