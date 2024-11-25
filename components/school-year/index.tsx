import { useGetAllSchoolYear } from "@/hooks/query/school-year"
import { useFilterForSchoolYearStore } from "@/hooks/zustand/filter-for-school-year"
import { useEffect, useState } from "react"
import { DebouncedInput } from "../ui/input/debouced-input"
import produce from "immer"
import { SearchIcon } from "../ui/icon"
import { Button } from "../ui/button/button"
import PageError from "../page-error/error"
import { TableSkeleton } from "../ui/skeleton"
import SchoolYearTable from "./table"

const SchoolYearWrapper = () => {
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [totalSchoolYear, setTotalSchoolYear] = useState(0)
  const filterSchoolYear = useFilterForSchoolYearStore()
  const allSchoolYear = useGetAllSchoolYear()
  useEffect(() => {
    if (allSchoolYear.status === 'success')
      setTotalSchoolYear(allSchoolYear.data.total ?? 0)
  }, [allSchoolYear])
  return (
    <>
      <div className="">
        <div className="flex items-center py-4 border-b border-primary-background">
          <div className="flex gap-5 grow items-center mr-2">
            <div className="flex flex-col">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterSchoolYear.filter.name}
                className="lg:w-96 "
                onChange={(value) => {
                  filterSchoolYear.update(
                    produce(filterSchoolYear.filter, (draftState) => {
                      draftState.name = value.toString()
                      draftState.page = 0
                    })
                  )
                }}
                icon={<SearchIcon />}
              />
            </div>
          </div>
          <div className="hidden md:flex gap-2 py-1">
            <Button
              size={'small'}
              intent={'primary'}
              className=" gap-2 items-center"
              onClick={() => setIsShowModalCreate(true)}
              bounce
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <span>Tạo mới</span>
            </Button>
          </div>
          <div className="flex flex-col gap-3 md:hidden fixed z-20 bottom-28 right-5">
            <Button
              onClick={() => setIsShowModalCreate(true)}
              intent={'primary'}
              size="small"
              iconOnly
              ariaLabel="Open create service modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
        </div>
        {allSchoolYear.status == 'error' && (
          <>
            <PageError />
          </>
        )}
        {allSchoolYear.status == 'loading' && (
          <>
            <TableSkeleton />
          </>
        )}
        {allSchoolYear.status == 'success' && (
          <>
            <SchoolYearTable
              getAllSchoolYearData={allSchoolYear.data}
              isPreviousData={allSchoolYear.isPreviousData}
            />
          </>
        )}
      </div>
      {/* <CreateSchoolYearModal
        isOpen={isShowModalCreate}
        closeModal={() => {
          setIsShowModalCreate(false)
        }}
      /> */}
    </>
  )
}

export default SchoolYearWrapper
