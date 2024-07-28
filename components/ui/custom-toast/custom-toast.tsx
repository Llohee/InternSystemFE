import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button/button'
import { Transition } from '@headlessui/react'
import toast, { Toaster, ToastBar, useToasterStore } from 'react-hot-toast'
import DOMPurify from 'dompurify'
import ReactHtmlParser from 'html-react-parser'

const CustomToast = () => {
  const { toasts } = useToasterStore()

  // const TOAST_LIMIT = 3

  useEffect(() => {
    // toasts
    //   .filter((t) => t.visible) // Only consider visible toasts
    //   .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
    //   .forEach((t) => {
    //     t.style = { ...t.style, color: 'pink' }
    //     console.log(t.style)
    //     // t.className = t.className + ' bg-primary-primary shake-it-off'
    //   }) // Dismiss – Use toast.remove(t.id) for no exit animation

    if (document) {
      const toastsArr = document.querySelectorAll('.go4109123758')
      toastsArr.forEach((toastElement) => {
        ;(toastElement as HTMLElement).style.zIndex = '9996'
        const mainToast =
          toastElement.querySelector('.go2072408551')?.parentElement
        if (mainToast) {
          mainToast.classList.remove('toast-1')
          mainToast.classList.remove('toast-2')
          mainToast.classList.remove('toast-3')
          mainToast.classList.add('toast-base')
          mainToast.classList.add('toast-4')
        }
      })
      const firstToast = toastsArr[0] as HTMLElement
      const secondToast = toastsArr[1] as HTMLElement
      const thirdToast = toastsArr[2] as HTMLElement
      const fourthToast = toastsArr[3] as HTMLElement
      if (firstToast) {
        firstToast.style.zIndex = '9999'
        const mainToast =
          firstToast.querySelector('.go2072408551')?.parentElement
        if (mainToast) {
          mainToast.classList.remove('toast-2')
          mainToast.classList.remove('toast-3')
          mainToast.classList.remove('toast-4')
          mainToast.classList.add('toast-base')
          mainToast.classList.add('toast-1')
        }
      }
      if (secondToast) {
        secondToast.style.zIndex = '9998'
        const mainToast =
          secondToast.querySelector('.go2072408551')?.parentElement
        if (mainToast) {
          mainToast.classList.remove('toast-1')
          mainToast.classList.remove('toast-3')
          mainToast.classList.remove('toast-4')
          mainToast.classList.add('toast-2')
        }
      }
      if (thirdToast) {
        thirdToast.style.zIndex = '9997'
        const mainToast =
          thirdToast.querySelector('.go2072408551')?.parentElement
        if (mainToast) {
          mainToast.classList.remove('toast-1')
          mainToast.classList.remove('toast-2')
          mainToast.classList.remove('toast-4')
          mainToast.classList.add('toast-3')
        }
      }
      if (fourthToast) {
        fourthToast.style.zIndex = '9996'
        const mainToast =
          fourthToast.querySelector('.go2072408551')?.parentElement
        if (mainToast) {
          mainToast.classList.remove('toast-1')
          mainToast.classList.remove('toast-2')
          mainToast.classList.remove('toast-3')
          mainToast.classList.add('toast-4')
        }
      }
    }
  }, [toasts])

  return (
    <Toaster
      position="bottom-right"
      gutter={0}
      containerClassName="group"
      toastOptions={{
        // duration: Infinity,
        className:
          '!py-2 !pt-3 !px-4 shadow-lg !min-w-[382px] text-typography-label text-body-3',
      }}
    >
      {(t) => {
        let toastHeader = ''

        switch (t.type) {
          case 'success':
            toastHeader = 'Thành công'
            break
          case 'error':
            toastHeader = 'Lỗi'
            break
          case 'loading':
            toastHeader = 'Đang xử lý'
            break
          case 'blank':
            toastHeader = t.id === 'noti-alert-variant' ? 'Lưu ý' : 'Thông báo'
            break

          default:
            toastHeader = 'Invalid header'
            break
        }

        return (
          <Transition
            // className="pb-2"
            appear
            show={t.visible}
            enter="ease-out transition duration-300"
            enterFrom="opacity-80 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in transition duration-150 origin-bottom"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 scale-50"
          >
            <div className="py-1">
              <ToastBar
                style={{
                  ...t.style,
                  animation: t.visible ? 'custom-enter' : 'custom-exit',
                }}
                toast={t}
              >
                {({ icon, message }) => (
                  <div
                    id="toastContent"
                    className="flex items-start w-full opacity-0 duration-[230ms] ease-in-out group-has-[.toast-1:hover,.toast-2:hover,.toast-3:hover]:opacity-100"
                  >
                    {icon}
                    {['success', 'error', 'loading', 'blank'].includes(
                      t.type
                    ) ? (
                      <div className="-mt-1 flex-1 flex flex-col">
                        <div className="flex items-start justify-between">
                          <p className="text-heading-8 text-typography-title mx-2.5 my-1">
                            {toastHeader}
                          </p>
                          {t.type !== 'loading' && (
                            <Button
                              id="dismissAllToast"
                              size="xs"
                              intent="grey"
                              btnStyle="no-background"
                              onClick={() => toast.dismiss()}
                              className="hidden mx-2.5 my-1 opacity-0 duration-[230ms] ease-in-out group-has-[.toast-1:hover,.toast-2:hover,.toast-3:hover]:opacity-100"
                            >
                              Bỏ tất cả
                            </Button>
                          )}
                        </div>
                        {/* <div className="w-fit text-pretty">{message}</div> */}
                        {t.type === 'error' ? (
                          <div className="w-fit text-pretty flex">
                            {typeof message !== 'string' && message !== null
                              ? React.createElement(
                                  message.type,
                                  message.props,
                                  ReactHtmlParser(
                                    DOMPurify.sanitize(message.props.children)
                                  )
                                )
                              : message}
                          </div>
                        ) : (
                          <div className="w-fit text-pretty">{message}</div>
                        )}
                      </div>
                    ) : (
                      <div className="-mt-1 flex-1">
                        <div className="w-fit text-pretty">{message}</div>
                      </div>
                    )}
                    {t.type !== 'loading' && (
                      <Button
                        iconOnly
                        ariaLabel="dismiss notification"
                        intent="grey"
                        btnStyle="no-background"
                        onClick={() => toast.dismiss(t.id)}
                        className="opacity-0 duration-[230ms] ease-in-out group-has-[.toast-1:hover,.toast-2:hover,.toast-3:hover]:opacity-100"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.94291 8.0001L13.6096 3.33343L12.6668 2.39062L8.0001 7.05729L3.33343 2.39062L2.39062 3.33343L7.05729 8.0001L2.39062 12.6668L3.33343 13.6096L8.0001 8.94291L12.6668 13.6096L13.6096 12.6668L8.94291 8.0001Z" />
                        </svg>
                      </Button>
                    )}
                  </div>
                )}
              </ToastBar>
            </div>
          </Transition>
        )
      }}
    </Toaster>
  )
}

export default CustomToast
