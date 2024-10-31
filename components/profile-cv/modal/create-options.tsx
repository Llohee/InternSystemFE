import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { checkboxStyle } from '@/components/ui/input/input-choose'
import { Modal } from '@/components/ui/modal/modal'
import React, { useState, useEffect } from 'react'

const CreateOptions = (props: {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (options: { name: string; label: string }[]) => void
  optionsUsed: { name: string; label: string }[]
}) => {
  // Initialize options with props.optionsUsed when modal is opened
  const [options, setOptions] = useState<{ name: string; label: string }[]>([])

  useEffect(() => {
    if (props.isOpen) {
      setOptions(props.optionsUsed) // Initialize with already used options
    }
  }, [props.isOpen, props.optionsUsed])

  const listOptions = [
    {
      name: 'skill_pro',
      label: 'Chuyên môn',
    },
    {
      name: 'skill_diff',
      label: 'Kỹ năng khác',
    },
    {
      name: 'certificate',
      label: 'Chứng chỉ',
    },
    {
      name: 'project',
      label: 'Dự án',
    },
    {
      name: 'infomation_add',
      label: 'Thông tin thêm',
    },
  ]

  const handleCheckboxChange = (
    name: string,
    label: string,
    isChecked: boolean
  ) => {
    setOptions((prev) => {
      if (isChecked) {
        return [...prev, { name, label }]
      } else {
        return prev.filter((option) => option.name !== name)
      }
    })
  }

  const handleSubmit = () => {
    props.onSubmit(options)
    props.closeModal()
  }

  const unusedOptions = listOptions.filter(
    (option) => !props.optionsUsed.some((opt) => opt.name === option.name)
  )

  return (
    <div>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Thêm mục
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size="large"
      >
        <ContainerFormBody>
          <div className="flex flex-col gap-4">
            <div className="relative whitespace-nowrap overflow-hidden tracking-wide transition-all disabled:cursor-not-allowed bg-grey-2 shadow-grey-2 enabled:hover:bg-grey-4 enabled:active:bg-grey-5  border-grey-3 enabled:hover:border-primary-hover enabled:active:border-primary-pressed text-typography-subtitle enabled:hover:text-primary-hover enabled:active:text-primary-pressed enabled:hover:fill-primary-hover enabled:active:fill-primary-pressed enabled:hover:stroke-primary-hover enabled:active:stroke-primary-pressed text-button-1 px-[20px] py-[9px] rounded-lg">
              Mục chưa sử dụng
            </div>
            <div className="flex flex-col gap-4 px-4">
              {unusedOptions.length > 0 ? (
                unusedOptions.map((option) => (
                  <div
                    key={option.name}
                    className="cursor-pointer shadow-sm bg-grey-1 hover:bg-grey-hover px-4 py-2 rounded-lg flex items-center justify-between"
                  >
                    {option.label}
                    <input
                      type="checkbox"
                      checked={options.some((opt) => opt.name === option.name)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          option.name,
                          option.label,
                          e.target.checked
                        )
                      }
                      className={checkboxStyle()}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-grey-5">
                  Không còn mục nào chưa sử dụng.
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative whitespace-nowrap overflow-hidden tracking-wide transition-all disabled:cursor-not-allowed bg-grey-2 shadow-grey-2 enabled:hover:bg-grey-4 enabled:active:bg-grey-5  border-grey-3 enabled:hover:border-primary-hover enabled:active:border-primary-pressed text-typography-subtitle enabled:hover:text-primary-hover enabled:active:text-primary-pressed enabled:hover:fill-primary-hover enabled:active:fill-primary-pressed enabled:hover:stroke-primary-hover enabled:active:stroke-primary-pressed text-button-1 px-[20px] py-[9px] rounded-lg">
              Mục đã sử dụng
            </div>
            <div className="flex flex-col gap-4 px-4">
              {props.optionsUsed.length > 0 ? (
                props.optionsUsed.map((option) => (
                  <div
                    key={option.name}
                    className="cursor-pointer shadow-sm bg-grey-1 px-4 py-2 rounded-lg flex items-center justify-between text-typography-disabled"
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="text-center text-grey-5 col-span-2">
                  Không có mục nào đã sử dụng.
                </div>
              )}
            </div>
          </div>
        </ContainerFormBody>
        <ContainerFormFooter>
          <Button intent={'grey'} onClick={props.closeModal}>
            Hủy
          </Button>
          <Button intent={'primary'} onClick={handleSubmit}>
            Thêm
          </Button>
        </ContainerFormFooter>
      </Modal>
    </div>
  )
}

export default CreateOptions
