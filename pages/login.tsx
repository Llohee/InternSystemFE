import { EmptyLayout } from '@/components/layout'
import Login from '@/components/login'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'
import { useRouter } from 'next/router'

const LoginPage: NextPageWithAuthLayout = () => {
  const router = useRouter()
  const { accessCode, email } = router.query
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>

      <Login accessCode={accessCode as string} email={email as string} />
    </>
  )
}

LoginPage.Layout = EmptyLayout

export default LoginPage
