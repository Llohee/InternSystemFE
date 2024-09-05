import { cva, VariantProps } from 'class-variance-authority'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './pagination.module.scss'
import { BackgroundFetchingSpinner } from '../spinner/spinner'

interface paginationProps {
  label?: React.ReactNode
  totalPage: number
  /** pageCurrent range start = 1 and end = totalPage*/
  pageCurrent?: number
  /** page change range start = 1 and end = totalPage*/
  changePage: (page: number) => void
  showGotoPageInput?: boolean
  maxShow?: number
  isPreviousData?: boolean
}

export const Pagination = ({
  showGotoPageInput = false,
  pageCurrent = 1,
  ...props
}: paginationProps) => {
  const [gotoPageInput, setGotoPageInput] = useState<number | undefined>(
    undefined
  )

  // if user delete records, sync so that user wont see an empty page
  useEffect(() => {
    if (pageCurrent > props.totalPage && pageCurrent > 1) {
      props.changePage(pageCurrent - 1)
    }
  }, [props.totalPage])

  const onGotoPageInputSubmit = () => {
    const value = Math.max(
      1,
      Math.min(props.totalPage, Number(gotoPageInput || pageCurrent))
    )
    setGotoPageInput(undefined)
    props.changePage(value)
  }

  const listPage = getPageRange(pageCurrent, props.totalPage, props.maxShow)
  const isPreviousData = props.isPreviousData || false
  return (
    <div className="flex gap-2 items-center w-full pt-2">
      <div className=" grow text-body-3 text-typography-body">
        {props.label}
      </div>
      {isPreviousData && <BackgroundFetchingSpinner />}
      <div className="flex gap-1 items-center">
        <PaginationItem
          label={
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-3"
            >
              <path
                d="M7.33317 1.83411V0.47427C7.33317 0.356406 7.22533 0.291316 7.1525 0.363442L0.838792 6.55749C0.785149 6.60989 0.741742 6.67698 0.711884 6.75366C0.682025 6.83033 0.666504 6.91456 0.666504 6.99992C0.666504 7.08527 0.682025 7.1695 0.711884 7.24618C0.741742 7.32285 0.785149 7.38995 0.838792 7.44235L7.1525 13.6364C7.22673 13.7085 7.33317 13.6434 7.33317 13.5256V12.1657C7.33317 12.0795 7.30096 11.9968 7.24774 11.9441L2.20574 7.0008L7.24774 2.05577C7.30096 2.00299 7.33317 1.92031 7.33317 1.83411V1.83411Z"
                fill="#8C8C8C"
              />
            </svg>
          }
          isCurrentPage={false}
          disabled={pageCurrent <= 1 || isPreviousData}
          onClick={() => props.changePage && props.changePage(pageCurrent - 1)}
        />
        {listPage?.map((val, index) => (
          <PaginationItem
            key={index}
            label={val.pagenumber >= 0 ? val.pagenumber : '...'}
            isCurrentPage={val.pagenumber === pageCurrent}
            disabled={val.pagenumber < 0 || isPreviousData}
            onClick={() => {
              props.changePage && props.changePage(val.pagenumber)
            }}
          />
        ))}
        <PaginationItem
          label={
            <svg
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-3"
            >
              <path
                d="M7.16086 6.55659L0.847176 0.363291C0.830678 0.346979 0.810851 0.336842 0.789973 0.334044C0.769094 0.331245 0.748011 0.335899 0.729143 0.347472C0.710276 0.359044 0.69439 0.377065 0.68331 0.399465C0.67223 0.421865 0.666406 0.447736 0.666505 0.474106V1.83378C0.666505 1.91997 0.698718 2.00264 0.751939 2.05541L5.79392 6.99985L0.751939 11.9443C0.697317 11.997 0.666505 12.0797 0.666505 12.1659V13.5256C0.666505 13.6434 0.774348 13.7085 0.847176 13.6364L7.16086 7.4431C7.21452 7.39053 7.25793 7.32329 7.28779 7.24648C7.31765 7.16967 7.33317 7.08532 7.33317 6.99985C7.33317 6.91437 7.31765 6.83002 7.28779 6.75321C7.25793 6.67641 7.21452 6.60916 7.16086 6.55659Z"
                fill="#8C8C8C"
              />
            </svg>
          }
          isCurrentPage={false}
          disabled={pageCurrent >= props.totalPage || isPreviousData}
          onClick={() => props.changePage && props.changePage(pageCurrent + 1)}
        />
        {showGotoPageInput && (
          <div className={styles['input-number-no-arrow']}>
            <div className="flex items-center gap-3 pl-3 border-l border-border-1">
              <span className="text-label-3 text-typography-subtitle">
                Đi tới trang
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min={1}
                value={gotoPageInput !== undefined ? gotoPageInput : ''}
                disabled={isPreviousData}
                onChange={(event) => {
                  // @ts-ignore
                  if (!isNaN(event.target.value)) {
                    setGotoPageInput(Number(event.target.value))
                  } else {
                    setGotoPageInput(undefined)
                  }
                }}
                onBlur={onGotoPageInputSubmit}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onGotoPageInputSubmit()
                  }
                }}
                className="w-16 py-1 px-4 text-body-3 text-center bg-grey-1 border-border-1 border rounded-md transition-all focus-within:border-primary-base"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
const paginationItemStyles = cva(
  'flex items-center justify-center w-8 h-8 text-button-3 rounded-lg tracking-wide transition-colors duration-200 transform focus:outline-none active:focus:duration-0',
  {
    variants: {
      isCurrentPage: {
        true: 'text-primary-base bg-primary-background cursor-auto select-none',
        false: 'bg-transparent',
      },
      disabled: {
        true: 'opacity-25 cursor-auto',
        false: '',
      },
    },
    compoundVariants: [
      {
        isCurrentPage: false,
        disabled: false,
        className: 'hover:bg-grey-4 active:bg-grey-5',
      },
    ],
    defaultVariants: {
      isCurrentPage: true,
      disabled: false,
    },
  }
)
interface paginationItemProps
  extends VariantProps<typeof paginationItemStyles> {
  label: string | number | React.ReactNode
  isCurrentPage: boolean
  disabled: boolean
  onClick?: () => void
}

const PaginationItem = (props: paginationItemProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        props.onClick && !props.disabled && props.onClick()
      }}
      className={paginationItemStyles({
        isCurrentPage: props.isCurrentPage,
        disabled: props.disabled,
      })}
    >
      {props.label}
    </button>
  )
}

