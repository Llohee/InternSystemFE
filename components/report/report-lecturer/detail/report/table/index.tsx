import { DATE_TIME_FORMAT_VIEW } from '@/components/common/constant'
import { humanizeDurationConfig } from '@/components/common/duration'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Pill } from '@/components/ui/pill'
import { TableView } from '@/components/ui/table'
import { useChooseMulti } from '@/components/ui/table/hooks'
import { Tooltip } from '@/components/ui/tooltip/tooltip'
import { useFilterForReportStore } from '@/hooks/zustand/filter-for-report-lecturer'
import { GetAllReportResponse, ReportDetail } from '@/models/api'
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import produce from 'immer'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ViewStatusReport } from '../common/status-view'
import CreatescoreModal from '../modal/create-score'
import { queryClient } from '@/pages/_app'
import { ReportLecturerKeys } from '@/hooks/query/report-lecturer'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import ReportPopup from '../modal/report-popup'

interface ReportProps {
  getAllReportData: GetAllReportResponse
  setReportChoose: (report: ReportDetail[]) => void
}
const ReportTable = (props: ReportProps, ref: any) => {
  const filterReport = useFilterForReportStore()
  const [isShowModalCreateSore, setIsShowModalCreateScore] = useState(false)
  const [isShowReportPopup, setIsShowReportPopup] = useState(true)
  const [data, setData] = useState(() => [...props.getAllReportData.data])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>(
    filterReport.filter.sort.map((val: any) => ({
      id: val.name,
      desc: val.type,
    }))
  )
  const [ReportChoose, setReportChoose] = useState<ReportDetail>()
  const {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose,
    clearChooseItems,
    chooseAllItems,
    itemChoose,
  } = useChooseMulti<ReportDetail>({ data: data })
  useEffect(() => {
    filterReport.update(
      produce(filterReport.filter, (draftState: any) => {
        draftState.sort = [
          ...sorting.map((val: any) => ({
            name: val.id,
            type: val.desc,
          })),
        ]
      })
    )
  }, [sorting])
  useEffect(() => {
    props.setReportChoose(itemChoose)
  }, [itemChoose])
  // useEffect(() => {
  //   if (isShowModalUpdate) {
  //     props.setReportChoose([])
  //     clearChooseItems()
  //   }
  // }, [isShowModalUpdate])
  useImperativeHandle(ref, () => {
    return { clearChooseItems }
  })
  useEffect(() => {
    props.setReportChoose
    clearChooseItems()
  }, [data])
  useEffect(() => {
    setData([...props.getAllReportData.data])
    setDataChoose(props.getAllReportData.data)
    clearChooseItems()
  }, [props.getAllReportData])
  const columnHelper = createColumnHelper<ReportDetail>()
  const columns = [
    // columnHelper.display({
    //   id: 'choose',
    //   header: () => (
    //     <input
    //       type={'checkbox'}
    //       checked={chooseAllItems()}
    //       onChange={(e) => {
    //         toggleChooseAllItem(e.target.checked)
    //       }}
    //       className=""
    //     />
    //   ),
    //   cell: (propsCell) => (
    //     <input
    //       type={'checkbox'}
    //       checked={
    //         itemChoose.find((val: any) => val === propsCell.row.original) !=
    //         undefined
    //       }
    //       onChange={() => {
    //         toggleChooseItem(propsCell.row.original)
    //       }}
    //     />
    //   ),
    //   enableColumnFilter: false,
    //   meta: 'w-choose',
    // }),
    columnHelper.accessor('milestone', {
      id: 'milestone',
      header: 'Mốc',
      cell: (info) => (
        <button
          onClick={() => {
            setIsShowModalCreateScore(true)
            setReportChoose(info.row.original)
          }}
          className="text-primary-base"
        >
          {info.getValue()?.description}
        </button>
      ),
      enableColumnFilter: true,
      meta: 'w-boolean',
    }),
    columnHelper.accessor('milestone', {
      id: 'milestone',
      header: 'Hạn nộp báo cáo',
      cell: (info) => (
        <div
          className={`${
            dayjs().isAfter(info.getValue().time) ? 'text-error-base' : ''
          }`}
        >
          {dayjs(info.getValue().time).format(DATE_TIME_FORMAT_VIEW)}
        </div>
      ),
      enableColumnFilter: true,
      meta: 'w-time',
    }),
    columnHelper.accessor('upload_time', {
      id: 'upload_time',
      header: 'Thời gian nộp',
      cell: (info) => {
        return (
          <>
            {info.getValue()
              ? dayjs(info.getValue()).format(DATE_TIME_FORMAT_VIEW)
              : 'Chưa nộp'}
          </>
        )
      },
      enableColumnFilter: true,
      meta: 'w-time',
    }),
    columnHelper.accessor('expired_time', {
      id: 'expired_time',
      header: 'Nộp muộn',
      cell: (info) => (
        <div className="flex flex-col">
          {info.getValue() ? (
            dayjs().isAfter(info.row.original.milestone.time) ? (
              humanizeDurationConfig(info.getValue())
            ) : (
              <Pill intent="success">Đúng hạn</Pill>
            )
          ) : (
            'Chưa nộp'
          )}
        </div>
      ),
      enableColumnFilter: true,
      sortDescFirst: false,
      meta: 'w-tenant',
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: 'Ghi chú',
      cell: (info) => (
        <div id="cell-enable-overflow" className="flex items-center gap-2">
          <Tooltip
            tootipDetail={
              <div className="max-w-[230px] whitespace-normal">
                <div className="line-clamp-2">{info.getValue()}</div>
              </div>
            }
            placementTootip="bottom-start"
          >
            {info.getValue()}
          </Tooltip>
        </div>
      ),
      enableColumnFilter: true,
      sortDescFirst: false,
      meta: 'w-description',
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Trạng thái',
      cell: (info) => <ViewStatusReport status={info.getValue()} />,
      enableColumnFilter: true,
      meta: 'w-report_status',
    }),
    columnHelper.accessor('score_lecturer', {
      id: 'score_lecturer',
      header: 'Điểm số doanh nghiệp',
      cell: (info) => (
        <div id="cell-enable-overflow" className="flex items-center gap-2">
          {info.getValue() ? (
            info.getValue() > 3 ? (
              <Pill intent="success">{info.getValue()}</Pill>
            ) : (
              <Pill intent="error">{info.getValue()}</Pill>
            )
          ) : (
            <Pill intent="warning">Chưa có điểm</Pill>
          )}
        </div>
      ),
      enableColumnFilter: true,
      sortDescFirst: false,
      meta: 'w-status',
    }),
    columnHelper.accessor('score_lecturer', {
      id: 'score_lecturer',
      header: 'Điểm số giảng viên',
      cell: (info) => (
        <div id="cell-enable-overflow" className="flex items-center gap-2">
          {info.getValue() ? (
            info.getValue() > 3 ? (
              <Pill intent="success">{info.getValue()}</Pill>
            ) : (
              <Pill intent="error">{info.getValue()}</Pill>
            )
          ) : (
            <Pill intent="warning">Chưa có điểm</Pill>
          )}
        </div>
      ),
      enableColumnFilter: true,
      sortDescFirst: false,
      meta: 'w-status',
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    sortDescFirst: false,
    pageCount: 0,
    debugTable: true,
  })
  const router = useRouter()
  const { post_id, student_id } = router.query

  // useEffect(() => {
  //   if (table.getState().columnFilters[0]?.id === 'fullName') {
  //     if (table.getState().sorting[0]?.id !== 'fullName') {
  //       table.setSorting([{ id: 'fullName', desc: false }])
  //     }
  //   }
  // }, [table.getState().columnFilters[0]?.id])
  return (
    <>
      <TableView table={table} className="h-table-task-ticket" />
      <div className="flex gap-2 pt-0.5 pb-1 border-t border-border-2 justify-end">
        <Pagination
          changePage={(e) => {
            filterReport.update(
              produce(filterReport.filter, (draftState: any) => {
                draftState.page = e - 1
              })
            )
          }}
          pageCurrent={props.getAllReportData.page + 1}
          totalPage={props.getAllReportData.total_page}
          label={
            props.getAllReportData.total > 0 ? (
              <div className="hidden md:block">
                {props.getAllReportData.page * filterReport.filter.limit + 1}-
                {props.getAllReportData.page * filterReport.filter.limit +
                  data.length}{' '}
                trên tổng {props.getAllReportData.total}
              </div>
            ) : (
              <></>
            )
          }
          showGotoPageInput
        ></Pagination>
      </div>
      {ReportChoose && (
        <CreatescoreModal
          isOpen={isShowModalCreateSore}
          closeModal={() => {
            setIsShowModalCreateScore(false)
            queryClient.removeQueries(
              ReportLecturerKeys.getReportById(ReportChoose.id)
            )
            setReportChoose(undefined)
          }}
          report_id={ReportChoose.id}
          defaultTabReport={false}
        />
      )}
      {typeof post_id === 'string' && typeof student_id === 'string' && (
        <ReportPopup
          report_id={post_id}
          student_id={student_id}
          defaultTabReport={typeof post_id === 'string'}
        />
      )}
    </>
  )
}

export default forwardRef(ReportTable)
