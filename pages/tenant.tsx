import { AllUserAuth } from '@/components/auth/page-auth'
import BusinessWrapper from '@/components/business'
import { MainLayout } from '@/components/layout'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import UniversityWrapper from '@/components/university'
import { NextPageWithAuthLayout } from '@/pages/_app'

const TenantPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <div className="relative">
        <ListTab
          titles={[
            {
              title: 'Nhà trường',
              node: <UniversityWrapper type="university" />,
            },
            {
              title: 'Doanh nghiệp',
              node: <BusinessWrapper type="business" />,
            },
          ]}
        />
      </div>
    </>
  )
}
TenantPage.Layout = MainLayout
TenantPage.Auth = AllUserAuth
TenantPage.title = 'Hệ thống'

export default TenantPage
