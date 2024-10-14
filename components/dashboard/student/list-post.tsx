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
              <div className="flex gap-2 mx-2 max-w-[200px] overflow-hidden rounded-lg">
                <div className="flex gap-1 items-center bg-white py-[2px] px-1 rounded-lg text-typography-body text-label-3 shadow-sm">
                  <svg
                    color="#FFAB00"
                    fill="currentColor"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.5c0-.28.22-.5.5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm0 3c0-.28.22-.5.5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-8-.75c0-.41.34-.75.75-.75h3a.75.75 0 0 1 .75.75v.81c-.02.16-.1.58-.5.92-.33.29-.86.52-1.75.52C4 13 4 11.5 4 11.5v-.75ZM6.25 9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm4.25-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1.07 3.98c-.03.15-.1.33-.2.52h.27c.83 0 1.5-.67 1.5-1.5a1 1 0 0 0-1-1h-.67c.11.23.17.48.17.75V11.57a1.84 1.84 0 0 1-.07.4ZM4.5 4A2.5 2.5 0 0 0 2 6.5v7A2.5 2.5 0 0 0 4.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 4h-11ZM3 6.5C3 5.67 3.67 5 4.5 5h11c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 0 1 3 13.5v-7Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {post.local.name}
                </div>
                <div className="flex gap-1 items-center bg-white py-[2px] px-1 rounded-lg text-typography-body text-label-3 shadow-sm">
                  <svg
                    color="#0DB04B"
                    fill="currentColor"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3.5 4C2.67 4 2 4.67 2 5.5v7c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5h-11ZM3 5.5c0-.28.22-.5.5-.5H5v1a1 1 0 0 1-1 1H3V5.5ZM3 8h1a2 2 0 0 0 2-2V5h6v1c0 1.1.9 2 2 2h1v2h-1a2 2 0 0 0-2 2v1H6v-1a2 2 0 0 0-2-2H3V8Zm10-3h1.5c.28 0 .5.22.5.5V7h-1a1 1 0 0 1-1-1V5Zm2 6v1.5a.5.5 0 0 1-.5.5H13v-1a1 1 0 0 1 1-1h1ZM5 13H3.5a.5.5 0 0 1-.5-.5V11h1a1 1 0 0 1 1 1v1Zm12-.5a2.5 2.5 0 0 1-2.5 2.5H4.09c.2.58.76 1 1.41 1h9a3.5 3.5 0 0 0 3.5-3.5v-5c0-.65-.42-1.2-1-1.41v6.41Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {post.negotiable_salary === false
                    ? `${post.salary_min} - ${post.salary_max}`
                    : `Thỏa thuận`}
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
