import * as PopperJS from '@popperjs/core'
import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
// import './style.css'
interface TooltipProps {
  /** Tooltip's content*/
  children: React.ReactNode | string
  /** Tooltip's detail*/
  tootipDetail: React.ReactNode | string
  /** Tooltip's placement show (default= auto)*/
  placementTootip?: PopperJS.Placement
  visible?: boolean
  dark?: boolean
  display?: 'fixed' | 'absolute'
}

export const Tooltip = (props: TooltipProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: props.placementTootip ?? 'auto' })
  return (
    <>
      {props.visible != true && visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `${props.display === 'fixed' && '!fixed'} ${
              props.dark && 'dark'
            } tooltip-container p-2 rounded-md  min-w-[30px]  min-h-[20px] text-body-3 ${
              props.dark ? 'bg-[#394960] text-grey-1' : 'bg-white'
            }`,
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {props.tootipDetail}
        </div>
      )}
      <div ref={setTriggerRef} className="m-0 p-0">
        {props.children}
      </div>
    </>
  )
}
