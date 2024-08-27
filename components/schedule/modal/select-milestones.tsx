import { Button } from '@/components/ui/button/button'
import { Input, inputStyles } from '@/components/ui/input/input'
// import InputDate from '@/components/ui/input/input-date'
import { InputSelect } from '@/components/ui/select/select'
import {
  MilestonesDetail,
  ScheduleDetail,
  UpdateScheduleRequest,
} from '@/models/api'
import { DatePicker } from 'antd'
// import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

export const SelectMilestones = (props: {
  index: number
  useForm: UseFormReturn<UpdateScheduleRequest, any>
  isReset?: boolean
  default?: { description: string; time: any }
  scheduleDetail?: ScheduleDetail
  getLengthListMilestones: any
}) => {
  const LengthListMilestones = props.getLengthListMilestones()
  const [selectOption, setSelectOption] = useState<any[]>([])

  const deleteMatchingRule = () => {
    let newArr = props.useForm.getValues('milestones') ?? []
    newArr = newArr.filter((item) => item && item != props.default)
    props.useForm.setValue('milestones', newArr)
    const updatedselectOption = selectOption.filter((option) => {
      return option.field !== props.default?.description
    })
    setSelectOption(updatedselectOption)
  }

  const changValueMatchingRule = (val: any) => {
    let newArr = props.useForm.watch('milestones') ?? []
    if (newArr[props.index]) newArr[props.index] = val
    else
      newArr = [...newArr, val].filter((item) => item && item != props.default)
    props.useForm.setValue('milestones', newArr)
  }

  const [ruleMilestonesSelect, setRuleMilestonesSelect] = useState<
    string | undefined
  >(props.default?.description ?? undefined)

  const [optionSelectRuleMilestones, setOptionSelectRuleMilestones] = useState<
    any[]
  >([{ value: `${props.index}`, label: `Mốc ${props.index + 1}` }])

  const setOptions = () => {
    let valueParent = props.useForm.watch('milestones') ?? []
    if (valueParent) {
    }
  }

  // useEffect(() => {
  //   if (ruleMilestonesSelect) setRuleMilestonesSelect(undefined)
  //   setOptions()
  // }, [props.useForm.watch('milestones')])

  // useEffect(() => {
  //   if (!props.default) {
  //     setRuleMilestonesSelect(undefined)
  //   } else {
  //     setRuleMilestonesSelect(props.default?.description ?? undefined)
  //   }
  // }, [props.default])
  return (
    <>
      <div className="grid grid-cols-12 gap-2 items-center my-auto justify-between w-full">
        <div className="col-span-5">
          <InputSelect
            name={'milestones'}
            options={optionSelectRuleMilestones}
            value={
              optionSelectRuleMilestones.find(
                (val) => val.label === ruleMilestonesSelect
              ) ?? null
            }
            onChange={(option) => {
              setRuleMilestonesSelect(option?.label ?? '')
              changValueMatchingRule({
                field: option?.label,
                values: [],
              })
            }}
            label={''}
            register={props.useForm.register}
          />
          <div className="grid grid-cols-12 gap-2 items-end my-auto justify-end w-full"></div>
        </div>
        <div className="col col-span-1 flex items-center justify-center text-typography-subtitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="col col-span-5 my-2">
          <DatePicker
            value={props.default?.time ? dayjs(props.default.time) : null}
            className={inputStyles({
              className: '!w-full',
            })}
            onChange={(date) => {
              const formattedDate = date ? date.toISOString() : ''
              changValueMatchingRule({
                description: ruleMilestonesSelect ?? '',
                time: formattedDate,
              })
            }}
            format={'DD/MM/YYYY'}
          />
        </div>
        {props.default && (
          <div className="col-span-1 flex flex-col gap-2 justify-center items-center">
            <Button
              iconOnly
              ariaLabel="Delete matching rule"
              size={'small'}
              btnStyle="no-background"
              intent={'grey'}
              onClick={deleteMatchingRule}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 17 17"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.77306 13.8598C3.80439 14.2796 3.99295 14.6722 4.30109 14.9592C4.60922 15.2461 5.01425 15.4062 5.43528 15.4076H11.1442C11.5652 15.4062 11.9702 15.2461 12.2784 14.9592C12.5865 14.6722 12.7751 14.2796 12.8064 13.8598L13.3308 6.51866H3.24862L3.77306 13.8598Z" />
                <path d="M14.4008 4.29644H11.0675V2.62977C11.0675 2.48243 11.009 2.34112 10.9048 2.23694C10.8006 2.13275 10.6593 2.07422 10.5119 2.07422H6.06749C5.92015 2.07422 5.77884 2.13275 5.67465 2.23694C5.57047 2.34112 5.51194 2.48243 5.51194 2.62977V4.29644H2.1786C2.03126 4.29644 1.88995 4.35497 1.78577 4.45916C1.68158 4.56335 1.62305 4.70465 1.62305 4.852C1.62305 4.99934 1.68158 5.14065 1.78577 5.24483C1.88995 5.34902 2.03126 5.40755 2.1786 5.40755H14.4008C14.5482 5.40755 14.6895 5.34902 14.7937 5.24483C14.8978 5.14065 14.9564 4.99934 14.9564 4.852C14.9564 4.70465 14.8978 4.56335 14.7937 4.45916C14.6895 4.35497 14.5482 4.29644 14.4008 4.29644ZM6.62305 3.18533H9.95638V4.29644H6.62305V3.18533Z" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
