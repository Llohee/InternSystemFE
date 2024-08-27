// @ts-nocheck
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Select, { GroupBase, OptionsOrGroups, PropsValue } from 'react-select'
// import makeAnimated from 'react-select/animated'
// const animatedComponents = makeAnimated();
export const inputStyles = cva(
  'flex items-center justify-center z-0 px-1 text-body-3 appearance-none leading-tight peer w-full gap-2 !rounded-lg transition-all border focus-within:border-primary-base',
  {
    variants: {
      intent: {
        default: 'border-border-1',
        error: 'border-error-base',
        success: 'border-success-base',
      },
      disabled: {
        true: '!bg-grey-disabled !text-typography-disabled border-0 cursor-not-allowed focus:border-primary-base',
        false: 'cursor-pointer',
      },

      labelLocation: {
        top: '',
        left: '',
        inside: '',
      },
      size: {
        small: '!w-[100px]',
        medium: '!w-[200px]',
        large: '!w-[300px]',
        full: '',
      },
    },

    defaultVariants: {
      intent: 'default',
      disabled: false,
    },
  }
)
const messageStyles = cva('text-subtitle-4', {
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

interface OptionWithLabelString {
  label: string
  value: any
}
interface OptionWithReactNode {
  label: React.ReactNode
  labelString: string
  value: any
}
type Option = OptionWithLabelString | OptionWithReactNode
interface InputSelectProps<T extends FieldValues> {
  id?: string
  name?: Path<T>
  label?: React.ReactNode
  options?: OptionsOrGroups<Option, GroupBase<Option>>
  value?:
    | PropsValue<{
        label: string | React.ReactNode
        value: any
      }>
    | PropsValue<{ name: string; location: string; display: string }>
    | PropsValue<[id: string]>
    | PropsValue<string[]>
    | PropsValue<string>
  onChange: (newValue: MultiValue<Option> | SingleValue<Option>) => void
  onSearch?: (val: string) => void
  onFocus?: () => void
  isLoading?: boolean
  isMulti?: boolean
  required?: boolean
  classNameLabel?: string
  placeholder?: string
  messageEmtyValue?: string
  isClearable?: boolean
  disabled?: boolean
  inputDefault?: string
  className?: string
  classNameInput?: string
  intent?: 'default' | 'error' | 'success'
  message?: string
  register?: UseFormRegister<T>
  readonly?: boolean
  autoFocus?: boolean
  onBlur?: any
  size?: 'small' | 'medium' | 'large' | 'full'
  positionMenu?: 'relative' | 'absolute'
  closeMenuOnSelect?: boolean
  menuPlacement?: 'auto' | 'top' | 'bottom'
  ref?: any
  maxMenuHeight?: number
  maxMenuHeight?: number
}
export const InputSelect = <T extends FieldValues>({
  ...props
}: InputSelectProps<T>) => {
  if (props.register && props.required && props.name) {
    props.register(props.name, {
      required: {
        value: true,
        message: props.label
          ? `${props.label} là bắt buộc`
          : 'Trường này bắt buộc',
      },
    })
  }
  const filterOption = (
    option: { data: Option },
    searchText: string
  ): boolean => {
    if ('labelString' in option.data) {
      return option.data.labelString
        .toLowerCase()
        .includes(searchText.toLowerCase())
    }
    return (
      typeof option.data.label === 'string' &&
      option.data.label.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  return (
    <div className={`flex-1 flex flex-col gap-2`}>
      {props.label && (
        <label
          className={`flex gap-1 text-label-3 text-typography-label ${
            props.classNameLabel ?? ''
          }`}
          htmlFor={props.id ?? props.name}
        >
          {props.label ?? ''}

          {props.required === true && <div className="text-error-base">*</div>}
        </label>
      )}
      <Select
        ref={
          props.register && props.name
            ? props.register(props.name).ref
            : undefined
        }
        id={props.id ?? props.name}
        name={props.name}
        options={props.options}
        value={props.value}
        isMulti={props.isMulti}
        onChange={props.onChange}
        isLoading={props.isLoading}
        // placeholder={
        //   props.disabled
        //     ? null
        //     : props.placeholder ??
        //       t('input.placeholder.select', { label: '...' })
        // }
        placeholder={props.placeholder ?? 'Lựa chọn...'}
        filterOption={filterOption}
        maxMenuHeight={props.maxMenuHeight ? props.maxMenuHeight : 150}
        onBlur={props.onBlur}
        closeMenuOnSelect={props.closeMenuOnSelect}
        menuPlacement={props.menuPlacement || 'auto'}
        noOptionsMessage={() => props.messageEmtyValue ?? 'Không có dữ liệu'}
        isSearchable
        onInputChange={(value) => {
          if (props.onSearch) props.onSearch(value)
        }}
        onFocus={() => {
          if (props.onFocus) props.onFocus()
        }}
        autoFocus={props.autoFocus}
        // inputValue={props.inputDefault}
        classNames={{
          control: () =>
            inputStyles({
              intent: props.intent ?? 'default',
              disabled: props.disabled,
              size: props.size ?? 'full',
              className: props.className,
            }),
          valueContainer: () => '!py-0 !m-0',
          container: () => '!p-0',
          input: ({ isDisabled }) =>
            `!pl-1 !py-0 !m-0 text-body-3 ${props.classNameInput ?? ''} ${
              isDisabled ? '!text-typography-disabled' : '!text-typography-body'
            }`,
          singleValue: ({ isDisabled }) =>
            `text-body-3 ${props.classNameInput ?? ''} ${
              isDisabled ? '!text-typography-disabled' : '!text-typography-body'
            }`,
          indicatorSeparator: () => '!p-0 !m-0 hidden',
          // placeholder: () => '!text-typography-placeholder',
          option: () => '',

          indicatorsContainer: () =>
            '!p-0 flex items-center justify-center items-center !text-typography-body text-body-2d shadow-none',
        }}
        isClearable={props.isClearable && !props.required}
        isDisabled={props.disabled}
        defaultInputValue={props.inputDefault}
        loadingMessage={() => t('mess.loading')}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '#366AE2' : '#00358033',
            outline: '0px',
            boxShadow: '0',
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            pointerEvents: 'auto',
            color: state.isDisabled ? '#00204D40' : '#00204D',
            ':hover': {
              ...baseStyles[':hover'],
              borderColor: state.isDisabled ? 'currentColor' : '#366AE2',
            },
          }),

          placeholder: (defaultStyles, { isDisabled }) => ({
            ...defaultStyles,
            color: isDisabled ? '#00358033' : '#00204D66',
          }),

          menu: (baseStyles) => ({
            ...baseStyles,
            position: props.positionMenu ?? 'absolute',
            color: '#00204Dcc',
            zIndex: 1000,
          }),

          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isSelected
                ? '#E6EAF0'
                : isFocused
                ? '#E6EAF0dd'
                : '#FFFFFF',
              // cursor: 'pointer',
              color: isDisabled ? '#00204D40' : '#00204D',

              cursor: isDisabled ? 'not-allowed' : 'pointer',
              ':active': {
                ...styles[':active'],
                backgroundColor: '#F9FAFB',
              },
              ':hover': {
                ...styles[':hover'],
                backgroundColor: '#E6EAF0',
              },
              ':focus': {
                ...styles[':focus'],
                backgroundColor: '#E6EAF0',
              },
            }
          },

          multiValue: (base) => ({
            ...base,
            backgroundColor: '#F2F5F8',
            borderRadius: '100px',
            overflow: 'auto',
            padding: '2px 8px 2px 8px',
            margin: '4px',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#00204D99',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 450,
            lineHeight: '16px',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#00204D40',
            margin: '1px',
            ':hover': {
              color: '#00204D99',
            },
          }),
        }}
        // components={animatedComponents}
      />
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
