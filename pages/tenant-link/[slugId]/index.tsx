import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import NotFoundPage from '@/components/page-error/not-found'
import TenantDetailWrapper from '@/components/tenant/tenant-detail'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

const TenantDetailPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { slugId } = router.query
  const { tenant_code } = useParams()
  return (
    <>
      {slugId ? (
        <TenantDetailWrapper
          id={slugId as string}
          tenant_code={tenant_code as string}
        />
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
TenantDetailPage.Layout = MainLayout
TenantDetailPage.Auth = AllUserAuth
TenantDetailPage.title = 'Đã liên kết'

export default TenantDetailPage
