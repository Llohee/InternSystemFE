import { AllUserAuth } from '@/components/auth/page-auth'
import { MainLayout } from '@/components/layout'
import LinkWrapper from '@/components/link'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { NextPageWithAuthLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LinkPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { type, is_readed, university_id } = router.query
  const [selectedTab, onChangeSelectedTab] = useState(
    type === 'REQUEST' &&
      is_readed === 'false' &&
      typeof university_id === 'string'
      ? 2
      : 0
  )
  return (
    <div className="relative">
      <ListTab
        selectedIndex={selectedTab}
        onChange={onChangeSelectedTab}
        titles={[
          {
            title: 'Đã liên kết',
            node: <LinkWrapper type="link" />,
          },
          {
            title: 'Chưa liên kết',
            node: <LinkWrapper type="" />,
          },
        ]}
      />
    </div>
  )
}
LinkPage.Layout = MainLayout
LinkPage.Auth = AllUserAuth
LinkPage.title = 'Danh sách liên kết'

export default LinkPage
