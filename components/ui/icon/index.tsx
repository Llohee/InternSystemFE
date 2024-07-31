import React from 'react'

export const SearchIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.3185 11.7106C9.40261 12.4432 8.24086 12.8813 6.97679 12.8813C4.02 12.8813 1.62305 10.4844 1.62305 7.52757C1.62305 4.57078 4.02 2.17383 6.97679 2.17383C9.93358 2.17383 12.3305 4.57078 12.3305 7.52757C12.3305 8.79168 11.8924 9.95346 11.1598 10.8694L14.9563 14.6659L14.1151 15.5072L10.3185 11.7106ZM2.81277 7.52757C2.81277 5.22785 4.67706 3.36355 6.97679 3.36355C9.27652 3.36355 11.1408 5.22785 11.1408 7.52757C11.1408 8.64911 10.6974 9.66709 9.97637 10.4158L9.86499 10.5271C9.1163 11.2482 8.09833 11.6916 6.97679 11.6916C4.67706 11.6916 2.81277 9.8273 2.81277 7.52757Z"
        fill="#00204D"
        fill-opacity="0.6"
      />
    </svg>
  )
}

export const ExcelUploadIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.15755 6.59201L8.49089 2.70312L11.8242 6.59201H9.04644V11.592H7.93533V6.59201H5.15755Z"
        fill="#00204D"
        fill-opacity="0.6"
      />
      <path
        d="M14.0464 13.8142H2.93533V10.4809H1.82422V14.3698C1.82422 14.6765 2.07311 14.9253 2.37977 14.9253H14.602C14.9087 14.9253 15.1576 14.6765 15.1576 14.3698V10.4809H14.0464V13.8142Z"
        fill="#00204D"
        fill-opacity="0.6"
      />
    </svg>
  )
}

export const Chevron = (props: { expanded?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      className={`transition-all duration-200 ease-in-out ${
        props.expanded
          ? 'fill-primary-base rotate-90'
          : 'fill-typography-subtitle rotate-0'
      } `}
    >
      <path d="M4.71615 1.86198C4.63877 1.80394 4.54675 1.7686 4.45042 1.75992C4.35409 1.75123 4.25724 1.76954 4.17072 1.8128C4.08421 1.85606 4.01145 1.92255 3.9606 2.00483C3.90975 2.08711 3.88281 2.18192 3.88281 2.27865V11.6536C3.88281 11.7504 3.90975 11.8452 3.9606 11.9275C4.01145 12.0097 4.08421 12.0762 4.17072 12.1195C4.25724 12.1628 4.35409 12.1811 4.45042 12.1724C4.54675 12.1637 4.63877 12.1283 4.71615 12.0703L10.9661 7.38281C11.0308 7.3343 11.0833 7.27139 11.1195 7.19907C11.1557 7.12675 11.1745 7.047 11.1745 6.96615C11.1745 6.88529 11.1557 6.80554 11.1195 6.73322C11.0833 6.6609 11.0308 6.59799 10.9661 6.54948L4.71615 1.86198Z" />
    </svg>
  )
}
