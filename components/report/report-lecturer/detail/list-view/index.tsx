import Avatar from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Pill } from '@/components/ui/pill'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useGetAllReportLecturer } from '@/hooks/query/report-lecturer'
import { useFilterForReportLecturerStore } from '@/hooks/zustand/filter-for-report-lecturer'
import produce from 'immer'
import Link from 'next/link'
import { ReportListViewSkeleton } from '../skeleton'

interface ReportLecturerProps {
  idLecturer: string
  showList: boolean
  setShowList: (b: boolean) => void
  profession: string
}
const ReportLecturerListView = (props: ReportLecturerProps) => {
  const { showList, setShowList } = props
  const allReportLecturer = useGetAllReportLecturer(props.profession)
  const filterReportLecturer = useFilterForReportLecturerStore()

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
          {/* {t(
            `ticket.filter.default.${
              defautFilterTicket.find(
                (e) =>
                  e === filterReportLecturer.filter.defaultQuery ||
                  (!Boolean(filterReportLecturer.filter.defaultQuery) && e === 'all')
              ) ?? 'all'
            }`
          )} */}
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
              {allReportLecturer.status === 'loading' && (
                <ReportListViewSkeleton />
              )}
              {allReportLecturer.status === 'success' &&
                allReportLecturer.data.data.length <= 0 && (
                  <div className="w-full h-full flex justify-center items-center">
                    Không có dữ liệu
                  </div>
                )}
              {allReportLecturer.status === 'success' && (
                <>
                  {allReportLecturer.data.data.map((LecturerId, index) => (
                    <Link
                      href={`/report/lecturer/${LecturerId.id}`}
                      onClick={() => setShowList(true)}
                      key={index}
                      className={`group flex py-4 px-6 justify-start text-body-3 gap-2 hover:bg-primary-hover/10 ${
                        props.idLecturer === LecturerId.id &&
                        'bg-primary-base/10'
                      }`}
                    >
                      <div className="py-2">
                        <Tooltip
                          tootipDetail={
                            LecturerId.fullname ?? 'Sinh viên: Chưa xác định'
                          }
                          placementTootip="auto-start"
                          dark
                        >
                          <Avatar name={LecturerId.fullname ?? ''} />
                        </Tooltip>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="h-12 w-full">
                          <Tooltip
                            tootipDetail={
                              <div className="line-clamp-2 w-52">
                                {LecturerId.fullname}
                              </div>
                            }
                            placementTootip="auto-start"
                          >
                            <div
                              className={`relative py-0.5 flex flex-wrap gap-1 overflow-hidden h-fit ${
                                props.idLecturer === LecturerId.id &&
                                'text-primary-base'
                              }`}
                            >
                              {/* <Pill
                                intent="primary"
                                className="shadow absolute top-0"
                              >
                                {LecturerId?.code ?? ''}
                              </Pill> */}
                              <div
                                className="line-clamp-2"
                                style={{
                                  textIndent: `${
                                    LecturerId.code?.length < 6
                                      ? LecturerId.code?.length * 4.25 + 58
                                      : LecturerId.code?.length * 5 + 58
                                  }px`,
                                }}
                              >
                                {LecturerId.fullname}
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                        {/* <div className="flex items-center gap-2 text-subtitle-4">
                          <span className="font-bold w-20">
                            {LecturerId.status?.name ?? ''}
                          </span>
                          <span className="w-1 h-1 aspect-square bg-black rounded-full"></span>
                          <div className="flex gap-2 items-cente justify-start">
                            <div className="flex gap-2 items-center w-full">
                              <div
                                className={
                                  LecturerId.sla?.response_assurance
                                    ?.is_overdue ||
                                  LecturerId.sla?.resolving_assurance
                                    ?.is_overdue
                                    ? 'text-error-base'
                                    : ''
                                }
                              >
                                {dayjs(LecturerId.created_time).format(
                                  DATE_TIME_FORMAT_VIEW
                                )}
                              </div>

                              <div className="!whitespace-normal !overflow-auto">
                                <Tooltip
                                  placementTootip="top"
                                  tootipDetail={
                                    <GetDataSLAFull
                                      ticketID={LecturerId.id}
                                      sla={LecturerId.sla}
                                    />
                                  }
                                >
                                  <div className="flex gap-1 ">
                                    {LecturerId.sla?.response_assurance
                                      ?.is_overdue && (
                                      <>
                                        <div className="text-subtitle-3 lg:flex lg:flex-wrap items-center gap-1 text-error-base">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                            />
                                          </svg>
                                        </div>
                                      </>
                                    )}
                                    {LecturerId.sla?.resolving_assurance
                                      ?.is_overdue && (
                                      <>
                                        <div className="text-subtitle-3 hidden lg:flex lg:flex-wrap items-center gap-1 text-error-base ">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 fill-error-base"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                            />
                                          </svg>
                                        </div>
                                        <div className="lg:hidden">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 fill-error-base text-error-base"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                            />
                                          </svg>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
          {allReportLecturer.status === 'success' && (
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
                  pageCurrent={allReportLecturer.data.page + 1}
                  totalPage={allReportLecturer.data.total_page}
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
