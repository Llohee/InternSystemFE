// import { AllUserAuth } from '@/components/auth/page-auth'
import HomeWrapper from '@/components/home'
import { MainLayout } from '@/components/layout'
import { NextPageWithAuthLayout } from '@/pages/_app'

const HomePage: NextPageWithAuthLayout = () => {
  return <HomeWrapper />
}
HomePage.Layout = MainLayout
// HomePage.Auth = AllUserAuth
// HomePage.title = 'Trang chủ'

export default HomePage