function getPageRange(currentPage: number, pageLength: number, maxShow = 5) {
  if (currentPage <= 0) return []
  if (currentPage > pageLength) return []
  if (pageLength < maxShow)
    return [...Array(pageLength)].map((x, index) => ({
      pagenumber: index + 1,
      key: (index + 1).toString(),
    }))
  if (maxShow > pageLength) maxShow = pageLength
  var minRange = currentPage - 1
  var maxRange = currentPage === pageLength ? currentPage : currentPage + 1
  while (minRange < 3) {
    minRange++
    maxRange++
  }
  minRange > 1 && maxShow--
  maxRange < pageLength - 1 && maxShow--
  if (minRange + maxShow > pageLength) {
    maxShow = 4
    minRange = pageLength - maxShow
  }

  let arrayPage = [...Array(maxShow)].map((x, index) => ({
    pagenumber: minRange + index,
    key: (minRange + index).toString(),
  }))

  if (minRange > 2) {
    minRange === 3
      ? arrayPage.unshift({ pagenumber: 2, key: '2' })
      : arrayPage.unshift({ pagenumber: -1, key: 'hasPreviousPage' })
  }
  minRange > 1 && arrayPage.unshift({ pagenumber: 1, key: 'start' })
  if (maxRange < pageLength - 1) {
    arrayPage.push({ pagenumber: -2, key: 'hasNextPage' })
  }
  maxRange <= pageLength &&
    arrayPage.push({ pagenumber: pageLength, key: 'end' })
  return arrayPage
}
