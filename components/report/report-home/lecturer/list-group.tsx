import { Pagination } from '@/components/ui/pagination/pagination'
import { useFilterForGroupStore } from '@/hooks/zustand/filter-for-group'
import { GetAllGroupResponse } from '@/models/api'
import produce from 'immer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ListGroup = (props: { allGroup: GetAllGroupResponse }) => {
  const [data, setData] = useState(() => [...props.allGroup.data])
  const filterGroup = useFilterForGroupStore()
  useEffect(() => {
    setData([...props.allGroup.data])
  }, [props.allGroup])
  const router = useRouter()

  return (
    <>
      <div className="h-table-taller flex flex-col gap-6">
        {props.allGroup.data.map((val) => (
          <div
            className="bg-grey-1 col-span-1 flex gap-2 px-3 py-4 rounded-lg hover:bg-grey-2 transition-all ease-in-out duration-150 hover:shadow-[0_0_5px_0px_rgba(77,122,229,0.4)] relative hover:cursor-pointer border border-grey-2 hover:border-border-2"
            onClick={() => router.push(`/report/lecturer?group_id=${val.id}`)}
          >
            <div className="flex flex-col justify-between gap-2 truncate">
              <div className="">
                <div className="truncate text-typography-title text-heading-6 group">
                  {val.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterGroup.update(
              produce(filterGroup.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.allGroup.page + 1}
          totalPage={props.allGroup.total_page}
          label={
            props.allGroup.total > 0 ? (
              <div className="hidden md:block">
                {props.allGroup.page * filterGroup.filter.limit + 1}-
                {props.allGroup.page * filterGroup.filter.limit + data.length}
                trên tổng {props.allGroup.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
        ></Pagination>
      </div>
    </>
  )
}

export default ListGroup
