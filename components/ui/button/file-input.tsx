import React from 'react'

export const FileInput = () => {
  return (
    <input
      type="file"
      className="block w-fit text-typography-secondary
      file:text-button-2 file:px-[24px] file:py-[8px] file:rounded-lg
      file:border-0 file:mr-4
      file:bg-info-background file:text-info-base
      hover:file:cursor-pointer
    "
    />
  )
}
