import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus } from '@/models/api'
export const reportStatusOptions: {
  label: string
  value: 'WAITTING_SCORE' | 'BUSINESS_CHECKED' | 'LECTURER_CHECKED'
  color: string
}[] = [
  {
    label: 'Chờ chấm điểm',
    value: 'WAITTING_SCORE',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đang chấm')!.value,
  },
  {
    label: 'Doanh nghiệp đã chấm',
    value: 'BUSINESS_CHECKED',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'chưa xử lý')!.value,
  },
  {
    label: 'Giảng viên đã chấm',
    value: 'LECTURER_CHECKED',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đã xử lý')!.value,
  },
]
export const ViewStatusReport = (props: {
  status: 'WAITTING_SCORE' | 'BUSINESS_CHECKED' | 'LECTURER_CHECKED'
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
