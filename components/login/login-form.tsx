import CheckAccessCode from './ad/check-access-code'
import CheckEmailForm from './check-email-form'
import { useLoginTypeStore } from './hooks'
import LoginKeyCloakForm from './login-keycloak/log-in-keycloak'
import LoginNormalForm from './login-normal/login-normal-form'

const LoginForm = (props: { accessCode?: string; email?: string }) => {
  const loginType = useLoginTypeStore()
  // if (loginType.type === 'NORMAL' && loginType.email) {
    return (
      <LoginNormalForm
        // email={loginType.email}
        // pre={() => {
        //   loginType.updateLogin('ANONYMOUS', undefined)
        // }}
      />
    )
  // }

  // if (loginType.type === 'KEYCLOAK' && loginType.email) {
  //   return <LoginKeyCloakForm />
  // }
  // if (props.accessCode) {
  //   return <CheckAccessCode accessCode={props.accessCode} />
  // }
  // return <CheckEmailForm {...props} />
}

export default LoginForm
