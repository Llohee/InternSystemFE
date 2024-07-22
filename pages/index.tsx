import { EmptyLayout } from '@/components/layout'
import LandingPageContent from '@/components/welcome'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'

const WelcomePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <LandingPageContent />
    </>
  )
}

WelcomePage.Layout = EmptyLayout
WelcomePage.title = '@title'

export default WelcomePage
