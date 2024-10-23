import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { ActivityDetail, PostDetail } from '@/models/api'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import PostHistoryItem from './post-history-item'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Button } from '@/components/ui/button/button'
interface DayActivity {
  day: string
  activities: ActivityDetail[]
}
const PostHistory = (props: {
  postDetail: PostDetail
  closeModal: () => void
}) => {
  const [dayActivities, setDayActivities] = useState<DayActivity[]>()
  useEffect(() => {
    let arrActivities = props.postDetail.activities.slice().reverse()
    const arrDayActivities: DayActivity[] = arrActivities.reduce<DayActivity[]>(
      (result, obj) => {
        const date = dayjs(obj.time).format('YYYY-MM-DD')

        const dayActivity = result.find((item) => item.day === date)
        if (dayActivity) {
          dayActivity.activities.push(obj)
        } else {
          result.push({
            day: date,
            activities: [obj],
          })
        }

        return result
      },
      []
    )
    setDayActivities(arrDayActivities)
  }, [props.postDetail.activities])
  return (
    <>
      <ContainerFormBody>
        <ol className="flex flex-col relative h-fit gap-5 list-none">
          {dayActivities &&
            dayActivities.map((val, index) => (
              <Disclosure
                key={index}
                as="li"
                defaultOpen={index === 0}
                className="border border-grey-2"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton
                      as="div"
                      className="flex items-center font-bold gap-2 text-typography-subtitle text-label-3 bg-grey-1 p-3 select-none cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-4 h-4 transition ease-in-out duration-100 ${
                          open ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                      <span>{dayjs(val.day).format(DATE_FORMAT_VIEW)}</span>
                    </DisclosureButton>
                    <DisclosurePanel
                      as="div"
                      className="flex flex-col gap-5 px-3 py-2"
                    >
                      {val.activities.map((activity, index) => (
                        <div key={index} className=" flex flex-col">
                          <PostHistoryItem activity={activity} />
                        </div>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
        </ol>
      </ContainerFormBody>
      <ContainerFormFooter>
        <Button
          btnStyle={'no-background'}
          intent={'grey'}
          onClick={props.closeModal}
        >
          Đóng
        </Button>
      </ContainerFormFooter>
    </>
  )
}

export default PostHistory
