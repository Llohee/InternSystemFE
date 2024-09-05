// import { NotSystemAdminWrapper } from '@/components/auth/auth-wrapper'
// import { useLogoutNavigate } from '@/hooks'
// import { useGetUserDetail } from '@/hooks/query/auth'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
// import { LOCK_TENANT_VALUE } from '@/components/common/constant'
// import { NotificationMenu } from '@/components/notification/notification-menu'
import { Button } from '../button/button'
// import { UserMenu } from './user-menu'
// import { UserDetail } from '@/models/api'
import { MenuBar, MenuBarItemLink, MenuBarItems } from '../menu-bar/menu-bar'
import { useHeaderSelectedItem } from '@/hooks/zustand/header-item'
import { useGetUserDetail } from '@/hooks/query/auth'
import { useLogoutNavigate } from '@/hooks/useLogout'
import { UserMenu } from './user-menu'
// import { Tag } from '../tag'
interface HeaderProps {
  title?: string
}

export interface MenuItem {
  title?: string
  link?: string
  icon: React.ReactNode
  onClick?: Function
  name?: string
  email?: string
}

export function Header(props: HeaderProps) {
  const router = useRouter()
  // const { t } = useTranslation()
  const selectItem = useHeaderSelectedItem()
  let listItem: MenuItem[] = [
    // {
    //   title: 'Trang chủ',
    //   link: '/dashboard',
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M20.804 9.14717L12.1085 2.19076C11.9543 2.06728 11.7626 2 11.5651 2C11.3675 2 11.1758 2.06728 11.0216 2.19076L2.32608 9.14717C2.22428 9.22867 2.14212 9.33202 2.08568 9.44958C2.02923 9.56713 1.99995 9.69588 2 9.82628V21.1304C2 21.3611 2.09161 21.5822 2.25469 21.7453C2.41776 21.9084 2.63893 22 2.86955 22H8.95641V15.0436H14.1737V22H20.2606C20.4912 22 20.7124 21.9084 20.8754 21.7453C21.0385 21.5822 21.1301 21.3611 21.1301 21.1304V9.82628C21.1302 9.69588 21.1009 9.56713 21.0444 9.44958C20.988 9.33202 20.9058 9.22867 20.804 9.14717Z"
    //         fill="#00204D"
    //         fill-opacity="0.6"
    //       />
    //     </svg>
    //   ),
    // },
  ]
  useEffect(() => {
    const path = router.asPath
    if (path === '/dashboard') {
      selectItem.update(0)
    } else {
      selectItem.update(
        listItem.findIndex(
          (item, index) => path.startsWith(item.link ?? '') && index !== 0
        )
      )
    }
  }, [router])

  const userDetail = useGetUserDetail()

  const logoutNavigate = useLogoutNavigate()
  // if (userDetail.data.role == 'ST')
  //   return (
  //     <>
  //       <div className="w-full h-12 flex items-center justify-between bg-white md:px-8 border-b border-border-2 top-0 sticky z-[8000]">
  //         <div className="flex h-full items-center">
  //           <Link href={'/dashboard'} className="h-full p-2"></Link>
  //           <div className="hidden md:flex gap-2 items-center h-full">
  //             {/* {userDetail.data.role == 'ST'
  //               ? listItem.map((item, index) => {
  //                   const isSelected = index === selectItem.index
  //                   return (
  //                     <Link
  //                       key={index}
  //                       href={item.link ?? '#'}
  //                       className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
  //                         isSelected
  //                           ? 'text-primary-base border-primary-base'
  //                           : 'border-transparent text-typography-subtitle'
  //                       }`}
  //                       onClick={() => selectItem.update(index)}
  //                     >
  //                       {item.title ?? ''}
  //                     </Link>
  //                   )
  //                 })
  //               : listItem.map((item, index) => {
  //                   const isSelected = index === selectItem.index
  //                   return (
  //                     <Link
  //                       key={index}
  //                       href={item.link ?? '#'}
  //                       className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
  //                         isSelected
  //                           ? 'text-primary-base border-primary-base'
  //                           : 'border-transparent text-typography-subtitle'
  //                       }`}
  //                       onClick={() => selectItem.update(index)}
  //                     >
  //                       {item.title ?? ''}
  //                     </Link>
  //                   )
  //                 })} */}
  //           </div>
  //         </div>
  //         <div className="relative flex gap-2.5 md:gap-3 items-center">
  //           {/* <NotificationMenu /> */}
  //           {/* <div className="md:hidden">
  //             <UserMenu
  //               userDetail={userDetail.data}
  //               logoutNavigate={logoutNavigate}
  //               listItem={listItem}
  //             />
  //           </div> */}
  //           <div className="hidden md:block">
  //             <UserMenu
  //               userDetail={userDetail.data}
  //               logoutNavigate={logoutNavigate}
  //               // listItem={listItem}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   )
  return (
    <>
      <div className="w-full h-12 flex justify-between bg-grey-2 py-2 md:px-8 border-b border-border-2 top-0 sticky z-50">
        <div className="flex items-center">
          {props.title &&
            (props.title === '@title' ? (
              <div className="py-4 px-5">
                <div className=" animate-pulse bg-grey-5 h-8 w-48"></div>
              </div>
            ) : (
              <h1 className=" text-heading-6 text-typography-title truncate max-w-[50vw]">
                {props.title}
              </h1>
            ))}
        </div>
        <div className="relative flex gap-2.5 items-center">
          {/* <NotificationMenu /> */}
          <div>
            <UserMenu
              userDetail={userDetail.data}
              logoutNavigate={logoutNavigate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
