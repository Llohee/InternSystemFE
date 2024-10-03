import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { messageStyles } from './input'

interface GroupChooseProps<T extends FieldValues> {
  name: Path<T>
  intent?: 'default' | 'error' | 'success'
  register: UseFormRegister<T>
  label?: React.ReactNode
  listValue: { label: string; value: any }[]
  onChange?: (value: any) => void
  type: 'checkbox' | 'radio'
  className?: string
  defautValue?: any
  classNameLabel?: string
  classNameList?: string
  message?: string
  disabled?: boolean
  required?: boolean
}

export function GroupChooseBtn<T extends FieldValues>(
  props: GroupChooseProps<T>
) {
  props.register(props.name, {
    required:
      props.required === true
        ? props.label
          ? `${props.label} là bắt buộc`
          : 'Trường này bắt buộc'
        : props.required,
  })
  return (
    <div>
      <div className="flex flex-col gap-3 w-full">
        {props.label && (
          <label className={`flex gap-1 text-label-3 text-typography-label`}>
            {props.label}
            {props.required === true && (
              <div className="text-error-base text-subtitle-4">*</div>
            )}
          </label>
        )}
        <div className={`flex flex-wrap gap-3 w-full ${props.classNameList}`}>
          {props.listValue.map((item, index) => (
            <label key={item.value} className="flex gap-1 items-center">
              <input
                id={`${props.name}_${index}`}
                {...props.register(props.name)}
                type={props.type}
                onChange={(event) => {
                  props.register(props.name).onChange(event)
                  props.onChange && props.onChange(event.target.value)
                }}
                disabled={props.disabled}
                value={item.value}
                className="w-4 h-4"
              />
              <span className={` ${props.classNameLabel}`}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {props.message && (
        <span
          className={messageStyles({
            intent: props.intent,
          })}
        >
          {props.message}
        </span>
      )}
    </div>
  )
}
