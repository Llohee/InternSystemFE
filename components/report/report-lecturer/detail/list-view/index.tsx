import Avatar from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Pill } from '@/components/ui/pill'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useGetAllStudent } from '@/hooks/query/report-lecturer'
import { useFilterForReportLecturerStore } from '@/hooks/zustand/filter-for-report-lecturer'
import produce from 'immer'
import Link from 'next/link'
import { ReportListViewSkeleton } from '../skeleton'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { UserGetDetail } from '@/models/api'
import { useRouter } from 'next/router'
import { useGetAllStudentMutation } from '../../table/hook'
import { useQueryClient } from '@tanstack/react-query'
import { ScheduleKeys } from '@/hooks/query/schedule'

interface ReportLecturerProps {
  student_id: string
  showList: boolean
  setShowList: (b: boolean) => void
  profession: string
  group_id: string
}
const ReportLecturerListView = (props: ReportLecturerProps) => {
  const { showList, setShowList } = props
  const allStudent = useGetAllStudent(props.profession, props.group_id)
  const filterReportLecturer = useFilterForReportLecturerStore()
  const [userChoose, setUserChoose] = useState<UserGetDetail | undefined>(
    undefined
  )
  const mutation = useGetAllStudentMutation(userChoose)
  const router = useRouter()
  const queryClient = useQueryClient()

  return (
    <>
      <Button
        intent={'primary'}
        size={'medium'}
        className={`group bg-primary-base/60 ${
          showList ? 'flex lg:hidden' : 'hidden lg:flex'
        } !rounded-r-full !rounded-l-none !fixed left top-14 lg:top-[68px] z-50 shadow-2xl`}
        onClick={() => setShowList(!showList)}
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6"
        >
          <path
            d="M14.6654 2.77405H1.33203V3.88516H14.6654V2.77405Z"
            fill="white"
          />
          <path
            d="M14.6654 12.774H1.33203V13.8852H14.6654V12.774Z"
            fill="white"
          />
          <path
            d="M5.77648 9.44071H1.33203V10.5518H5.77648V9.44071Z"
            fill="white"
          />
          <path
            d="M5.77648 6.10738H1.33203V7.21849H5.77648V6.10738Z"
            fill="white"
          />
          <path
            d="M14.6654 8.3296L10.7765 4.99627V7.77405H6.88759V8.88516H10.7765V11.6629L14.6654 8.3296Z"
            fill="white"
          />
        </svg>
        <span className="hidden group-hover:block text-left">
          Tất cả sinh viên
        </span>
      </Button>
      <div
        className={`lg:relative h-full ${
          showList
            ? 'hidden lg:flex w-full'
            : 'flex lg:!hidden absolute top-0 left-0 z-[8888] max-w-[24rem]'
        }`}
      >
        <div className="w-full flex flex-col border-r border-grey-4 right-0 top-0 z-[8999] md:z-0 bg-white transition-all ease-in-out duration-100 pt-4">
          <div className="flex flex-col top-0 bg-white z-20 gap-3 items-start px-3 py-2">
            <div className="flex gap-2 items-center w-full">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => setShowList(!showList)}
              >
                <path
                  d="M14.6654 2.66663H1.33203V3.77774H14.6654V2.66663Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
                <path
                  d="M14.6654 12.6666H1.33203V13.7777H14.6654V12.6666Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
                <path
                  d="M14.6654 9.33329H10.2209V10.4444H14.6654V9.33329Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
                <path
                  d="M14.6654 5.99996H10.2209V7.11107H14.6654V5.99996Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
                <path
                  d="M1.33203 8.22218L5.22092 4.88885V7.66663H9.10981V8.77774H5.22092V11.5555L1.33203 8.22218Z"
                  fill="#00204D"
                  fill-opacity="0.6"
                />
              </svg>
              <div className="relative grow flex justify-between items-center">
                <div className="text-title-2 text-typography-label">
                  Tất cả sinh viên
                </div>
                <div className="relative">
                  {filterReportLecturer.filter.query &&
                    filterReportLecturer.filter.query.length > 0 && (
                      <div className="absolute -top-2 -right-2 text-subtitle-5 bg-primary-base text-grey-1 w-fit p-0.5 rounded-full z-10">
                        ({filterReportLecturer.filter.query.length})
                      </div>
                    )}
                  {/* <Tooltip
                    tootipDetail={
                      <div className="whitespace-nowrap">
                        {t('ticket.filter.modal.title')}
                      </div>
                    }
                    placementTootip="bottom-end"
                  >
                    <Button
                      intent={'grey'}
                      onClick={() => setIsShowFilterModal(true)}
                      className="required:"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                        />
                      </svg>
                    </Button>
                  </Tooltip> */}
                </div>
              </div>
            </div>
            <DebouncedInput
              placeholder={'Tìm kiếm học sinh'}
              className="!bg-primary-background/50 !border-0"
              value={filterReportLecturer.filter.name}
              onChange={(value) => {
                filterReportLecturer.update(
                  produce(filterReportLecturer.filter, (draftState: any) => {
                    draftState.name = value.toString()
                  })
                )
              }}
              icon={<SearchIcon />}
            />
            <div className="relative flex w-full gap-2 px-1">
              {/* <Menu>
                {({ open }) => (
                  <>
                    <div className="flex w-full items-center gap-1 text-label-3 cursor-pointer select-none">
                      <Menu.Button
                        as={'div'}
                        className="grow flex gap-2 items-center"
                      >
                        <Pill
                          intent={'primary'}
                          className={`${
                            filterReportLecturer.filter.sort[0]
                              ? `text-white bg-primary-base`
                              : `text-typography-label bg-grey-2`
                          }`}
                        >
                          {t('ticket.sortby')}:{' '}
                          <span className="text-label-4">
                            {t(
                              defautCOlTicketShow.find(
                                (e) =>
                                  e.id === filterReportLecturer.filter.sort[0]?.name
                              )
                                ? `ticket.tickets.${
                                    defautCOlTicketShow.find(
                                      (e) =>
                                        e.id ===
                                        filterReportLecturer.filter.sort[0]?.name
                                    )?.id
                                  }`
                                : 'ticket.filter.default.title'
                            )}
                          </span>
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
                        </Pill>
                      </Menu.Button>
                      <div
                        onClick={() => {
                          filterReportLecturer.update(
                            produce(
                              filterReportLecturer.filter,
                              (draftState: TicketFilterRequest) => {
                                if (draftState.sort[0])
                                  draftState.sort[0].type =
                                    !draftState.sort[0].type
                              }
                            )
                          )
                        }}
                      >
                        {filterReportLecturer.filter.sort[0] ? (
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              filterReportLecturer.filter.sort[0].type
                                ? 'rotate-180'
                                : ''
                            }`}
                          >
                            <path
                              d="M8.82 1.88437C8.78112 1.8393 8.73227 1.803 8.67694 1.77808C8.62161 1.75316 8.56118 1.74023 8.5 1.74023C8.43881 1.74023 8.37839 1.75316 8.32306 1.77808C8.26773 1.803 8.21888 1.8393 8.18 1.88437L4.58 6.46307C4.53543 6.51976 4.50829 6.58717 4.50162 6.65774C4.49495 6.72832 4.50901 6.79927 4.54223 6.86265C4.57545 6.92603 4.62652 6.97933 4.68971 7.01658C4.7529 7.05384 4.82572 7.07357 4.9 7.07357H12.1C12.1743 7.07357 12.2471 7.05384 12.3103 7.01658C12.3735 6.97933 12.4245 6.92603 12.4578 6.86265C12.491 6.79927 12.5051 6.72832 12.4984 6.65774C12.4917 6.58717 12.4646 6.51976 12.42 6.46307L8.82 1.88437Z"
                              fill="#366AE2"
                            />
                            <path
                              d="M8.18 14.9294C8.21888 14.9745 8.26773 15.0108 8.32306 15.0357C8.37839 15.0606 8.43881 15.0736 8.5 15.0736C8.56118 15.0736 8.62161 15.0606 8.67694 15.0357C8.73227 15.0108 8.78112 14.9745 8.82 14.9294L12.42 10.3507C12.4646 10.294 12.4917 10.2266 12.4984 10.1561C12.5051 10.0855 12.491 10.0145 12.4578 9.95115C12.4245 9.88778 12.3735 9.83447 12.3103 9.79722C12.2471 9.75997 12.1743 9.74023 12.1 9.74023H4.9C4.82572 9.74023 4.7529 9.75997 4.68971 9.79722C4.62652 9.83447 4.57545 9.88778 4.54223 9.95115C4.50901 10.0145 4.49495 10.0855 4.50162 10.1561C4.50829 10.2266 4.53543 10.294 4.58 10.3507L8.18 14.9294Z"
                              fill="#00204D"
                              fill-opacity="0.4"
                            />
                          </svg>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-10 left-0 top-3 mt-5 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none p-1">
                        <Menu.Item
                          as={'div'}
                          onClick={() =>
                            filterReportLecturer.update(
                              produce(
                                filterReportLecturer.filter,
                                (draftState: TicketFilterRequest) => {
                                  draftState.sort = []
                                }
                              )
                            )
                          }
                          className={` group w-full flex items-end px-2 py-2 text-button-3 hover:bg-grey-3 text-typography-label ${''}  whitespace-nowrap cursor-pointer`}
                        >
                          ({t('ticket.filter.default.title')})
                        </Menu.Item>
                        {defautCOlTicketShow.map((item, index) => (
                          <Menu.Item
                            as={'div'}
                            key={index}
                            onClick={() =>
                              filterReportLecturer.update(
                                produce(
                                  filterReportLecturer.filter,
                                  (draftState: TicketFilterRequest) => {
                                    draftState.sort = [
                                      { name: item.id, type: false },
                                    ]
                                  }
                                )
                              )
                            }
                            className={` group w-full flex items-end px-2 text-right py-2 text-button-3 hover:bg-grey-3 text-typography-label ${
                              item.id === filterReportLecturer.filter.sort[0]?.name
                                ? 'bg-grey-4'
                                : ''
                            }  whitespace-nowrap cursor-pointer`}
                          >
                            {t(`ticket.tickets.${item.id}`)}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu> */}
            </div>
          </div>
          <div className="grow h-[calc(100vh_-_18rem)] md:h-[calc(100vh_-_12rem)] overflow-auto">
            <div className="h-full">
              {allStudent.status === 'loading' && <ReportListViewSkeleton />}
              {allStudent.status === 'success' &&
                allStudent.data.data.length <= 0 && (
                  <div className="w-full h-full flex justify-center items-center">
                    Không có dữ liệu
                  </div>
                )}
              {allStudent.status === 'success' && (
                <>
                  {allStudent.data.data.map((stu, index) => (
                    // <Link
                    //   href={`/report/lecturer/${stu.id}`}
                    //   onClick={() => setShowList(true)}
                    //   key={index}
                    //   className={`group flex py-4 px-6 justify-start text-body-3 gap-2 hover:bg-primary-hover/10 ${
                    //     props.student_id === stu.id && 'bg-primary-base/10'
                    //   }`}
                    // >
                    <button
                      onClick={async () => {
                        mutation.mutate(undefined, {
                          onError: (error) => {
                            toast(
                              'Ứng viên này chưa ở trong nhóm, hãy liên hệ nhà trường để được hỗ trợ !',
                              {
                                icon: (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5 text-secondary1-base"
                                  >
                                    <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                                  </svg>
                                ),
                                id: 'noti-alert-variant',
                              }
                            )
                          },
                          onSuccess: () => {
                            router.push(
                              `/report/lecturer/${stu?.id}?profession=${props.profession}&group_id=${props.group_id}`
                            )
                            queryClient.removeQueries(
                              ScheduleKeys.getScheduleByLecturer()
                            )
                          },
                        })
                        setUserChoose(stu)
                      }}
                      className={`group flex py-4 px-6 justify-start items-center text-body-3 gap-4 hover:bg-primary-hover/10 w-full ${
                        props.student_id === stu.id && 'bg-primary-base/10'
                      }`}
                    >
                      <div className="py-2">
                        <Tooltip
                          tootipDetail={stu.fullname}
                          placementTootip="auto-start"
                          dark
                        >
                          <Avatar name={stu.fullname ?? ''} size={'medium'} />
                        </Tooltip>
                      </div>
                      <div className="flex flex-col gap-3 group">
                        <div className="h-12 w-full">
                          <Tooltip
                            tootipDetail={
                              <div className="line-clamp-2 w-52">
                                {stu.fullname}
                              </div>
                            }
                            placementTootip="auto-start"
                          >
                            <div
                              className={`relative py-0.5 flex flex-col overflow-hidden h-fit ${
                                props.student_id === stu.id &&
                                'text-primary-base'
                              }`}
                            >
                              <div
                                className="text-left text-body-2  group-hover:underline group-hover:underline-offset-1"
                                // style={{
                                //   textIndent: `${
                                //     stu.id_number?.length < 6
                                //       ? stu.id_number?.length * 4.25 + 58
                                //       : stu.id_number?.length * 5 + 58
                                //   }px`,
                                // }}
                              >
                                {stu.fullname}
                              </div>
                              <Pill intent="primary" className="shadow">
                                ID: {stu?.id_number ?? ''}
                              </Pill>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </button>
                    // </Link>
                  ))}
                </>
              )}
            </div>
          </div>
          {allStudent.status === 'success' && (
            <div className="w-full flex bg-grey-1 py-2 justify-center">
              <div>
                <Pagination
                  changePage={(e) => {
                    filterReportLecturer.update(
                      produce(
                        filterReportLecturer.filter,
                        (draftState: any) => {
                          draftState.page = e - 1
                        }
                      )
                    )
                  }}
                  pageCurrent={allStudent.data.page + 1}
                  totalPage={allStudent.data.total_page}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default ReportLecturerListView
