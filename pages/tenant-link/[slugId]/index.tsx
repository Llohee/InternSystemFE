import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import PostWrapper from '@/components/post'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

const TenantDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId } = router.query
  // const { tenant_name, tenant_code } = useParams()
  return (
    <>
      {slugId ? (
        <div className="relative">
          <ListTab
            titles={[
              {
                title: 'Bài đăng',
                node: <PostWrapper />,
              },
              {
                title: 'Đề tài',
                node: <PostWrapper />,
              },
            ]}
          />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
TenantDetailPage.Layout = MainLayout
TenantDetailPage.Auth = AllUserAuth
// TenantDetailPage.nonePadding = false
TenantDetailPage.title = 'Đã liên kết'

export default TenantDetailPage
