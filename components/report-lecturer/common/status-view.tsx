import { stringToRGB } from '@/components/common/get-initial'
import { Tag } from '@/components/ui/tag'
import { ColorStatus, StatusDetail } from '@/models/api'

export const StatusView = (props: { data: string | StatusDetail }) => {
  const getColor = (status: string) => {
    let nextStatus = status
    return (
      ColorStatus.find((e) => e.name.toLowerCase() == nextStatus.toLowerCase())
        ?.value ?? `#${stringToRGB(nextStatus)}`
    )
  }
  const color =
    typeof props.data === 'string'
      ? getColor(props.data)
      : props.data?.color ?? getColor('')
  const status =
    typeof props.data === 'string' ? props.data : props.data?.name ?? ''
  return (
    <Tag
      color={color}
      backgroundColor={`${color}30`}
      borderColor={`${color}15`}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: `${color}`,
        }}
      />
      {status}
    </Tag>
  )
}
