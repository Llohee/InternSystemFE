import dayjs from 'dayjs'
import {
  DATE_FORMAT_VIEW,
  DATE_TIME_FORMAT_VIEW,
} from '@/components/common/constant'
import { DatePicker } from 'antd'
import { VariantProps, cva } from 'class-variance-authority'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
export const inputStyles = cva(
  'relative appearance-none py-2 px-3 focus:outline-none leading-tight peer text-body-3 w-full gap-2 !text-typography-label rounded-lg transition-all border focus-within:border-primary-base  checked:text-grey-1 h-[38px] placeholder-typography-placeholder',
  {
    variants: {
      intent: {
        default: 'border-border-1',
        error: 'border-error-base',
        success: 'border-success-base',
      },
      disabled: {
        true: 'cursor-not-allowed !text-typography-disabled !bg-grey-disabled',
        false: 'cursor-auto',
      },
      size: {
        small: '!px-4 !py-1 h-6',
        medium: '!px-4 !py-2 h-[38px]',
        large: '!px-4 !py-4 h-12',
      },
      labelLocation: {
        top: '',
        left: '',
        inside: '',
        right: '',
      },
    },
    defaultVariants: {
      intent: 'default',
      disabled: false,
      size: 'medium',
    },
  }
)
export const messageStyles = cva('text-subtitle-4', {
  variants: {
    intent: {
      default: 'text-primary-base',
      info: 'text-primary-base',
      success: 'text-success-base',
      error: 'text-error-base',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

interface InputProps<T extends FieldValues>
  extends VariantProps<typeof inputStyles> {
  name: Path<T>
  intent?: 'default' | 'error' | 'success'
  control: Control<T>
  label?: React.ReactNode
  /** Type for input*/
  id?: string
  placeholder?: string
  defautValue?: string
  type?: 'Date' | 'Date-time'
  /** Custom TailwindCSS style */
  className?: string
  classNameLabel?: string
  message?: string
  disabled?: boolean
  required?: boolean
  max?: dayjs.Dayjs
  min?: dayjs.Dayjs
  notRule?: boolean
  autoComplete?: string
}
function InputDate<T extends FieldValues>(props: InputProps<T>) {
  const { name, id, placeholder, control, intent, label, required } = props

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={props.defautValue as any}
        rules={{
          required:
            required === true
              ? label
                ? `${label} là bắt buộc`
                : 'Trường này bắt buộc'
              : required,
        }}
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <div
            className={`flex flex-1 ${
              props.labelLocation === 'left'
                ? 'gap-2 items-center'
                : 'flex-col gap-2'
            }  ${
              props.labelLocation === 'right'
                ? '!flex-row-reverse w-fit items-center gap-2'
                : ''
            } 
        
        `}
          >
            {label && props.labelLocation != 'inside' && (
              <label
                className={`flex gap-1 text-label-3 text-typography-label ${
                  props.classNameLabel ?? ''
                }`}
                htmlFor={id ?? ''}
              >
                {label}
                {required === true && (
                  <div className="text-error-base text-subtitle-4">*</div>
                )}
              </label>
            )}
            <div className="grow flex flex-col gap-2">
              <div className="relative">
                <div className="relative flex items-center gap-2 z-0 ">
                  <DatePicker
                    {...ref}
                    maxDate={props.max}
                    minDate={props.min}
                    value={value ? dayjs(value) : undefined}
                    className={inputStyles({
                      intent: error ? 'error' : intent,
                      disabled: props.disabled,
                      className: props.className,
                    })}
                    showTime={props.type === 'Date-time'}
                    format={
                      props.type === 'Date-time'
                        ? DATE_TIME_FORMAT_VIEW
                        : DATE_FORMAT_VIEW
                    }
                    onChange={(date, dateString) => {
                      onChange((date?.toISOString() ?? '') as any)
                    }}
                    // placeholder={
                    //   placeholder || props.type === 'Date-time'
                    //     ? DATE_TIME_FORMAT_VIEW
                    //     : DATE_FORMAT_VIEW
                    // }
                    placeholder={props.disabled ? '' : placeholder ?? undefined}
                    needConfirm={false}
                    disabled={props.disabled}
                  />
                  {props.labelLocation === 'inside' && (
                    <label
                      className={`absolute text-label z-10 text-info-pressed duration-200 transform -translate-y-6 peer-focus:!bg-white peer-focus:!top-3 ml-3 scale-75 top-auto mx-auto peer-focus:mb-2 peer-focus:text-info-pressed origin-[0] peer-focus:text-subtitle peer-placeholder-shown:scale-100 peer-placeholder-shown:mt-0 peer-placeholder-shown:text-typography-subtitle peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                        props.classNameLabel ?? ''
                      }`}
                    >
                      {label ?? placeholder}
                    </label>
                  )}
                </div>
              </div>
              {(props.message || error?.message) && (
                <small
                  id="message"
                  className={messageStyles({
                    intent: error ? 'error' : intent,
                  })}
                >
                  {props.message ?? error?.message ?? ''}
                </small>
              )}
            </div>
          </div>
        )}
      ></Controller>
    </>
  )
}

export default InputDate
