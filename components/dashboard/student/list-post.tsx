import { Pagination } from '@/components/ui/pagination/pagination'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useFilterForPostStore } from '@/hooks/zustand/filter-for-post'
import { GetAllPostResponse } from '@/models/api'
import produce from 'immer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ListPost = (props: { getAllPost: GetAllPostResponse }) => {
  const [data, setData] = useState(() => [...props.getAllPost.data])
  const filterPost = useFilterForPostStore()
  useEffect(() => {
    setData([...props.getAllPost.data])
  }, [props.getAllPost])
  return (
    <>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {props.getAllPost.data.map((post) => (
          <div className="bg-grey-1 h-[110px] col-span-1 flex gap-2 overflow-hidden p-3 rounded-lg hover:bg-grey-2 hover:shadow-md">
            <Image
              src={post.business.image_url}
              alt=""
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-2 truncate">
              <div className="">
                <div className="truncate text-typography-title text-heading-6">
                  {post.position.name}
                </div>
                <Tooltip
                  placementTootip={'bottom-start'}
                  tootipDetail={<>{post.business.name}</>}
                >
                  <div className="cursor-pointer truncate text-typography-body text-body-3">
                    {post.business.name}
                  </div>
                </Tooltip>
              </div>
              <div className="flex gap-2 mx-2">
                <div className="bg-white py-[2px] px-1 rounded-lg text-typography-body text-label-3">
                  {post.local.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 py-4 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterPost.update(
              produce(filterPost.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllPost.page + 1}
          totalPage={props.getAllPost.total_page}
          label={
            props.getAllPost.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllPost.page * filterPost.filter.limit + 1}-
                {props.getAllPost.page * filterPost.filter.limit + data.length}{' '}
                trên tổng {props.getAllPost.total}
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

export default ListPost
