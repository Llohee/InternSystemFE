import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus } from '@/models/api'
export const StatusView: {
  label: string
  value: 'PAST' | 'ONGOING' | 'UPCOMING'
  color: string
}[] = [
  {
    label: 'Đã qua',
    value: 'PAST',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'xử lý lại')!.value,
  },
//   {
//     label: 'Đang diễn ra',
//     value: 'ONGOING',
//     color: ColorStatus.find((e) => e.name.toLowerCase() == 'đã xử lý')!.value,
//   },
//   {
//     label: 'Chưa đến',
//     value: 'UPCOMING',
//     color: ColorStatus.find((e) => e.name.toLowerCase() == 'quá hạn')!.value,
//   },
]
export const ViewStatusYearSemester = (props: {
  status: 'PAST' | 'ONGOING' | 'UPCOMING'
}) => {
  const color = StatusView.find((e) => e.value === props.status)?.color
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
      {StatusView.find((e) => e.value === props.status)?.label}
    </Tag>
  )
}
