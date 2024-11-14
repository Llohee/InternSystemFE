import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
// import { NotificationMenu } from '@/components/notification/notification-menu'
import { Button } from '../button/button'
// import { UserMenu } from './user-menu'
// import { UserDetail } from '@/models/api'
import { MenuBar, MenuBarItemLink, MenuBarItems } from '../menu-bar/menu-bar'
import { useHeaderSelectedItem } from '@/hooks/zustand/header-item'
import { useGetUserDetail } from '@/hooks/query/auth'
import { useLogoutNavigate } from '@/hooks/useLogout'
import { UserMenu } from './user-menu'
import NotificationMenu from '@/components/notification'
import { useRoleIsStudent } from '@/components/auth/hooks'
import { useGetDetailStudent } from '@/hooks/query/account/student'
import toast from 'react-hot-toast'
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
  const selectItem = useHeaderSelectedItem()
  let listItem: MenuItem[] = [
    {
      title: 'Trang chủ',
      link: '/dashboard',
      icon: <></>,
    },
    {
      title: 'Hồ sơ & CV',
      link: '/profile-cv',
      icon: <></>,
    },
    {
      title: 'Báo cáo',
      link: '/report/student',
      icon: <></>,
    },
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
  const GetDetailStudent = useGetDetailStudent()
  const userDetail = useGetUserDetail()
  const logoutNavigate = useLogoutNavigate()
  const isroleST = useRoleIsStudent()

  if (isroleST)
    return (
      <div className="w-full top-0 sticky z-[1000]">
        <div className="bg-brand h-14 flex items-center justify-between md:px-8">
          {userDetail.data.tenant && (
            <div className="flex gap-2 items-center px-3">
              <Image
                src={userDetail.data.tenant?.image_url}
                alt=""
                width={30}
                height={30}
              />
              <p className="text-white text-title-5 md:text-title-3">
                {userDetail.data.tenant?.name.toUpperCase()} (
                {userDetail.data.tenant?.code})
              </p>
            </div>
          )}
          <div className="relative flex gap-2.5 md:gap-3 items-center">
            <NotificationMenu />
            <div className="md:hidden">
              <UserMenu
                userDetail={userDetail.data}
                logoutNavigate={logoutNavigate}
                listItem={listItem}
              />
            </div>
            <div className="hidden md:block">
              <UserMenu
                userDetail={userDetail.data}
                logoutNavigate={logoutNavigate}
              />
            </div>
          </div>
        </div>
        <div className="h-12 bg-white md:px-8 border-b border-border-2 hidden md:block">
          <div className="flex h-full items-center ">
            <div className="hidden md:flex gap-2 items-center h-full">
              {listItem.map((item, index) => {
                const isSelected = index === selectItem.index
                if (item.title === 'Báo cáo')
                  return (
                    <>
                      <button
                        onClick={() => {
                          GetDetailStudent.status === 'error'
                            ? toast(
                                'Bạn chưa ở trong nhóm, hãy liên hệ nhà trường để kiểm tra!',
                                {
                                  icon: (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="size-5 text-secondary1-base"
                                    >
                                      <path d="M21.7038 17.4087L14.2774 3.36949C14.0579 2.95596 13.7299 2.61001 13.3287 2.36874C12.9275 2.12747 12.4682 2 12 2C11.5318 2 11.0725 2.12747 10.6713 2.36874C10.2701 2.61001 9.94214 2.95596 9.72265 3.36949L2.29624 17.4087C2.0897 17.8005 1.98803 18.239 2.00112 18.6816C2.01421 19.1243 2.14161 19.556 2.37093 19.9348C2.60025 20.3137 2.92369 20.6267 3.30981 20.8436C3.69593 21.0604 4.13158 21.1737 4.57443 21.1724H19.4256C19.8684 21.1737 20.3041 21.0604 20.6902 20.8436C21.0763 20.6267 21.3998 20.3137 21.6291 19.9348C21.8584 19.556 21.9858 19.1243 21.9989 18.6816C22.012 18.239 21.9103 17.8005 21.7038 17.4087ZM12 18.6716C11.7527 18.6716 11.511 18.5983 11.3053 18.4609C11.0997 18.3235 10.9394 18.1282 10.8448 17.8997C10.7502 17.6712 10.7254 17.4198 10.7736 17.1773C10.8219 16.9347 10.941 16.7119 11.1158 16.5371C11.2907 16.3622 11.5135 16.2431 11.7561 16.1949C11.9986 16.1466 12.25 16.1714 12.4785 16.266C12.707 16.3607 12.9023 16.5209 13.0397 16.7266C13.177 16.9322 13.2504 17.1739 13.2504 17.4212C13.2504 17.7528 13.1186 18.0709 12.8842 18.3054C12.6497 18.5399 12.3316 18.6716 12 18.6716ZM12.8336 14.5037H11.1664L10.7496 7.835H13.2504L12.8336 14.5037Z" />
                                    </svg>
                                  ),
                                  id: 'noti-alert-variant',
                                }
                              )
                            : router.push(`${item.link}`)
                        }}
                        className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
                          isSelected
                            ? 'text-primary-base border-primary-base'
                            : 'border-transparent text-typography-subtitle'
                        }`}
                      >
                        {item.title}
                      </button>
                    </>
                  )
                return (
                  <Link
                    key={index}
                    href={item.link ?? '#'}
                    className={`h-full flex items-center text-title-2 px-2 border-b-2 hover:text-primary-base whitespace-nowrap ${
                      isSelected
                        ? 'text-primary-base border-primary-base'
                        : 'border-transparent text-typography-subtitle'
                    }`}
                    onClick={() => selectItem.update(index)}
                  >
                    {item.title ?? ''}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
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
          <NotificationMenu />
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
