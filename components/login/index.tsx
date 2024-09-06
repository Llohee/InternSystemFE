import Link from 'next/link'
import LoginNormalForm from './login-normal/login-normal-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../ui/button/button'
import { useLoginAzure } from './hooks'

export const LoginBackground = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="inset-0 bg-white bg-login h-screen bg-cover">
      <div className="flex flex-col gap-12 m-auto h-full">
        <div className="m-auto">
          <div className="w-[494px] min-h-[461.78px] flex flex-col gap-12 py-12 px-6 max-w-[100vw] bg-white/80 rounded-lg m-auto md:border border-grey-3 md:shadow-2xl shadow-grey-9">
            <div className="flex flex-col w-full items-center justify-center gap-0">
              <Link href={'/'}>
                {/* <Image src={logo} alt="Aka247" width={240} /> */}
              </Link>
            </div>
            <div className="grow px-1 md:px-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Login = () => {
  return (
    <LoginBackground>
      <LoginNormalForm />
    </LoginBackground>
  )
}

export default Login
