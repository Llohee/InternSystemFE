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
  semesterChoose?: { value: any; label: string; start_day: Date; end_day: Date }
  default?: { description: string; time: any }
  scheduleDetail?: ScheduleDetail
  getLengthListMilestones: any
  isEdit?: boolean
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
      <div className="grid grid-cols-11 gap-2 items-center my-auto justify-between w-full">
        <div className="col-span-5">
          <InputSelect
            options={optionSelectRuleMilestones}
            value={optionSelectRuleMilestones.filter(
              (val) => val.label === ruleMilestonesSelect
            )}
            onChange={(option) => {
              setRuleMilestonesSelect(option?.label ?? '')
              changValueMatchingRule({
                description: option?.label,
                time: [],
              })
            }}
            intent={
              props.useForm.formState.errors.milestones ? 'error' : 'default'
            }
            label={''}
            disabled={props.isEdit}
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
            value={props.default?.time ? dayjs(props.default.time) : undefined}
            className={inputStyles({
              disabled: props.isEdit ? true : false,
              intent: props.useForm.formState.errors.milestones
                ? 'error'
                : 'default',
            })}
            onChange={(date) => {
              const formattedDate = date ? date.toISOString() : ''
              changValueMatchingRule({
                description: ruleMilestonesSelect ?? '',
                time: formattedDate,
              })
            }}
            placeholder={
              !props.useForm.watch('semester')
                ? 'Chọn kì học trước'
                : 'Chọn thời gian'
            }
            showTime={{ format: 'HH:mm' }}
            disabled={props.isEdit || !props.useForm.watch('semester')}
            format="DD-MM-YYYY HH:mm"
            disabledDate={
              props.useForm.watch('semester')
                ? (current) =>
                    (current &&
                      current < dayjs(props.semesterChoose?.start_day)) ||
                    current > dayjs(props.semesterChoose?.end_day)
                : () => false
            }
          />
        </div>
      </div>
      {LengthListMilestones == 1 && (
        <span className={'text-label-5 text-error-base'}>
          {props.useForm.formState.errors.milestones?.message}
        </span>
      )}
    </>
  )
}
