import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../ui/button/button'
import { motion } from 'framer-motion'
import { alertAnimationVariant } from './constant'

interface ConfirmCloseModalProps {
  isOpen: boolean
  closeModal: (y: boolean) => void
}

export const ConfirmCloseModal = (props: ConfirmCloseModalProps) => {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[2000] "
          onClose={props.closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-1 flex flex-col gap-3 items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-linear duration-[175ms]"
              leaveFrom="scale-100 brightness-100"
              leaveTo="scale-95 brightness-95"
            >
              <DialogPanel className="w-full max-w-[410px] transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl">
                <div className="w-full max-h-[calc(100vh-10rem)] overflow-auto">
                  <div className="flex flex-col justify-center items-center text-center p-6 gap-6">
                    <div className="flex flex-col gap-4 max-w-xs">
                      <div className="p-3.5 bg-warning-background rounded-full w-fit mx-auto">
                        <span className="relative flex w-12 h-12">
                          <motion.span
                            variants={alertAnimationVariant}
                            animate="ring"
                            className="absolute inline-flex h-full w-full rounded-full bg-secondary1-border opacity-75"
                          ></motion.span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="relative inline-flex w-12 h-12 text-secondary1-base "
                          >
                            <motion.path
                              variants={alertAnimationVariant}
                              animate="scaleSpring"
                              fillRule="evenodd"
                              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-heading-6 text-typography-title mb-2">
                          Thoát mà không lưu?
                        </div>
                        <div className="text-body-3 text-typography-body">
                          Thông tin bạn vừa nhập sẽ không được hệ thống lưu lại
                        </div>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <Button
                        size={'medium'}
                        intent={'grey'}
                        fullWidth
                        onClick={() => props.closeModal(false)}
                      >
                        Quay lại
                      </Button>
                      <Button
                        size={'medium'}
                        intent={'warning'}
                        type={'submit'}
                        fullWidth
                        onClick={() => {
                          props.closeModal(true)
                        }}
                      >
                        Thoát
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
