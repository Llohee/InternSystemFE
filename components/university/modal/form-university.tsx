import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SwitchButton } from '@/components/ui/switch/switch'
import { Uploader } from '@/components/ui/upload/upload'
import { TenantDetail, UpdateTenantRequest } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormUniversity = (props: {
  form: UseFormReturn<UpdateTenantRequest, any>
  handleFormSubmit: SubmitHandler<UpdateTenantRequest>
  UniversityDetail?: TenantDetail
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
            <Input<UpdateTenantRequest>
              label={'Mã trường học'}
              name="code"
              register={props.form.register}
              intent={props.form.formState.errors.code ? 'error' : 'default'}
              placeholder={'Nhập mã trường học'}
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
          <Input<UpdateTenantRequest>
            label="Tên trường học"
            name="name"
            register={register}
            intent={props.form.formState.errors.name ? 'error' : 'default'}
            placeholder={'Nhập tên trường học'}
            message={props.form.formState.errors.name?.message ?? ''}
            disabled={props.isEdit}
            required
          />
          <Uploader
            defaultValue={props.UniversityDetail?.image_url.map(
              (v) => v.object
            )}
            attachments={props.UniversityDetail?.image_url}
            className="col-span-full"
            label="Ảnh đại diện"
            module="university"
            control={props.form.control}
            name="image_url"
            required={true}
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
