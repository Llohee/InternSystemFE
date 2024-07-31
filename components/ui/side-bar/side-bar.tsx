import { SideBarItemType } from '@/models/ui/sidebar'
import { Disclosure, Popover } from '@headlessui/react'
import Link from 'next/link'
import { Tooltip } from '../tooltip/tooltip'
import { usePopper } from 'react-popper'
import { useState } from 'react'
export interface SideBarProps {
  header: React.ReactNode
  isOpen: boolean
  openSideBar: () => void
  closeSideBar: () => void
  footer?: React.ReactNode
  className?: string
  sidebaritems: SideBarItemType[]
  chosseSideBarItem?: SideBarItemType[]
}
export function SideBar(props: SideBarProps) {
  return (
    <div>
      {props.isOpen && (
        <div
          className="fixed lg:hidden inset-0 bg-black bg-opacity-25 opacity-100 z-[300]"
          onClick={props.closeSideBar}
        />
      )}
      <div
        className={`fixed right-0 lg:left-0 top-0 z-[1000] h-full transition-all ease-in-out duration-100 ${
          props.isOpen ? 'w-[275px]' : 'hidden lg:block lg:w-[75px]'
        } bg-brand flex flex-row ${props.className ?? ''} max-w-[100vw]`}
      >
        <div className="relative flex flex-col w-full justify-between">
          <button
            className="absolute rotate-180 lg:rotate-0 -left-5 lg:left-auto lg:-right-5 top-10 w-8 items-center p-1 justify-center bg-grey-1 shadow-lg rounded-full aspect-square"
            type="button"
            onClick={() =>
              props.isOpen ? props.closeSideBar() : props.openSideBar()
            }
          >
            {props.isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </button>

          <div className="px-2 py-8 text-white flex justify-center">
            {props.header}
          </div>
          <div
            id="side-bar"
            className="grow h-[calc(100vh_-_175px)] px-1 overflow-auto flex flex-col gap-0.5 text-typography-body"
          >
            {props.sidebaritems.map((val, index) => (
              <SideBarItem
                key={index}
                item={val}
                itemChoose={props.chosseSideBarItem}
                isOpen={props.isOpen}
                openSideBar={props.openSideBar}
              />
            ))}
          </div>
          <div>{props.footer}</div>
        </div>
      </div>
    </div>
  )
}

export interface SideBarItemProps {
  itemChoose?: SideBarItemType[]
  item: SideBarItemType
  isOpen: boolean
  openSideBar: () => void
}
const SideBarItem = (props: SideBarItemProps) => {
  const check = (currentItem: SideBarItemType) => {
    if (!props.itemChoose) return false
    if (props.itemChoose.find((e) => e === currentItem)) return true
    if (currentItem.subSideBarItem)
      for (var i = 0; i < currentItem.subSideBarItem.length; i++) {
        if (check(currentItem.subSideBarItem[i])) {
          return true
        }
      }
    return false
  }

  if (!props.item.subSideBarItem)
    return (
      <Tooltip
        tootipDetail={
          <div className="whitespace-nowrap">{props.item.text.trim()}</div>
        }
        placementTootip="right"
        visible={props.isOpen || !props.item.icon}
      >
        <Link href={props.item.link}>
          <div
            className={`flex px-5 py-3 text-left text-pretty ${
              props.isOpen || !props.item.icon
                ? 'flex-row gap-3 group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
                : 'flex-col group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
            } items-center w-full text-body-3 rounded-lg ${
              check(props.item)
                ? 'bg-grey-1/45'
                : 'text-grey-1 hover:text-grey-4 hover:bg-primary-hover'
            } justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring-opacity-75`}
          >
            <div className="flex items-center justify-center">
              {(!check(props.item)
                ? props.item.icon
                : props.item.iconFilled) ?? (
                <svg
                  className="w-2 h-2"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="currentColor" />
                </svg>
              )}
            </div>
            {props.isOpen ? (
              <span className="grow">
                <div>{props.item.text}</div>
              </span>
            ) : (
              <span className="grow">
                {!props.item.subSideBarItem && !props.item.icon && (
                  <div className="whitespace-nowrap text-left">
                    {props.item.text}
                  </div>
                )}
              </span>
            )}
          </div>
        </Link>
      </Tooltip>
    )
  if (!props.isOpen) {
    const [referenceElement, setReferenceElement] = useState<any>()
    const [popperElement, setPopperElement] = useState<any>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: `right-start`,
      modifiers: [
        {
          name: 'flip',
          options: {
            allowedAutoPlacements: ['right-end', 'right-start'],
            altBoundary: true,
          },
        },
      ],
    })
    return (
      <>
        <Popover className="group" ref={setReferenceElement}>
          {({ open }) => (
            <>
              <Tooltip
                tootipDetail={
                  <div className="whitespace-nowrap">{props.item.text}</div>
                }
                placementTootip="right-start"
                visible={props.isOpen || open}
              >
                <Popover.Button
                  className={`flex px-5 py-3 ${open && 'bg-grey-1/45'} ${
                    !props.isOpen
                      ? 'flex-col group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
                      : 'flex-row gap-3 group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
                  } items-center w-full text-body-3 rounded-lg ${
                    check(props.item)
                      ? 'bg-grey-1/45'
                      : 'text-grey-1 hover:text-grey-4 hover:bg-primary-hover'
                  } justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring-opacity-75`}
                >
                  <div className="flex items-center">
                    {!(props.isOpen || check(props.item)) ? (
                      props.item.icon
                    ) : props.item.iconFilled ? (
                      props.item.iconFilled
                    ) : (
                      <svg
                        className="w-2 h-2"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  {props.isOpen && (
                    <div className="flex items-center w-fit">
                      <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition ease-in-out duration-200`}
                      >
                        <path
                          d="M11.3134 5.53307L6.36489 0.469531C6.18525 0.286198 5.81755 0.286198 5.63931 0.469531L0.689388 5.53307C0.677207 5.54553 0.66991 5.56024 0.668305 5.57558C0.666701 5.59093 0.670852 5.6063 0.680299 5.62C0.689745 5.6337 0.704118 5.64519 0.721824 5.6532C0.73953 5.6612 0.759878 5.66541 0.780612 5.66536H1.83319C1.90476 5.66536 1.97213 5.63932 2.01423 5.59661L6.0014 1.51745L9.98856 5.59661C10.0307 5.63932 10.098 5.66536 10.1696 5.66536H11.2222C11.3134 5.66536 11.3667 5.58828 11.3134 5.53307Z"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </Popover.Button>
              </Tooltip>

              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="w-fit ml-3 min-w-52"
              >
                {props.item.subSideBarItem && (
                  <div className="flex">
                    <div className="bg-brand rounded-lg shadow-2xl divide-y divide-grey-5">
                      {!props.isOpen && (
                        <div className="px-3 py-2 text-grey-1 text-title-2">
                          {props.item.text}
                        </div>
                      )}
                      <div className="group child-sidebaritems list-inside list-none flex flex-col gap-0.5 px-1 py-2 transition ease-in-out duration-1000">
                        {props.item.subSideBarItem.map((val, index) => (
                          <SideBarItem {...props} item={val} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </>
          )}
        </Popover>
      </>
    )
  }
  return (
    <>
      <Disclosure defaultOpen={props.isOpen ? check(props.item) : false}>
        {({ open }) => (
          <div className="group sidebaritem">
            <Tooltip
              tootipDetail={props.item.text}
              placementTootip="right"
              visible={props.isOpen}
            >
              <Disclosure.Button
                onClick={props.openSideBar}
                className={`flex px-5 py-3 ${
                  !props.isOpen
                    ? 'flex-col group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
                    : 'flex-row gap-3 group-[.child-sidebaritems]:shadow-none group-[.child-sidebaritems]:py-2'
                } items-center shadow shadow-brand w-full text-body-3 rounded-lg ${
                  check(props.item)
                    ? 'bg-grey-1/45'
                    : 'text-grey-1 hover:text-grey-4 hover:bg-primary-hover'
                } justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`}
              >
                <div className="flex items-center">
                  {(!check(props.item)
                    ? props.item.icon
                    : props.item.iconFilled) ?? (
                    <svg
                      className="w-2 h-2"
                      viewBox="0 0 8 8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="4" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <span className="grow text-left text-nowrap">
                  {props.isOpen && props.item.text}
                </span>
                {props.isOpen && (
                  <div className="flex items-center ">
                    <svg
                      width="12"
                      height="6"
                      viewBox="0 0 12 6"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition ease-in-out duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M11.3134 5.53307L6.36489 0.469531C6.18525 0.286198 5.81755 0.286198 5.63931 0.469531L0.689388 5.53307C0.677207 5.54553 0.66991 5.56024 0.668305 5.57558C0.666701 5.59093 0.670852 5.6063 0.680299 5.62C0.689745 5.6337 0.704118 5.64519 0.721824 5.6532C0.73953 5.6612 0.759878 5.66541 0.780612 5.66536H1.83319C1.90476 5.66536 1.97213 5.63932 2.01423 5.59661L6.0014 1.51745L9.98856 5.59661C10.0307 5.63932 10.098 5.66536 10.1696 5.66536H11.2222C11.3134 5.66536 11.3667 5.58828 11.3134 5.53307Z"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </Disclosure.Button>
            </Tooltip>
            {props.isOpen && (
              <Disclosure.Panel className="transition-[height] ease-in-out duration-1000">
                {props.item.subSideBarItem && (
                  <ul className="group child-sidebaritems list-inside list-none py-2 transition ease-in-out duration-1000">
                    {props.item.subSideBarItem.map((val, index) => (
                      <li key={index} className="px-6">
                        <SideBarItem
                          item={val}
                          itemChoose={props.itemChoose}
                          key={index}
                          isOpen={props.isOpen}
                          openSideBar={props.openSideBar}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </Disclosure.Panel>
            )}
          </div>
        )}
      </Disclosure>
    </>
  )
}
