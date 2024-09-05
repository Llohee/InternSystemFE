import { Tag, TagProps } from '../tag'

// legacy Pill component. New Tag component
export const Pill = (props: TagProps) => {
  return <Tag {...props} />
}
