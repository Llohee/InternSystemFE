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
import logoFull from 'public/images/Logo-full.svg'
import { Button } from '../button/button'
// import { UserMenu } from './user-menu'
// import { UserDetail } from '@/models/api'
import { MenuBar, MenuBarItemLink, MenuBarItems } from '../menu-bar/menu-bar'
import { useHeaderSelectedItem } from '@/hooks/zustand/header-item'
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

interface HeaderItem {
  title?: string
  link: string
}

export function Header(props: HeaderProps) {
  const router = useRouter()
  // const { t } = useTranslation()
  const selectItem = useHeaderSelectedItem()
  let listItem: MenuItem[] = [
    {
      title: 'Trang chủ',
      link: '/dashboard',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.804 9.14717L12.1085 2.19076C11.9543 2.06728 11.7626 2 11.5651 2C11.3675 2 11.1758 2.06728 11.0216 2.19076L2.32608 9.14717C2.22428 9.22867 2.14212 9.33202 2.08568 9.44958C2.02923 9.56713 1.99995 9.69588 2 9.82628V21.1304C2 21.3611 2.09161 21.5822 2.25469 21.7453C2.41776 21.9084 2.63893 22 2.86955 22H8.95641V15.0436H14.1737V22H20.2606C20.4912 22 20.7124 21.9084 20.8754 21.7453C21.0385 21.5822 21.1301 21.3611 21.1301 21.1304V9.82628C21.1302 9.69588 21.1009 9.56713 21.0444 9.44958C20.988 9.33202 20.9058 9.22867 20.804 9.14717Z"
            fill="#00204D"
            fill-opacity="0.6"
          />
        </svg>
      ),
    },
    // {
    //   title: t('layout.header.solution'),
    //   link: '/knowledge-record',
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M10.3323 17.4168C10.3315 16.3898 10.5841 15.3783 11.0676 14.4722C11.5511 13.566 12.2506 12.7931 13.1042 12.2219C13.9578 11.6507 14.9391 11.2989 15.9612 11.1976C16.9833 11.0963 18.0146 11.2487 18.9637 11.6412L20.9936 9.66212C21.0862 9.57182 21.1517 9.45742 21.1827 9.33184C21.2137 9.20627 21.2089 9.07453 21.1689 8.95152C21.129 8.82851 21.0554 8.71913 20.9565 8.63574C20.8577 8.55236 20.7374 8.49829 20.6094 8.47966L14.8155 7.63802L12.2231 2.38738C12.166 2.27116 12.0776 2.17325 11.9677 2.10477C11.8578 2.0363 11.7309 2 11.6014 2C11.472 2 11.3451 2.0363 11.2352 2.10477C11.1253 2.17325 11.0368 2.27116 10.9798 2.38738L8.38822 7.63719L2.59343 8.47966C2.46544 8.49829 2.34521 8.55236 2.24634 8.63574C2.14747 8.71913 2.07389 8.82851 2.03392 8.95152C1.99396 9.07453 1.9892 9.20627 2.02019 9.33184C2.05118 9.45742 2.11668 9.57182 2.20928 9.66212L6.40246 13.7453L5.41583 19.5209C5.39545 19.6474 5.41048 19.7771 5.45925 19.8956C5.50802 20.014 5.58864 20.1167 5.69216 20.1922C5.79569 20.2677 5.91809 20.3131 6.04581 20.3233C6.17353 20.3335 6.30159 20.3081 6.41579 20.2501L10.3798 18.1668C10.3489 17.918 10.333 17.6676 10.3323 17.4168Z"
    //         fill-opacity="0.6"
    //       ></path>
    //       <path
    //         d="M16.582 12.8337C15.6755 12.8337 14.7894 13.1025 14.0357 13.6062C13.282 14.1098 12.6946 14.8256 12.3477 15.663C12.0008 16.5005 11.91 17.422 12.0869 18.311C12.2637 19.2001 12.7002 20.0167 13.3412 20.6577C13.9822 21.2987 14.7988 21.7352 15.6879 21.912C16.5769 22.0889 17.4984 21.9981 18.3359 21.6512C19.1734 21.3043 19.8891 20.7169 20.3927 19.9632C20.8964 19.2095 21.1652 18.3234 21.1652 17.4169C21.1652 16.2014 20.6823 15.0356 19.8228 14.1761C18.9633 13.3166 17.7975 12.8337 16.582 12.8337ZM18.6652 18.6669H14.4987V17.8336H18.6652V18.6669ZM18.6652 17.0003H14.4987V16.167H18.6652V17.0003Z"
    //         fill-opacity="0.6"
    //       ></path>
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

  // const userDetail = useGetUserDetail()

  // const logoutNavigate = useLogoutNavigate()
  const [listMenuItems] = useState<MenuItem[]>([
    {
      title: 'layout.header.profile',
      link: '/profile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      // name: userDetail.data.fullname,
      // email: userDetail.data.email,
    },
    {
      title: 'layout.header.update_password',
      link: '/update-password',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
      ),
    },
    {
      title: 'layout.logout',
      // onClick: logoutNavigate,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          width="19"
          height="19"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ])
  // if (userDetail.data.layout === 'CUSTOMER')
  //   return (
  //     <>
  //       <div className="w-full h-12 flex items-center justify-between bg-white md:px-8 border-b border-border-2 top-0 sticky z-[8000]">
  //         <div className="flex h-full items-center">
  //           <Link href={'/dashboard'} className="h-full p-2">
  //             <Image
  //               src={logoFull}
  //               alt={'logo aka247'}
  //               className={'block h-full w-fit'}
  //             />
  //           </Link>
  //           <div className="hidden md:flex gap-2 items-center h-full">
  //             {userDetail.data.layout == 'CUSTOMER' &&
  //             !userDetail.data.permission.knowledge.view_knowledge
  //               ? listItem
  //                   ?.filter((e) => e.link !== '/knowledge-record')
  //                   ?.filter(
  //                     (e) =>
  //                       !(
  //                         (LOCK_TENANT_VALUE ?? '').includes(
  //                           `<${userDetail.data.tenant}>`
  //                         ) && e.link === '/incident/ticket'
  //                       )
  //                   )
  //                   .map((item, index) => {
  //                     const isSelected = index === selectItem.index
  //                     return (
  //                       <Link
  //                         key={index}
  //                         href={item.link ?? '#'}
  //                         className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
  //                           isSelected
  //                             ? 'text-primary-base border-primary-base'
  //                             : 'border-transparent text-typography-subtitle'
  //                         }`}
  //                         onClick={() => selectItem.update(index)}
  //                       >
  //                         {t(item.title ?? '')}
  //                       </Link>
  //                     )
  //                   })
  //               : listItem
  //                   ?.filter(
  //                     (e) =>
  //                       !(
  //                         (LOCK_TENANT_VALUE ?? '').includes(
  //                           `<${userDetail.data.tenant}>`
  //                         ) && e.link === '/incident/ticket'
  //                       )
  //                   )
  //                   .map((item, index) => {
  //                     const isSelected = index === selectItem.index
  //                     return (
  //                       <Link
  //                         key={index}
  //                         href={item.link ?? '#'}
  //                         className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
  //                           isSelected
  //                             ? 'text-primary-base border-primary-base'
  //                             : 'border-transparent text-typography-subtitle'
  //                         }`}
  //                         onClick={() => selectItem.update(index)}
  //                       >
  //                         {t(item.title ?? '')}
  //                       </Link>
  //                     )
  //                   })}
  //           </div>
  //         </div>
  //         <div className="relative flex gap-2.5 md:gap-3 items-center">
  //           <div className="md:scale-75 flex">
  //             <SwitchLocale />
  //           </div>
  //           <NotificationMenu />
  //           <div className=" gap-2 hidden md:flex">
  //             <CreateTicket userDetail={userDetail.data} />
  //           </div>

  //           <div className="md:hidden">
  //             <UserMenu
  //               userDetail={userDetail.data}
  //               logoutNavigate={logoutNavigate}
  //               listItem={listItem}
  //             />
  //           </div>

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
        {/* <div className="relative flex gap-2.5 items-center">
          <div className="md:scale-75 flex">
            <SwitchLocale />
          </div>
          <NotificationMenu />
          <NotSystemAdminWrapper>
            <div className=" gap-2 hidden md:flex">
              <CreateTicket userDetail={userDetail.data} />
            </div>
          </NotSystemAdminWrapper>

          <div>
            <UserMenu
              userDetail={userDetail.data}
              logoutNavigate={logoutNavigate}
            />
          </div>
        </div> */}
      </div>
    </>
  )
}

