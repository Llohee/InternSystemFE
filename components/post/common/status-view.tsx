import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus } from '@/models/api'
export const StudentStatusOptions: {
  label: string
  value: 'Pending' | 'HR Approver' | 'AU Approver'
  color: string
}[] = [
  {
    label: 'Chờ phê duyệt',
    value: 'Pending',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'chưa xử lý')!.value,
  },
  {
    label: 'Doanh nghiệp đã phê duyệt',
    value: 'HR Approver',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'chờ bổ sung thông tin')!.value,
  },
  {
    label: 'Nhà trường đã phê duyệt',
    value: 'AU Approver',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đã xử lý')!.value,
  },
]
export const ViewStatusStudent = (props: {
  status: 'Pending' | 'HR Approver' | 'AU Approver'
}) => {
  const color = StudentStatusOptions.find((e) => e.value === props.status)?.color
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
      {StudentStatusOptions.find((e) => e.value === props.status)?.label}
    </Tag>
  )
}
