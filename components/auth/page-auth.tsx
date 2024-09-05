import { useGetUserDetail } from "@/hooks/query/auth";
import NonSSRWrapper from '@/components/common/no-ssr-wrapper'
import { AuthProps } from "@/pages/_app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function PublicAuth({ children }: AuthProps) {
  return <>{children}</>
}

interface GenericPageAuthProps extends AuthProps {
  condition: boolean
}

function GenericPageAuth({ children, condition }: GenericPageAuthProps) {
  const getUserDetail = useGetUserDetail()
  // const logoutNavigate = useLogoutNavigate()
  const router = useRouter()
  useEffect(() => {
    if (!getUserDetail.data.access_token) {
      // logoutNavigate()
      router.replace('/login')
    } 
  }, [getUserDetail])

  if (
    condition 
  )
    return <NonSSRWrapper>{children}</NonSSRWrapper>

  return <></>
}

export function AllUserAuth(props: AuthProps) {
  const getUserDetail = useGetUserDetail()
  const condition = Boolean(getUserDetail.data.access_token)
  return (
    <GenericPageAuth {...props} condition={condition}>
      {props.children}
    </GenericPageAuth>
  )
}