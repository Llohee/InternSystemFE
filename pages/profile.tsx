import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { AllUserAuth } from '@/components/auth/page-auth'
import ProfileWrapper from '@/components/profile'

const ProfilePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <ProfileWrapper />
    </>
  )
}

ProfilePage.Layout = MainLayout
ProfilePage.Auth = AllUserAuth
ProfilePage.title = 'Thông tin người dùng'
export default ProfilePage
