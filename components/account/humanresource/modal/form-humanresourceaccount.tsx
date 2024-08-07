import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import { usegetConfigBusiness } from '@/hooks/query/business'
import { checkPhoneVN } from '@/hooks/regex'
import { UpdateUserRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormHumanresourceAccount = (props: {
  form: UseFormReturn<UpdateUserRequest, any>
  handleFormSubmit: SubmitHandler<UpdateUserRequest>
  mutation: any
  userDetail?: UserGetDetail
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
              placeholder={'Nhập email trường học'}
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
          <Controller
            control={props.form.control}
            name="business"
            rules={{ required: 'Doanh nghiệp là bắt buộc' }}
            render={({ field: { value, onChange } }) => {
              const allBusiness = usegetConfigBusiness()
              const [options, setOptions] = useState<any[]>([])
              useEffect(() => {
                if (allBusiness.data) {
                  setOptions(
                    allBusiness.data.data.map((val: any) => ({
                      label: `${val.name} (${val.code})`,
                      value: val.code,
                    }))
                  )
                }
              }, [allBusiness.data])
              return (
                <InputSelect
                  options={options}
                  value={options.filter((val) => value?.includes(val.value))}
                  onChange={(options) => onChange(options?.value)}
                  register={props.form.register}
                  label={'Doanh nghiệp'}
                  placeholder={'Chọn doanh nghiệp'}
                  intent={
                    props.form.formState.errors.business ? 'error' : 'default'
                  }
                  message={props.form.formState.errors.business?.message ?? ''}
                  isLoading={allBusiness.isLoading}
                  menuPlacement={'top'}
                  required
                />
              ) 
            }}
          />
          
          {props.mutation.error && (
            <div className="col col-span-full mt-5 text-error-base text-label-5">
              {(props.mutation.error as AxiosError<ErrorResponse>)?.response
                ?.data?.description ?? ''}
            </div>
          )}
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
