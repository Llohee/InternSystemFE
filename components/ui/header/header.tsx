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
      link: '/dashboard',
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

  const userDetail = useGetUserDetail()

  const logoutNavigate = useLogoutNavigate()
  if (userDetail.data.role == 'ST')
    return (
      <div className="w-full top-0 sticky z-[1000]">
        <div className="bg-brand h-14 flex items-center justify-between md:px-8">
          <div className="flex gap-2 items-center px-3">
            <Image
              src={userDetail.data.tenant.image_url}
              alt=""
              width={30}
              height={30}
            />
            <p className="text-white text-title-5 md:text-title-3">{userDetail.data.tenant.name.toUpperCase()} ({userDetail.data.tenant.code})</p>
          </div>
          <div className="relative flex gap-2.5 md:gap-3 items-center">
            {/* <NotificationMenu /> */}
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
            {/* <Link href={'/dashboard'} className="h-full p-2"></Link> */}
            <div className="hidden md:flex gap-2 items-center h-full">
              {listItem.map((item, index) => {
                const isSelected = index === selectItem.index
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
