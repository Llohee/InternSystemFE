import { SideBar } from '@/components/ui/side-bar/side-bar'
import { useGetUserDetail } from '@/hooks/query/auth'
import { SideBarItemType, SideBarSubItemType } from '@/models/ui/sidebar'
import produce from 'immer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ActionButtons from './action-buttons'
import {
  Account,
  home,
  tenantlink,
  Post,
  Report,
  Schedule,
  tenant,
} from './list-items'

const sidebarAllItems: SideBarItemType[] = [
  home,
  tenant,
  tenantlink,
  Account,
  Schedule,
  Post,
  Report,
]
const SidebarLayout = (props: {
  sidebarExpanded: boolean
  setSidebarExpanded: (b: boolean) => void
}) => {
  const router = useRouter()
  const { sidebarExpanded, setSidebarExpanded } = props
  const userDetail = useGetUserDetail()
  const [sidebaritems, setSidebarItems] =
    useState<SideBarItemType[]>(sidebarAllItems)
  useEffect(() => {
    const newSidebarItems = produce(sidebarAllItems, (draftState) => {
      const filteredItems = sidebarItemsCanView(draftState)
      return filteredItems.map((item) => transObject(item))
    })
    setSidebarItems(newSidebarItems)
  }, [userDetail.data.role])
  function checkPermission(
    sidebarItem: SideBarItemType | SideBarSubItemType
  ): boolean {
    const layoutUser = userDetail.data.role
    if (sidebarItem.onlyFor) {
      return sidebarItem.onlyFor.some((e) => e === layoutUser)
    }
    return true
  }

  function sidebarItemsCanView(data: SideBarItemType[]): SideBarItemType[] {
    return data
      .map((sideBarItem) => {
        const newItem = { ...sideBarItem }
        if (newItem.subSideBarItem) {
          newItem.subSideBarItem =
            newItem.subSideBarItem.filter(checkPermission)
        }
        return checkPermission(newItem) ? newItem : null
      })
      .filter(Boolean) as SideBarItemType[]
  }

  useEffect(() => {
    if (userDetail.data && userDetail.data.role) {
      const filteredItems = sidebarItemsCanView(sidebarAllItems)
      setSidebarItems(filteredItems)
    }
  }, [userDetail.data.role])

  function transObject(data: SideBarItemType): SideBarItemType {
    if (data.subSideBarItem)
      return {
        ...data,
        subSideBarItem: data.subSideBarItem.map((e) => transObject(e)),
        text: data.text,
      }
    else return { ...data, text: data.text }
  }

  const getChosseSideBarItem = (items: SideBarItemType[]) => {
    let newArr: SideBarItemType[] = [...items]
    items.forEach((val: any) => {
      if (val.subSideBarItem) {
        newArr = [...newArr, ...val.subSideBarItem]
      }
    })

    return newArr.filter((val: any) => {
      if (val.link === '') return false
      if (val.link === '/dashboard') {
        return router.asPath === '/dashboard'
      }
      if (router.asPath.startsWith(val.link)) return true
    })
  }
  const flatten = (arr: SideBarItemType[]) => {
    let a = arr.reduce((pre, cur) => {
      return pre.concat(
        Array.isArray(cur.subSideBarItem) ? flatten(cur.subSideBarItem) : cur
      )
    }, [] as SideBarItemType[]) as SideBarItemType[]
    return a
  }

  return (
    <div>
      <div className="relative">
        <div
          className={`w-screen h-12 lg:h-full ${
            props.sidebarExpanded ? 'lg:w-[275px]' : 'lg:w-[75px] m-0'
          } bg-brand border border-brand`}
        >
          <>
            <div className="flex w-full h-full gap-3 items-center justify-center">
              {/* <Link
                href={'/dashboard'}
                className="grow flex gap-3 items-center justify-center"
              >
                Trang chủ
              </Link> */}
              <div>
                {!sidebarExpanded && (
                  <button
                    type="button"
                    onClick={() => setSidebarExpanded(true)}
                    className="absolute top-0 right-0 flex items-center justify-center p-3 lg:hidden text-grey-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </>
        </div>
        <SideBar
          header={
            <div className="flex w-full gap-3 items-center justify-center">
              {/* <Link
                href={'/dashboard'}
                className="grow flex gap-3 items-center justify-center"
              >
                {!sidebarExpanded ? <></> : <>Trang chủ</>}
              </Link> */}
              <div>
                {!sidebarExpanded && (
                  <button
                    type="button"
                    onClick={() => setSidebarExpanded(true)}
                    className="absolute top-0 right-0 flex items-center justify-center p-3 lg:hidden text-grey-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          }
          isOpen={sidebarExpanded}
          openSideBar={() => {
            setSidebarExpanded(true)
          }}
          closeSideBar={() => {
            setSidebarExpanded(false)
          }}
          footer={<ActionButtons sidebarExpanded={sidebarExpanded} />}
          sidebaritems={sidebaritems}
          chosseSideBarItem={getChosseSideBarItem(sidebaritems)}
        />
      </div>
      <div className="block lg:hidden"></div>
    </div>
  )
}

export default SidebarLayout
