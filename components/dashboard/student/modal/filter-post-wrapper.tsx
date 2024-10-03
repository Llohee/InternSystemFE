import { InputSelect } from '@/components/ui/select/select'
import { useGetConfigPostLocal } from '@/hooks/query/post'
import { useFilterForPostStore } from '@/hooks/zustand/filter-for-post'
import { ConfigDetail } from '@/models/api'
import produce from 'immer'

const FilterPostWrapper = (props: {
  totalPost: any
  filterValue: any
  filterQuery: any
  setFilterValue: any
  setFilterQuery: any
  getConfigLocal: ConfigDetail[]
  getConfigProfession: ConfigDetail[]
}) => {
  const filterPost = useFilterForPostStore()
  const PostOptions = props.getConfigLocal.map((option) => ({
    value: option.id,
    label: option.name,
  }))
  const ProfessionOptions = props.getConfigProfession.map((option) => ({
    value: option.id,
    label: option.name,
  }))
  return (
    <div className="py-5 border-b border-border-1">
      <div className="flex md:flex-row flex-col gap-6 justify-end">
        <div className="flex gap-2 items-center">
          <span className="text-label-3 text-typography-label whitespace-nowrap">Địa điểm</span>
          <InputSelect
            options={PostOptions}
            value={PostOptions?.find(
              (val: any) => val.value === filterPost.filter.local
            )}
            label=""
            onChange={(option) => {
              filterPost.update(
                produce(filterPost.filter, (draftState: any) => {
                  draftState.local = option?.value
                })
              )
            }}
            isClearable
            className="!min-w-[200px]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-label-3 text-typography-label whitespace-nowrap">Ngành / Nghề</span>
          <InputSelect
            options={ProfessionOptions}
            value={ProfessionOptions?.find(
              (val: any) => val.value === filterPost.filter.profession
            )}
            label=""
            onChange={(option) => {
              filterPost.update(
                produce(filterPost.filter, (draftState: any) => {
                  draftState.profession = option?.value
                })
              )
            }}
            isClearable
            className="!min-w-[200px]"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterPostWrapper
