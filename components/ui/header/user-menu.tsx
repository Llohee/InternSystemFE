import { UserDetail } from '@/models/api'
import { MenuItem } from './header'
import { Fragment, useState } from 'react'
import { Menu, MenuButton, Transition } from '@headlessui/react'
import InitialImage from '@/components/common/get-initial'
import Link from 'next/link'
import {
  MenuBar,
  MenuBarItem,
  MenuBarItemLink,
  MenuBarItems,
} from '../menu-bar/menu-bar'

export const UserMenu = (props: {
  userDetail: UserDetail
  logoutNavigate: () => void
  listItem?: MenuItem[]
}) => {
  const listMenuItems: MenuItem[] = [
    {
      title: 'Thông tin',
      link: '/profile',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
            fill="#00204D"
            fill-opacity="0.6"
          />
          <path
            d="M3.66699 19.222C3.66699 17.177 6.37533 13.667 12.0003 13.667C17.6253 13.667 20.3337 17.177 20.3337 19.222V20.3337C20.3337 20.7757 20.1581 21.1996 19.8455 21.5122C19.5329 21.8247 19.109 22.0003 18.667 22.0003H5.33366C4.89163 22.0003 4.46771 21.8247 4.15515 21.5122C3.84259 21.1996 3.66699 20.7757 3.66699 20.3337V19.222Z"
            fill="#00204D"
            fill-opacity="0.6"
          />
        </svg>
      ),
      name: props.userDetail.fullname,
      email: props.userDetail.email,
    },
    // {
    //   title: 'Thay đổi mật khẩu',
    //   link: '/update-password',
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M17.4943 2L10.5627 8.93159C9.14041 8.51102 7.61847 8.57644 6.23746 9.11753C4.85646 9.65861 3.69516 10.6445 2.93711 11.9194C2.17905 13.1942 1.86748 14.6854 2.05162 16.1571C2.23577 17.6289 2.90514 18.9973 3.95393 20.0461C5.00273 21.0949 6.37113 21.7642 7.84288 21.9484C9.31462 22.1325 10.8058 21.8209 12.0806 21.0629C13.3555 20.3048 14.3414 19.1435 14.8825 17.7625C15.4236 16.3815 15.489 14.8596 15.0684 13.4373L17.0067 11.499V8.65779H19.8479L22 6.50566V2H17.4943ZM8.68442 17.8123C8.19063 17.8123 7.70792 17.6658 7.29734 17.3915C6.88677 17.1171 6.56676 16.7272 6.3778 16.271C6.18883 15.8148 6.13939 15.3128 6.23572 14.8285C6.33206 14.3442 6.56984 13.8993 6.91901 13.5502C7.26817 13.201 7.71304 12.9632 8.19734 12.8669C8.68165 12.7705 9.18365 12.82 9.63986 13.009C10.0961 13.1979 10.486 13.5179 10.7603 13.9285C11.0347 14.3391 11.1811 14.8218 11.1811 15.3156C11.1811 15.9777 10.9181 16.6128 10.4498 17.081C9.98162 17.5492 9.34658 17.8123 8.68442 17.8123Z"
    //         fill="#00204D"
    //         fill-opacity="0.6"
    //       />
    //     </svg>
    //   ),
    // },
    {
      title: 'Đăng xuất',
      onClick: props.logoutNavigate,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17316C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8078C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9971 9.34871 20.9426 6.80684 19.0679 4.9321C17.1932 3.05736 14.6513 2.00287 12 2V2ZM11.1667 5.33333H12.8333V12H11.1667V5.33333ZM12 17.8333C10.8739 17.8333 9.77188 17.5073 8.82697 16.8948C7.88206 16.2822 7.13466 15.4092 6.67497 14.3812C6.21529 13.3532 6.06299 12.2141 6.23645 11.1015C6.40991 9.9888 6.90172 8.95013 7.6525 8.11083L8.20834 7.49L9.45 8.60167L8.89417 9.2225C8.35762 9.82192 8.00607 10.5638 7.88196 11.3587C7.75786 12.1535 7.86651 12.9673 8.1948 13.7018C8.52308 14.4362 9.05697 15.0599 9.73198 15.4976C10.407 15.9352 11.1943 16.1681 11.9988 16.1681C12.8032 16.1681 13.5905 15.9352 14.2655 15.4976C14.9405 15.0599 15.4744 14.4362 15.8027 13.7018C16.131 12.9673 16.2396 12.1535 16.1155 11.3587C15.9914 10.5638 15.6399 9.82192 15.1033 9.2225L14.5475 8.6025L15.7883 7.49L16.3442 8.11083C17.0948 8.94992 17.5865 9.98828 17.7601 11.1006C17.9337 12.213 17.7816 13.3518 17.3224 14.3797C16.8631 15.4076 16.1162 16.2806 15.1718 16.8934C14.2274 17.5062 13.1258 17.8327 12 17.8333Z"
            fill="#00204D"
            fill-opacity="0.6"
          />
        </svg>
      ),
    },
  ]
  return (
    <>
      <div className="flex gap-4">
        <MenuBar>
          <MenuButton className="flex w-full h-full justify-center items-center text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 p-3">
            {props.listItem ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFFF"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <InitialImage name={props.userDetail.fullname} />
            )}
          </MenuButton>
          <MenuBarItems className="!w-72 !mt-4">
            {[...(props.listItem ?? []), ...listMenuItems].map((val, index) =>
              val.link ? (
                <MenuBarItemLink
                  onClick={() => val.onClick?.()}
                  href={val.link ?? '#'}
                >
                  <div className="my-auto text-typography-title">
                    {val.icon}
                  </div>

                  <div className="flex flex-col text-subtitle-3 text-typography-title">
                    {!val.name && val.title && val.title}
                    <div>{val.name && val.name}</div>
                    <div className="text-body-3 text-typography-subtitle truncate max-w-[180px]">
                      {val.email && val.email}
                    </div>
                  </div>
                </MenuBarItemLink>
              ) : (
                <MenuBarItem as="button" onClick={() => val.onClick?.()}>
                  <div className="my-auto text-typography-title">
                    {val.icon}
                  </div>
                  <div className="text-subtitle-3 text-typography-title">
                    {val.title}
                  </div>
                </MenuBarItem>
              )
            )}
          </MenuBarItems>
        </MenuBar>
      </div>
    </>
  )
}
