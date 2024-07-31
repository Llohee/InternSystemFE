// import { useMessagesStateStore } from '@/hooks/zustand/notifications'
import Head from 'next/head'
import favicon from 'public/images/favicon.svg'
import { siteTitle } from './common/header'
const MetaHeader = () => {
  // const messagesStateStore = useMessagesStateStore().messages
  return (
    <Head>
      <link rel="icon" href={favicon.src} />
      <meta name="description" content="Hệ thống hỗ trợ sinh viên" />
      <meta property="og:image" />
      <meta name="og:title" content={siteTitle} />
      <meta
        property="og:description"
        content="Hệ thống hỗ trợ sinh viên"
        key="ogdesc"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{siteTitle}</title>
    </Head>
  )
}

export default MetaHeader
