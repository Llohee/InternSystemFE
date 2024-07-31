import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useId } from 'react'
import { motion } from 'framer-motion'

interface ModalProps {
  title?: React.ReactNode
  isOpen: boolean
  closeModal: () => void
  className?: string
  size?: 'default' | 'large' | 'xl'
  appear?: boolean
  children: React.ReactNode
  hideBorder?: boolean
}

export function Modal(props: ModalProps) {
  const layoutId = useId()
  return (
    <>
      <Transition
        appear={props.appear ?? true}
        show={props.isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-[2000] "
          onClose={props.closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-1 flex flex-col gap-3 items-center justify-center p-4 text-center">
            <button
              type="button"
              className="flex justify-center bg-white rounded-full p-3 hover:bg-grey-3 items-center gap-1.5 whitespace-nowrap overflow-hidden tracking-wide transition-all duration-200 transform focus:outline-none active:focus:duration-0 disabled:cursor-not-allowed"
              // onClick={props.closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                // className="animate-[spin_500ms_ease-in-out]"
              >
                <path
                  d="M6.96306 6.0013L11.7995 0.402376C11.8805 0.309329 11.8124 0.167969 11.6871 0.167969H10.2168C10.1302 0.167969 10.0473 0.205545 9.9902 0.269963L6.0013 4.88832L2.01241 0.269963C1.95713 0.205545 1.87422 0.167969 1.78578 0.167969H0.315512C0.190226 0.167969 0.122055 0.309329 0.203123 0.402376L5.03955 6.0013L0.203123 11.6002C0.184963 11.621 0.173313 11.6463 0.169555 11.6733C0.165797 11.7003 0.170089 11.7277 0.181922 11.7524C0.193756 11.7771 0.212633 11.798 0.236313 11.8125C0.259992 11.8271 0.28748 11.8348 0.315512 11.8346H1.78578C1.87238 11.8346 1.95529 11.7971 2.01241 11.7326L6.0013 7.11429L9.9902 11.7326C10.0455 11.7971 10.1284 11.8346 10.2168 11.8346H11.6871C11.8124 11.8346 11.8805 11.6933 11.7995 11.6002L6.96306 6.0013Z"
                  fill="#262626"
                />
              </svg>
            </button>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <motion.div
                className={
                  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  `w-full max-w-lg ${
                    props.size === 'large' && 'md:max-w-xl lg:max-w-2xl'
                  } ${
                    props.size === 'xl' && 'md:max-w-2xl lg:max-w-4xl'
                  } transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl ${
                    props.className ?? ''
                  }`
                }
                layoutId={layoutId}
                transition={{ duration: 0.06 }}
              >
                <Dialog.Panel>
                  {props.title && (
                    <Dialog.Title
                      as="h3"
                      className={`w-full flex flex-shrink-0 items-center justify-between py-4 px-6 border-b border-border-2  bg-white z-50 text-heading-7 text-typography-title rounded-t-2xl ${
                        props.hideBorder ? '!border-none pb-1' : ''
                      }`}
                    >
                      {props.title}
                    </Dialog.Title>
                  )}
                  <div className="w-full max-h-[calc(100vh-10rem)] text-typography-body overflow-auto">
                    {props.children}
                  </div>
                </Dialog.Panel>
              </motion.div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
