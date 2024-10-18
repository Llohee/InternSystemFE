import { AllUserAuth } from '@/components/auth/page-auth'
import PostDetailWrapper from '@/components/dashboard/student/detail'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

const PostDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId } = router.query
  return (
    <>
      {slugId ? (
        <PostDetailWrapper id={slugId as string} />
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
PostDetailPage.Layout = MainLayout
PostDetailPage.Auth = AllUserAuth
PostDetailPage.title = ''

export default PostDetailPage
