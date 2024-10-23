import { ListTab } from '@/components/ui/list-tab/list-tab'
import TenantDetailPost from './post'

const TenantDetailWrapper = (props: { id: string; tenant_code: string }) => {
  return (
    <>
      <ListTab
        titles={[
          {
            title: 'Bài đăng',
            node: <TenantDetailPost tenant_id={props.id} tenant_code={props.tenant_code}/>,
          },
          {
            title: 'Đề tài',
            node: <TenantDetailPost tenant_id={props.id} tenant_code={props.tenant_code}/>,
          },
        ]}
      />
    </>
  )
}

export default TenantDetailWrapper
