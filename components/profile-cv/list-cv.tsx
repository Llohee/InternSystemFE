import { GetAllCVResponse } from '@/models/api'
import CreateCV from './modal/create-cv'
import { Fragment, useEffect, useState } from 'react'
import { useFilterForCVStore } from '@/hooks/zustand/filter-for-profile-cv'
import { Pagination } from '../ui/pagination/pagination'
import produce from 'immer'
import { Button } from '../ui/button/button'
import dayjs from 'dayjs'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { AnimatePresence, easeOut, motion } from 'framer-motion'

const ListCV = (props: { getAllCV: GetAllCVResponse }) => {
  const [data, setData] = useState(() => [...props.getAllCV.data])
  const filterCV = useFilterForCVStore()
  useEffect(() => {
    setData([...props.getAllCV.data])
  }, [props.getAllCV])
  return (
    <div className="bg-grey-1 flex flex-col gap-6 my-4 px-6 py-4 transition-all ease-in-out duration-500">
      <Disclosure as="div" className="flex flex-col gap-6">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center">
              <div className="text-title-2">Danh sách CV</div>
              <DisclosureButton className="">
                {!open && (
                  <Button intent="primary" size="medium">
                    Tạo mới
                  </Button>
                )}
              </DisclosureButton>
            </div>
            <div className="flex gap-4 overflow-y-auto">
              {props.getAllCV.data.map((cv) => (
                <div className=" bg-white drop-shadow-sm px-3 py-4 rounded-md hover:cursor-pointer group">
                  <div className="flex gap-2 items-center group-hover:underline group-hover:underline-offset-1">
                    <div className="text-title-3">Tên CV:</div>
                    <div className="">{cv.title}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-title-3">Ngày tạo:</div>
                    <div className="">
                      {dayjs(cv.created_time).format('DD/MM/YYYY')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-border-2 justify-end">
              <Pagination
                changePage={(e) => {
                  filterCV.update(
                    produce(filterCV.filter, (draftState: any) => {
                      draftState.page = e - 1
                    })
                  )
                }}
                pageCurrent={props.getAllCV.page + 1}
                totalPage={props.getAllCV.total_page}
                label={
                  props.getAllCV.total > 0 ? (
                    <div className="hidden md:block">
                      {props.getAllCV.page * filterCV.filter.limit + 1}-
                      {props.getAllCV.page * filterCV.filter.limit +
                        data.length}{' '}
                      trên tổng {props.getAllCV.total}
                    </div>
                  ) : (
                    <></>
                  )
                }
                showGotoPageInput
              ></Pagination>
            </div>
            <div className="overflow-hidden py-2">
              <AnimatePresence>
                {open && (
                  <DisclosurePanel static as={Fragment}>
                    <motion.div
                      initial={{ opacity: 0, y: -24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      className="origin-top"
                    >
                      <CreateCV />
                    </motion.div>
                  </DisclosurePanel>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default ListCV
