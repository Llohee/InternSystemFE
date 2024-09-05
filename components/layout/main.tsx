import { LayoutProps } from '@/pages/_app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Header } from '../ui/header/header'
import { siteTitle } from './common/header'
import SidebarLayout from './common/side-bar'
import MetaHeader from './meta-header'
import { NotStudentWrapper } from '../auth/auth-wrapper'

export function MainLayout({ children, title, nonePadding }: LayoutProps) {
  const maxWidthMedium = 1024
  const [titlePage, setTitlePage] = useState(title)
  const [sidebarExpanded, setSidebarExpanded] = useState(
    window.innerWidth > maxWidthMedium
      ? localStorage.getItem('next-ca-open-sidebar') === 'true'
      : false
  )
  const titleElement = document.querySelector('title')
  useEffect(() => {
    if (title === '@title') {
      setTitlePage(titleElement?.textContent ?? title)
    } else setTitlePage(title)
  }, [titleElement, title])
  // const handleTitleChange = () => {
  //   const newTitle = document.querySelector('title')?.textContent
  //   if (title === '@title' && newTitle && newTitle != '@title') {
  //     setTitlePage(newTitle)
  //   } else if (title != titlePage) setTitlePage(title)
  // }
  // useEffect(() => {
  //   handleTitleChange()
  //   document.addEventListener('DOMSubtreeModified', handleTitleChange)
  //   return () => {
  //     document.removeEventListener('DOMSubtreeModified', handleTitleChange)
  //   }
  // }, [title])
  function convertTitlePageFromKey(keyString: string) {
    var startIndex = keyString.indexOf('@key(')
    var endIndex = keyString.lastIndexOf(')')
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex + 1) {
      return keyString
    }
    return keyString.substring(startIndex + 5, endIndex)
  }
  return (
    <>
      {/* <EndUserWrapper> */}

      {/* </EndUserWrapper> */}
      <NotStudentWrapper>
        <div className="bg-white flex flex-col lg:flex-row h-screen text-typography-body">
          <MetaHeader />
          <Head>
            <title>{convertTitlePageFromKey(titlePage ?? siteTitle)}</title>
          </Head>
          <SidebarLayout
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={(val) => {
              setSidebarExpanded(val)
              if (window.innerWidth > maxWidthMedium)
                localStorage.setItem(
                  'next-ca-open-sidebar',
                  val ? 'true' : 'false'
                )
            }}
          />

          <div
            id="body-overflow"
            className={`w-screen h-screen min-h-screen lg:mt-0 rounded-t-md overflow-auto ${
              sidebarExpanded && 'lg:w-[calc(100vw_-_275px)]'
            }`}
          >
            <div className="flex flex-col h-full bg-white w-full">
              <div>
                <Header
                  title={
                    titlePage ? convertTitlePageFromKey(titlePage) : undefined
                  }
                />
              </div>
              <div
                className={`relative flex-1 ${
                  nonePadding === true ? '' : titlePage ? 'md:px-8' : ''
                }  text-typography-body overflow-auto`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </NotStudentWrapper>
    </>
  )
}
