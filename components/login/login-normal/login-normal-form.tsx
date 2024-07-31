import { ErrorResponse } from '@/models/api/common'
import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { useLoginForm } from '../hooks'
import { LoginRequest } from '@/models/api'

const LoginNormalForm = () => {
  const { handleFormSubmit, mutation, formlogin } = useLoginForm()

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
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginNormalForm
