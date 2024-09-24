import {
  DATE_FORMAT_VIEW
} from '@/components/common/constant'
import { DatePicker, GetProps, Space, TimeRangePickerProps } from 'antd'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
dayjs.extend(quarterOfYear)
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

const { RangePicker } = DatePicker

export const SelectDateRangeInput = (props: {
  label?: string
  required?: boolean
  data?: { start: Date; end: Date }
  default?: { start: Date; end: Date }
  onChange: (data: { start?: Date; end?: Date }) => void
  labelShort?: boolean
  disabledDate?: boolean
  disabelDateRange?: {
    start: string
    end: string
  }
  maxDate?: Date
  minDate?: Date
  autoComplete?: boolean
  labelDone?: string
  placement?: 'start' | 'end'
  format?: string
  picker?: 'time' | 'date' | 'month' | 'year'
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return (
      current < dayjs(props.disabelDateRange?.start).startOf('day') ||
      current > dayjs(props.disabelDateRange?.end).endOf('day')
    )
  }
  const rangePresets: TimeRangePickerProps['presets'] = [
    {
      label: 'Hôm nay',
      value: [dayjs(), dayjs()],
    },
    {
      label: 'Tuần này',
      value: [dayjs().startOf('w'), dayjs().endOf('w')],
    },
    {
      label: 'Tuần trước',
      value: [
        dayjs().subtract(1, 'week').startOf('w'),
        dayjs().subtract(1, 'week').endOf('w'),
      ],
    },
    {
      label: 'Tháng này',
      value: [dayjs().startOf('M'), dayjs().endOf('M')],
    },
    {
      label: 'Tháng trước',
      value: [
        dayjs().subtract(1, 'month').startOf('M'),
        dayjs().subtract(1, 'month').endOf('M'),
      ],
    },
    {
      label: 'Quý này',
      value: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
    },
    {
      label: 'Quý trước',
      value: [
        dayjs().subtract(1, 'quarter').startOf('quarter'),
        dayjs().subtract(1, 'quarter').endOf('quarter'),
      ],
    },
    {
      label: 'Nửa đầu năm',
      value: [
        dayjs().startOf('year'),
        dayjs().startOf('year').add(5, 'month').endOf('month'),
      ],
    },
    {
      label: 'Nửa cuối năm',
      value: [
        dayjs().startOf('year').add(6, 'month').startOf('month'),
        dayjs().endOf('year'),
      ],
    },
  ]
  return (
    <Space
      direction="vertical"
      size={'large'}
      className="w-full flex flex-1 flex-col gap-2"
    >
      <label className="flex gap-1 text-label-3 text-typography-label">
        {props.label}
        {props.required && (
          <div className="text-error-base text-subtitle-4">*</div>
        )}
      </label>
      <RangePicker
        // defaultOpen={open}
        picker={props.picker ? props.picker : 'date'}
        onClick={() => setOpen(true)}
        presets={rangePresets}
        format={props.format ? props.format : DATE_FORMAT_VIEW}
        disabledDate={props.disabledDate ? disabledDate : undefined}
        value={
          props.data
            ? [dayjs(props.data?.start), dayjs(props.data?.end)]
            : undefined
        }
        onChange={(data) => {
          if (data)
            props.onChange({ start: data[0]?.toDate(), end: data[1]?.toDate() })
          else props.onChange({ start: undefined, end: undefined })
        }}
        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        className="border border-border-1 relative appearance-none py-2 px-3 focus:outline-none leading-tight peer text-body-3 w-full gap-2 !text-typography-label rounded-lg transition-all checked:text-grey-1 h-[38px] !placeholder-typography-placeholder"
      />
    </Space>
  )
}
