import { Pagination } from '@/components/ui/pagination/pagination'
import { useFilterForProfessionsStore } from '@/hooks/zustand/filter-for-post'
import { GetAllProfessionResponse } from '@/models/api'
import produce from 'immer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ListProfession = (props: { allProfession: GetAllProfessionResponse }) => {
  const [data, setData] = useState(() => [...props.allProfession.data])
  const filterProfession = useFilterForProfessionsStore()
  useEffect(() => {
    setData([...props.allProfession.data])
  }, [props.allProfession])
  const router = useRouter()

  return (
    <>
      <div>
        {props.allProfession.data.map((val) => (
          <div
            className="bg-grey-1 col-span-1 flex gap-2 px-3 py-4 rounded-lg hover:bg-grey-2 transition-all ease-in-out duration-150 hover:shadow-[0_0_5px_0px_rgba(77,122,229,0.4)] relative hover:cursor-pointer border border-grey-2 hover:border-border-2"
            onClick={() =>
              router.push(`/report/lecturer?profession=${val.id}`)
            }
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
            filterProfession.update(
              produce(filterProfession.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.allProfession.page + 1}
          totalPage={props.allProfession.total_page}
          label={
            props.allProfession.total > 0 ? (
              <div className="hidden md:block">
                {props.allProfession.page * filterProfession.filter.limit + 1}-
                {props.allProfession.page * filterProfession.filter.limit +
                  data.length}
                trên tổng {props.allProfession.total}
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

export default ListProfession
