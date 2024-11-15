import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import { usegetConfigTenant } from '@/hooks/query/tenant'
import { checkPhoneVN } from '@/hooks/regex'
import { UpdateUserRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormUniversityAccount = (props: {
  form: UseFormReturn<UpdateUserRequest, any>
  handleFormSubmit: SubmitHandler<UpdateUserRequest>
  mutation: any
  universityDetail?: UserGetDetail
  closeModal: () => void
  resetForm?: () => void
  isEdit?: boolean
  type: string
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
            name="university"
            rules={{ required: 'Trường học là bắt buộc' }}
            render={({ field: { value, onChange } }) => {
              const allUniversity = usegetConfigTenant(props.type)
              const [options, setOptions] = useState<any[]>([])
              useEffect(() => {
                if (allUniversity.data) {
                  setOptions(
                    allUniversity.data.data.map((val: any) => ({
                      label: `${val.name} (${val.code})`,
                      value: val.code,
                    }))
                  )
                }
              }, [allUniversity.data])
              return (
                <InputSelect
                  options={options}
                  value={options.filter((val) => value?.includes(val.value))}
                  onChange={(options) => onChange(options?.value)}
                  register={props.form.register}
                  label={'Trường học'}
                  placeholder={'Chọn trường học'}
                  intent={
                    props.form.formState.errors.university ? 'error' : 'default'
                  }
                  message={
                    props.form.formState.errors.university?.message ?? ''
                  }
                  isLoading={allUniversity.isLoading}
                  menuPlacement={'top'}
                  required
                />
              )
            }}
          />
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
