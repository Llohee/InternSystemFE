import { ErrorResponse } from '@/models/api/common'
import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { useLoginAzure, useLoginForm } from '../hooks'
import { LoginRequest } from '@/models/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const LoginNormalForm = () => {
  const router = useRouter()
  const { handleFormSubmit, mutation, formlogin } = useLoginForm()
  const { mutationAzure } = useLoginAzure()
  const { code } = router.query
  useEffect(() => {
    if (code) {
      mutationAzure.mutate(code as any)
    }
  }, [code])
  const LoginWWithAzure = async () => {
    window.location.href =
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=ad4b3ae1-8e28-4040-8009-cb9e87e18c94&response_type=code&response_mode=query&scope=user.read'
  }
  return (
    <>
      <form
        onSubmit={formlogin.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <Input<LoginRequest>
                label="Email"
                name="email"
                register={formlogin.register}
                intent={
                  mutation.isError || formlogin.formState.errors.email
                    ? 'error'
                    : 'default'
                }
                placeholder={'Nhập Email'}
                message={
                  mutation.isError
                    ? (mutation.error.response?.data as ErrorResponse)
                        ?.description ??
                      'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                    : formlogin.formState.errors.email?.message ?? ''
                }
                type={'text'}
                autoFocus
                required
              />
              <Input<LoginRequest>
                label={'Mật khẩu'}
                name="password"
                register={formlogin.register}
                intent={
                  mutation.isError || formlogin.formState.errors.password
                    ? 'error'
                    : 'default'
                }
                type={'password'}
                placeholder={'Nhập mật khẩu'}
                message={
                  mutation.isError
                    ? (mutation.error.response?.data as ErrorResponse)
                        ?.description ??
                      'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                    : formlogin.formState.errors.password?.message ?? ''
                }
                required
              />
            </div>
            <Button
              intent={'primary'}
              size={'medium'}
              type="submit"
              fullWidth={true}
              posting={mutation.isLoading}
            >
              Đăng nhập
            </Button>
            <Button
              intent={'primary'}
              fullWidth={true}
              onClick={LoginWWithAzure}
              posting={mutationAzure.isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#ff5722"
                  d="M6 6H22V22H6z"
                  transform="rotate(-180 14 14)"
                ></path>
                <path
                  fill="#4caf50"
                  d="M26 6H42V22H26z"
                  transform="rotate(-180 34 14)"
                ></path>
                <path
                  fill="#ffc107"
                  d="M26 26H42V42H26z"
                  transform="rotate(-180 34 34)"
                ></path>
                <path
                  fill="#03a9f4"
                  d="M6 26H22V42H6z"
                  transform="rotate(-180 14 34)"
                ></path>
              </svg>
              Đăng nhập Microsoft
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginNormalForm
