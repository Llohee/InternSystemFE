import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import PostWrapper from '@/components/post'
import { NextPageWithAuthLayout } from '@/pages/_app'

const PostPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <PostWrapper />
    </>
  )
}
PostPage.Layout = MainLayout
PostPage.Auth = AllUserAuth
PostPage.title = 'Quản lý bài đăng'

export default PostPage
