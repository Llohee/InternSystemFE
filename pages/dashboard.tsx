import { AllUserAuth } from '@/components/auth/page-auth'
import HomeWrapper from '@/components/home'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'

const HomePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <HomeWrapper />{' '}
    </>
  )
}
HomePage.Layout = MainLayout
HomePage.Auth = AllUserAuth
HomePage.title = 'Trang chủ'

export default HomePage
