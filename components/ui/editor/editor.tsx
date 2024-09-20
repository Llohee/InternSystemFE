import { cva } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import { messageStyles } from '../input/input'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const inputStyles = cva(
  'relative appearance-none leading-tight p-0 m-0 focus:shadow-outline peer w-full gap-2 text-body-3 peer transition-all border focus-within:border-primary-base z-[5]',
  {
    variants: {
      intent: {
        default: 'border-border-1',
        error: 'border-error-base',
        success: 'border-success-base',
      },
      disabled: {
        true: 'border-0 cursor-not-allowed focus:border-primary-base bg-grey-2',
        false: 'cursor-pointer',
      },
    },

    defaultVariants: {
      intent: 'default',
      disabled: false,
    },
  }
)

interface EditorProps<T extends FieldValues> {
  intent: 'default' | 'error' | 'success'
  label?: React.ReactNode
  name: Path<T>
  value?: string
  register: UseFormRegister<T>
  onChange: (data: string) => void
  onBlur?: any
  placeholder?: string
  classNameLabel?: string
  required?: boolean
  message?: string
  type?: 'classic' | 'inline'
  disabled?: boolean
}
export function Editor<T extends FieldValues>(props: EditorProps<T>) {
  function removeHtmlTags(input: string): string {
    // Return a string with all empty HTML tags removed, except for empty <img> tags
    return input.replace(/<[^>]*>/g, '')
    // return input
  }
  if (props.required) {
    props.register(props.name, {
      required: props.label
        ? `${props.label} là bắt buộc`
        : 'Trường này bắt buộc',
    })
  }

  return (
    <div>
      {props.label && (
        <label
          className={`flex gap-1 text-label-3 mb-2 !border-0 ${
            props.classNameLabel ?? ''
          }`}
          htmlFor={props.name ?? ''}
        >
          {props.label}

          {props.required === true && props.label && (
            <div className="text-error-base">*</div>
          )}
        </label>
      )}
      <div>
        <ReactQuill
          {...props.register}
          id={props.name}
          value={props.value ?? ''}
          onBlur={props.onBlur}
          onChange={(newContent) => {
            if (removeHtmlTags(newContent)) props.onChange(newContent)
            else props.onChange('')
          }}
          className={inputStyles({
            intent: props.intent,
            disabled: props.disabled,
          })}
          readOnly={props.disabled}
          // modules={{
          //   toolbar: [
          //     [{ header: [1, 2, 3, 4, false] }],
          //     ['bold', 'italic', 'underline'],
          //     [{ list: 'ordered' }, { list: 'bullet' }],
          //     [{ indent: '-1' }, { indent: '+1' }],
          //     ['clean'],
          //   ],
          // }}
          placeholder={props.placeholder ?? 'Nhập nội dung'}
        />
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
export const ConvertHTML = (props: {
  label?: string
  content?: string
  placeholder?: string
}) => {
  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-grey-1 rounded-lg flex flex-col justify-between gap-2 border border-border-2">
      {props.label && (
        <div className="text-label-1 font-semibold text-typography-label shadow-sm pb-3">
          {props.label}
        </div>
      )}
      <div className="grow !isolate overflow-y-auto">
        <div className="ql-snow !border-0 h-full rounded-md break-words text-pretty">
          <div
            className="ql-editor !h-full !max-h-full"
            dangerouslySetInnerHTML={{ __html: props.content ?? '' }}
            data-placeholder={props.placeholder}
          />
        </div>
      </div>
    </div>
  )
}
