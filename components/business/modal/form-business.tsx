import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SwitchButton } from '@/components/ui/switch/switch'
import { UpdateBusinessRequest } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { AxiosError } from 'axios'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormBusiness = (props: {
  form: UseFormReturn<UpdateBusinessRequest, any>
  handleFormSubmit: SubmitHandler<UpdateBusinessRequest>
  mutation: any
  closeModal: () => void
  resetForm?: () => void
  isEdit?: boolean
}) => {
  const { register, handleSubmit } = props.form
  return (
    <>
      <form
        className="grid md:grid-cols-1"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="flex gap-3 items-center">
            <Input<UpdateBusinessRequest>
              label={'Mã doanh nghiệp'}
              name="code"
              register={props.form.register}
              intent={props.form.formState.errors.code ? 'error' : 'default'}
              placeholder={'Nhập mã doanh nghiệp'}
              message={props.form.formState.errors.code?.message ?? ''}
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
          <Input<UpdateBusinessRequest>
            label="Tên doanh nghiệp"
            name="name"
            register={register}
            intent={props.form.formState.errors.name ? 'error' : 'default'}
            placeholder={'Nhập tên doanh nghiệp'}
            message={props.form.formState.errors.name?.message ?? ''}
            required
          />
          <Input<UpdateBusinessRequest>
            label="Website"
            type={'text'}
            name="website"
            register={register}
            intent={props.form.formState.errors.name ? 'error' : 'default'}
            placeholder={'Nhập Website'}
            message={props.form.formState.errors.name?.message ?? ''}
          />
          <Input<UpdateBusinessRequest>
            label="Địa chỉ"
            name="location"
            type="textArea"
            register={register}
            lineTextArea={5}
            intent={props.form.formState.errors.name ? 'error' : 'default'}
            placeholder={'Nhập địa chỉ'}
            message={props.form.formState.errors.name?.message ?? ''}
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
    </>
  )
}
