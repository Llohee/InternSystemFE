import { stringToRGB } from '@/components/common/get-initial'
import React from 'react'
import color from 'tinycolor2'
import hash from 'string-hash'
import { VariantProps, cva } from 'class-variance-authority'

const avatarStyles = cva(
  'flex justify-center items-center rounded-full select-none shrink-0',
  {
    variants: {
      size: {
        xs: 'size-6 aspect-square text-[11px]',
        small: 'size-9',
        medium: 'size-14 text-heading-5',
        large: 'size-36 text-[100px] font-bold',
      },
      noName: {
        true: '!bg-none !bg-brand-background animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'small',
      noName: false,
    },
  }
)

export interface AvatarProps extends VariantProps<typeof avatarStyles> {
  name?: string
  className?: string
}

// const Avatar = (props: AvatarProps) => {
//   let name = (props.name ?? '').toUpperCase().trim()
//   const backgroundColor = stringToRGB(name)
//   const text = name.toString().substring(0, 1).toUpperCase()
//   return (
//     <>
//       <div
//         style={{ backgroundColor: `#${backgroundColor}` }}
//         className={`flex justify-center items-center w-8 h-8 rounded-full select-none ${props.className}`}
//       >
//         <div className="text-white text-sm flex justify-center items-center">
//           {text}
//         </div>
//       </div>
//     </>
//   )
// }

const Avatar = (props: AvatarProps) => {
  let name = (props.name ?? '').replace(/\s/g, '').toUpperCase().trim()
  // Generate an integer hash code number
  const hashed = hash(name)

  const colors = ['#4D7AE5', '#FD7A1C', '#40BF79', '#B87DE8', '#E4584E']
  // Generate gradient colors
  const c = color(colors[hashed % colors.length]).desaturate(15)
  // const c = color({ h: hashed % 360, s: 0.5, l: 0.6 })
  const c1 = c.toHexString()
  const c2 = c.triad()[1].toHexString()

  let text
  const words = (props.name ?? '').toUpperCase().trim().split(' ')
  if (words.length === 1) {
    text = words[0].charAt(0)
  } else {
    let firstChar = words[0].charAt(0)
    let lastChar = words[words.length - 1].charAt(0)
    if (!/[A-Za-z]/.test(lastChar)) {
      lastChar = ''
    }
    text = `${firstChar}${lastChar}`
  }

  return (
    <div
      role="img"
      aria-label={props.name || 'undefined person avatar'}
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 140%)`,
      }}
      // className={`flex justify-center items-center size-9 rounded-full select-none ${
      //   props.className
      // } ${
      //   props.name ||
      //   '!bg-none !bg-brand-background animate-[pulse_7s_cubic-bezier(0.4,0,0.6,1)_infinite]'
      // }`}
      className={avatarStyles({
        noName: !props.name,
        className: props.className,
        size: props.size,
      })}
    >
      {props.name ? (
        <div className="text-white font-semibold flex justify-center items-center">
          {text}
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="fill-white stroke-none size-[60%]"
        >
          <path d="M17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" />
          <path d="M3.66699 19.222C3.66699 17.177 6.37533 13.667 12.0003 13.667C17.6253 13.667 20.3337 17.177 20.3337 19.222V20.3337C20.3337 20.7757 20.1581 21.1996 19.8455 21.5122C19.5329 21.8247 19.109 22.0003 18.667 22.0003H5.33366C4.89163 22.0003 4.46771 21.8247 4.15515 21.5122C3.84259 21.1996 3.66699 20.7757 3.66699 20.3337V19.222Z" />
        </svg>
      )}
    </div>
  )
}

export default Avatar
