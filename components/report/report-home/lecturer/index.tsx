import PageError from '@/components/page-error/error'
import { SearchIcon } from '@/components/ui/icon'
import { DebouncedInput } from '@/components/ui/input/debouced-input'
import { TableSkeleton } from '@/components/ui/skeleton'
import produce from 'immer'
import ListGroup from './list-group'
import { useFilterForGroupStore } from '@/hooks/zustand/filter-for-group'
import { useGetAllGroup } from '@/hooks/query/group'

const ReportLecturerWrapper = () => {
  const filterGroup = useFilterForGroupStore()
  const allGroup = useGetAllGroup()
  return (
    <>
      <div className="flex items-center py-4">
        <div className="flex gap-5 grow items-center">
          <div className="ml-2">
            <DebouncedInput
              placeholder={'Tìm kiếm'}
              value={filterGroup.filter.name}
              className="lg:w-96 "
              onChange={(value) => {
                filterGroup.update(
                  produce(filterGroup.filter, (draftState) => {
                    draftState.name = value.toString()
                    draftState.page = 0
                  })
                )
              }}
              icon={<SearchIcon />}
            />
          </div>
        </div>
      </div>
      {allGroup.status === 'error' && <PageError />}
      {allGroup.status === 'loading' && <TableSkeleton />}
      {allGroup.status === 'success' && <ListGroup allGroup={allGroup.data} />}
    </>
  )
}

export default ReportLecturerWrapper
