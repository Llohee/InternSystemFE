import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SwitchButton } from '@/components/ui/switch/switch'
// import { usegetConfigUniversity } from '@/hooks/query/tenant'
import { checkPhoneVN } from '@/hooks/regex'
import { UpdateUserRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormLecturerAccount = (props: {
  form: UseFormReturn<UpdateUserRequest, any>
  handleFormSubmit: SubmitHandler<UpdateUserRequest>
  mutation: any
  lecturerDetail?: UserGetDetail
  closeModal: () => void
  resetForm?: () => void
  isEdit?: boolean
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = props.form
  return (
    <>
      <form
        className="grid md:grid-cols-1"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="flex gap-3 items-center">
            <Input<UpdateUserRequest>
              label="Email"
              name="email"
              register={register}
              intent={props.form.formState.errors.email ? 'error' : 'default'}
              placeholder={'Nhập email giảng viên'}
              message={props.form.formState.errors.email?.message ?? ''}
              disabled={props.isEdit}
              required
            />
            <Controller
              control={props.form.control}
              name="is_active"
              render={({ field: { value, onChange } }) => (
                <SwitchButton
                  enabled={value ?? true}
                  setEnabled={() => {
                    onChange(!(value ?? true))
                  }}
                  label={'Trạng thái'}
                />
              )}
            />
          </div>
          {!props.isEdit && (
            <div className="col col-span-full">
              <Input<UpdateUserRequest>
                label={'Mật khẩu'}
                name="password"
                register={props.form.register}
                type={'password'}
                intent={
                  props.form.formState.errors.password ? 'error' : 'default'
                }
                placeholder={'Nhập mật khẩu'}
                message={props.form.formState.errors.password?.message ?? ''}
                required
              />
            </div>
          )}
          <div className="col col-span-full grid md:grid-cols-2 gap-5">
            <Input<UpdateUserRequest>
              label={'Tên tài khoản'}
              name="fullname"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên tài khoản'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />

            <Input<UpdateUserRequest>
              label={'Số điện thoại'}
              name="phone"
              register={props.form.register}
              intent={props.form.formState.errors.phone ? 'error' : 'default'}
              placeholder={'Nhập số điện thoại'}
              message={props.form.formState.errors.phone?.message ?? ''}
              onInput={(event) => {
                event.currentTarget.value = checkPhoneVN(event)
              }}
            />
          </div>
        </ContainerFormBody>
        <ContainerFormFooter>
          <Button
            btnStyle={'no-background'}
            intent={'grey'}
            onClick={props.closeModal}
          >
            Hủy
          </Button>
          <Button
            posting={props.mutation.isLoading}
            intent={props.isEdit ? 'primary' : 'primary'}
            type={'submit'}
          >
            {props.isEdit ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </ContainerFormFooter>
      </form>
      <DevTool control={props.form.control} />
    </>
  )
}
