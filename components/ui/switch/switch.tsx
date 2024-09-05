import { Switch } from '@headlessui/react'
import { cva, VariantProps } from 'class-variance-authority'

const switchStyles = cva(
  'relative inline-flex items-center rounded-full transition-colors ease-in-out duration-100',
  {
    variants: {
      size: {
        small: 'h-5 w-9',
        large: 'h-6 w-11',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
      enabled: {
        true: '',
        false: '',
      },
    },

    defaultVariants: {
      disabled: false,
      size: 'large',
    },
    compoundVariants: [
      { disabled: false, enabled: false, className: 'bg-grey-3' },
      { disabled: false, enabled: true, className: 'bg-primary-base' },
      {
        disabled: true,
        enabled: false,
        className: 'bg-grey-disabled border border-border-1',
      },
      { disabled: true, enabled: true, className: 'bg-primary-border' },
    ],
  }
)

const thumbStyles = cva(
  'inline-block transition ease-in-out duration-100 transform rounded-full bg-white',
  {
    variants: {
      size: {
        small: 'h-4 w-4',
        large: 'h-5 w-5',
      },
      disabled: {
        true: '',
        false: '',
      },
      enabled: {
        true: '',
        false: '',
      },
    },

    defaultVariants: {
      size: 'large',
      disabled: false,
    },
    compoundVariants: [
      { size: 'small', enabled: false, className: 'translate-x-0.5' },
      { size: 'small', enabled: true, className: 'translate-x-[18px]' },
      { size: 'large', enabled: false, className: 'translate-x-0.5' },
      { size: 'large', enabled: true, className: 'translate-x-[22px]' },
      {
        disabled: true,
        enabled: false,
        className: 'bg-typography-disabled',
      },
    ],
  }
)

export type SwitchVariantProps = VariantProps<typeof switchStyles>

interface SwitchProps extends SwitchVariantProps {
  enabled: boolean
  setEnabled: (checked?: boolean) => void
  label: string
  position?: 'top' | 'left'
  classname?: string
  disabled?: boolean
  loading?: boolean
  passive?: boolean
}

export function SwitchButton(props: SwitchProps) {
  return (
    <Switch.Group>
      <div
        className={`flex ${props.position === 'left' ? '' : 'flex-col'} gap-3 ${
          props.classname
        }`}
      >
        <Switch.Label passive={props.passive} className="flex gap-1 text-label-3 text-typography-label">
          {props.label}
        </Switch.Label>
        <Switch
          checked={props.enabled}
          onChange={props.setEnabled}
          className={switchStyles({
            enabled: props.enabled,
            size: props.size,
            disabled: props.disabled,
          })}
          disabled={props.disabled || props.loading}
        >
          <span
            className={thumbStyles({
              enabled: props.enabled,
              size: props.size,
              disabled: props.disabled,
            })}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
