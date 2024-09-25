import { useGetAllSysNotification } from '@/hooks/query/notification'
import { ListTab } from '../ui/list-tab/list-tab'
import NotiData from './noti-data'
import { SingleNotiSkeleton } from '../ui/skeleton'

const NotiDataWrapper = () => {
  const getAllSysNotification = useGetAllSysNotification()
  if (getAllSysNotification.status === 'error') return <></>
  if (getAllSysNotification.status === 'loading')
    return (
      <div className="p-3 h-[430px] overflow-hidden">
        <div className="animate-pulse bg-grey-2 rounded-lg h-8" />
        <div className="mt-4 flex flex-col gap-6">
          {[...Array(5)].map((_, index) => (
            <SingleNotiSkeleton />
          ))}
        </div>
      </div>
    )
  return (
    <div className="relative">
      <ListTab
        titles={[
          {
            title: 'Tất cả',
            node: (
              <NotiData
                getAllSysNotification={getAllSysNotification}
                notiData={getAllSysNotification.data}
              />
            ),
          },
        ]}
        tabPadding="px-3"
        // selectedIndex={selectedTab}
        // onChange={setSelectedTab}
      />
    </div>
  )
}

export default NotiDataWrapper
