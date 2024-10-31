import PageError from '@/components/page-error/error'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useGetAllProfession } from '@/hooks/query/post'
import { useFilterForProfessionsStore } from '@/hooks/zustand/filter-for-post'
import produce from 'immer'
import ListProfession from './list-profession'

const ReportHUmanresourceWrapper = () => {
  const filterProfession = useFilterForProfessionsStore()
  const allProfession = useGetAllProfession()
  return (
    <>
      <div className="flex items-center py-4">
        <div className="flex gap-5 grow items-center">
          <div className="ml-2">
            <DebouncedInput
              placeholder={'Tìm kiếm'}
              value={filterProfession.filter.name}
              className="lg:w-96 "
              onChange={(value) => {
                filterProfession.update(
                  produce(filterProfession.filter, (draftState) => {
                    draftState.name = value.toString()
                    draftState.page = 0
                  })
                )
              }}
              icon={<SearchIcon />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3  fixed z-10 bottom-14 right-2">
          {allProfession.status === 'error' && <PageError />}
          {allProfession.status === 'loading' && <TableSkeleton />}
          {allProfession.status === 'success' && (
            <ListProfession allProfession={allProfession.data} />
          )}
        </div>
      </div>
    </>
  )
}

export default ReportHUmanresourceWrapper
