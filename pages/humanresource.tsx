import { AllUserAuth } from '@/components/auth/page-auth'
import Humanresource from '@/components/humanresource'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'

const HumanresourcePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Humanresource />
    </>
  )
}
HumanresourcePage.Layout = MainLayout
HumanresourcePage.Auth = AllUserAuth
HumanresourcePage.title = 'Doanh nghiệp'

export default HumanresourcePage
