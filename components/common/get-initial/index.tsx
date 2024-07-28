import Avatar, { AvatarProps } from '@/components/ui/avatar/avatar'
import React from 'react'
import hash from 'string-hash'
import color from 'tinycolor2'

const InitialImage = (props: AvatarProps) => {
  return <Avatar {...props} />
}

export default InitialImage

export const stringToRGB = (str: string) => {
  // var hash = 0
  // for (var i = 0; i < str.length; i++) {
  //   hash = str.toUpperCase().charCodeAt(i) + ((hash << 5) - hash)
  // }
  if (str) {
    const hashed = hash(str)

    var color = ''
    for (var i = 0; i < 3; i++) {
      var value = (hashed >> (i * 8)) & 0xff
      color += ('8' + value.toString(16)).substring(-2)
    }

    return color.substring(0, 6)
  } else {
    return 'edf2fd'
  }
}

// Using the Design System colors
export const stringToRGB2 = (str: string) => {
  // var hash = 0
  // for (var i = 0; i < str.length; i++) {
  //   hash = str.toUpperCase().charCodeAt(i) + ((hash << 5) - hash)
  // }
  if (str) {
    const hashed = hash(str)

    const colors = ['#4D7AE5', '#FD7A1C', '#40BF79', '#B87DE8', '#E4584E']
    const c = color(colors[hashed % colors.length]).desaturate(15)
    // const c = color({ h: hashed % 360, s: 0.5, l: 0.6 })
    return c.toHexString()
  } else {
    return 'edf2fd'
  }
}