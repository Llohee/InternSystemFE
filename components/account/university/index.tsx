import PageError from '@/components/page-error/error'
import { Button } from '@/components/ui/button/button'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetAllAccountUniversity } from '@/hooks/query/account/university'
import { useFilterForUniverSityAccountStore } from '@/hooks/zustand/filter-for-university-account'
import { UserGetDetail } from '@/models/api'
import { useEffect, useRef, useState } from 'react'
import AccountUniversityTable from './table'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import produce from 'immer'
import { SearchIcon } from '@/components/ui/icon'
import CreateUniversityAccountModal from './modal/create-university'

const UniversityAccount = (props: { type: string }) => {
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [changeActive, setChangeActive] = useState(false)
  const [totalAccount, setTotalAccount] = useState(0)

  const [universityAccountChoose, setUniversityAccountChoose] =
    useState<UserGetDetail[]>()
  const [isShowModalUpdateAction, setIsShowModalUpdateAction] = useState(false)
  const filterUniversityAccount = useFilterForUniverSityAccountStore()
  const allAccountUniversity = useGetAllAccountUniversity()
  const tableRef = useRef<any>()
  useEffect(() => {
    if (allAccountUniversity.status === 'success')
      setTotalAccount(allAccountUniversity.data.total)
  }, [allAccountUniversity])
  return (
    <>
      <div className="">
        <div className="flex items-center py-4">
          <div className="flex gap-5 grow items-center">
            <div className="ml-2">
              <DebouncedInput
                placeholder={'Tìm kiếm'}
                value={filterUniversityAccount.filter.name}
                className="lg:w-96 "
                onChange={(value) => {
                  filterUniversityAccount.update(
                    produce(filterUniversityAccount.filter, (draftState) => {
                      draftState.name = value.toString()
                      draftState.page = 0
                    })
                  )
                }}
                icon={<SearchIcon />}
              />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <Button
              onClick={() => {
                tableRef.current.clearChooseItems()
                setIsShowModalCreate(true)
              }}
              intent={'primary'}
              size="small"
              className="hidden md:flex gap-2 items-center text-typography-secondary"
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
          <div className="flex flex-col gap-3 md:hidden fixed z-10 bottom-14 right-2">
            <Button
              onClick={() => {
                tableRef.current.clearChooseItems()
                setIsShowModalCreate(true)
              }}
              intent={'primary'}
              size="small"
              iconOnly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
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
        {allAccountUniversity.status === 'error' && <PageError />}
        {allAccountUniversity.status === 'loading' && <TableSkeleton />}
        {allAccountUniversity.status === 'success' && (
          <AccountUniversityTable
            ref={tableRef}
            getAllAccountUniversityData={allAccountUniversity.data}
            setUniversityAccountChoose={setUniversityAccountChoose}
            isPreviousData={allAccountUniversity.isPreviousData}
            type={props.type}
          />
        )}
      </div>
      <CreateUniversityAccountModal
        isOpen={isShowModalCreate}
        closeModal={() => setIsShowModalCreate(false)}
        type={props.type}
      />
    </>
  )
}

export default UniversityAccount
