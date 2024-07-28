import { useEffect } from 'react'
import { useLoginTypeStore } from '../hooks'
import { Spinner } from '@/components/ui/spinner/spinner'

const LoginKeyCloakForm = () => {
  const loginType = useLoginTypeStore()
  useEffect(() => {
    window.location.assign(
      `${loginType.url}${window.location.origin}/${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_PATH}/`
    )
  }, [])
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <Spinner size="large"></Spinner>
        <div className="text-heading-4">Đang xác nhận tài khoản</div>
      </div>
    </>
  )
}

export default LoginKeyCloakForm
