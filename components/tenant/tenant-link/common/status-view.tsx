import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus } from '@/models/api'
export const StatusView: {
  label: string
  value: 'Not link' | 'Processed' | 'Pending' | 'Request' | 'NotRequest'
  color: string
}[] = [
  {
    label: 'Chưa liên kết',
    value: 'Not link',
    color: ColorStatus.find(
      (e) => e.name.toLowerCase() == 'chờ bổ sung thông tin'
    )!.value,
  },
  {
    label: 'Chờ phê duyệt',
    value: 'Pending',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'chưa xử lý')!.value,
  },
  {
    label: 'Đã gửi yêu cầu',
    value: 'Request',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đã xử lý')!.value,
  },
  {
    label: 'Chưa yêu cầu',
    value: 'NotRequest',
    color: ColorStatus.find(
      (e) => e.name.toLowerCase() == 'chờ bổ sung thông tin'
    )!.value,
  },
  {
    label: 'Đã liên kết',
    value: 'Processed',
    color: ColorStatus.find((e) => e.name.toLowerCase() == 'đã xử lý')!.value,
  },
]
export const ViewStatusTenantLink = (props: {
  status: 'Not link' | 'Processed' | 'Pending' | 'Request' | 'NotRequest'
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
