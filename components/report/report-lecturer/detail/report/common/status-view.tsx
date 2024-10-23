import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus } from '@/models/api'
export const reportStatusOptions: {
  label: string
  value: 'OVERDUE' | 'LECTURER_CHECKED' | 'ONTIME'
  color: string
}[] = [
  {
    label: 'Quá hạn',
    value: 'OVERDUE',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'quá hạn')!.value,
  },
  {
    label: 'Đang chấm',
    value: 'LECTURER_CHECKED',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đang chấm')!.value,
  },
  {
    label: 'Đang thực tập',
    value: 'ONTIME',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đang chấm')!.value,
  },
]
export const ViewStatusReport = (props: {
  status: 'OVERDUE' | 'LECTURER_CHECKED' | 'ONTIME'
}) => {
  const color = reportStatusOptions.find((e) => e.value === props.status)?.color
  return (
    <Tag
      color={color}
      backgroundColor={`${color}30`}
      borderColor={`${color}15`}
    >
      <span
        className="w-2 h-2 rounded-full border"
        style={{
          background: `${color}`,
        }}
      />
      {reportStatusOptions.find((e) => e.value === props.status)?.label}
    </Tag>
  )
}
