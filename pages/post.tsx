import { AllUserAuth } from '@/components/auth/page-auth'
import CustomPost from '@/components/custom-post'
import { MainLayout } from '@/components/layout'
import PostWrapper from '@/components/post'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { NextPageWithAuthLayout } from '@/pages/_app'

const PostPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <div className="relative">
        <ListTab
          titles={[
            {
              title: 'Bài đăng',
              node: <PostWrapper />,
            },
            {
              title: 'Đề tài',
              node: <CustomPost />,
            },
          ]}
        />
      </div>
    </>
  )
}
PostPage.Layout = MainLayout
PostPage.Auth = AllUserAuth
PostPage.title = 'Quản lý bài đăng'

export default PostPage
