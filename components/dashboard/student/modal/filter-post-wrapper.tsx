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
  const SalaryMinOptions = [
    {
      value: '0',
      label: '0',
    },
    {
      value: '5000',
      label: '5000',
    },
    {
      value: '10000',
      label: '10000',
    },
  ]
  const SalaryMaxOptions = [
    {
      value: '5000',
      label: '5000',
    },
    {
      value: '10000',
      label: '10000',
    },
    {
      value: '15000',
      label: '15000',
    },
  ]

  return (
    <div className="py-5 border-b border-border-1 nav nav-tabs sticky top-0 bg-white z-10 flex flex-auto">
      <div className="flex md:flex-row flex-col gap-6 justify-start">
        <div className="flex gap-2 items-center">
          <InputSelect
            options={PostOptions}
            value={PostOptions?.find(
              (val: any) => val.value === filterPost.filter.local
            )}
            label="Địa điểm"
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
          <InputSelect
            options={ProfessionOptions}
            value={ProfessionOptions?.find(
              (val: any) => val.value === filterPost.filter.profession
            )}
            label="Ngành / Nghề"
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
        <div className="flex flex-col gap-2">
          <span className="text-label-3 text-typography-label whitespace-nowrap">
            Mức lương
          </span>
          <div className="flex items-center gap-1">
            <InputSelect
              options={SalaryMinOptions}
              value={SalaryMinOptions?.find(
                (val: any) => val.value === filterPost.filter.salary_min
              )}
              label=""
              onChange={(option) => {
                filterPost.update(
                  produce(filterPost.filter, (draftState: any) => {
                    draftState.salary_min = option?.value
                  })
                )
              }}
              isClearable
              className="!w-[150px]"
            />
            <div className="text-label-3 text-typography-label whitespace-nowrap">
              -
            </div>
            <InputSelect
              options={SalaryMaxOptions}
              value={SalaryMaxOptions?.find(
                (val: any) => val.value === filterPost.filter.salary_max
              )}
              label=""
              onChange={(option) => {
                filterPost.update(
                  produce(filterPost.filter, (draftState: any) => {
                    draftState.salary_max = option?.value
                  })
                )
              }}
              isClearable
              className="!w-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPostWrapper
