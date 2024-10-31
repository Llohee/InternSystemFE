import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Editor } from '@/components/ui/editor/editor'
import { Input } from '@/components/ui/input/input'
import InputDate from '@/components/ui/input/input-date'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import { useGetConfigPostProfession } from '@/hooks/query/post'
import { UpdateCustomPostRequest } from '@/models/api/custom-post-api'
import { DevTool } from '@hookform/devtools'
import { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormCustomPost = (props: {
  form: UseFormReturn<UpdateCustomPostRequest, any>
  handleFormSubmit: SubmitHandler<UpdateCustomPostRequest>
  mutation: any
  // postDetail?: PostDetail
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
  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '').trim()
  }
  const currencyOptions = [
    {
      label: 'VND',
      value: 'VND',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ]
  return (
    <>
      <form
        className="grid md:grid-cols-1"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <Input<UpdateCustomPostRequest>
            name="title"
            register={props.form.register}
            label={'Tiêu đề đề tài'}
            placeholder="Nhập tiêu đề"
            required
          />
          <Controller
            control={props.form.control}
            name={'profession'}
            rules={{
              required: 'Ngành nghề là bắt buộc',
            }}
            render={({ field: { value, onChange } }) => {
              const [urlConfig, setUrlConfig] = useState<string>('')
              const getConfigProfession = useGetConfigPostProfession()
              // const getConfig = useGetConfig(urlConfig, '', [])
              const optionsTypeProject = getConfigProfession.data?.data.map(
                (val) => ({
                  value: val.id,
                  label: val.name,
                })
              )
              // useEffect(() => {
              //   let path = `/post/profession`
              //   setUrlConfig(path)
              // }, [])
              return (
                <>
                  <InputSelect
                    name={'profession'}
                    options={optionsTypeProject}
                    value={
                      optionsTypeProject?.find(
                        (val: any) => value && val.value === value
                      ) ?? null
                    }
                    onChange={(option) => {
                      onChange(option.value ?? '')
                    }}
                    label={'Ngành nghề'}
                    register={props.form.register}
                    required
                    message={errors.profession?.message ?? ''}
                    intent={errors.profession ? 'error' : 'default'}
                  />
                </>
              )
            }}
          />
          <Controller
            control={props.form.control}
            name="description"
            rules={{
              required: 'Chi tiết là bắt buộc',
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Editor
                register={props.form.register}
                name="description"
                value={value}
                onChange={(data) => {
                  if (removeHtmlTags(data).length <= 0) onChange('')
                  else onChange(data)
                }}
                label={'Chi tiết'}
                intent={error ? 'error' : 'default'}
                required
                placeholder={'Nhập mô tả'}
              />
            )}
          />
          <div className="grid grid-cols-11 gap-6">
            <div className="col-span-6 flex flex-col gap-2">
              <div className="text-label-3 text-typography-label">
                Mức lương<span className="text-error-base pl-1">*</span>
              </div>
              <Controller
                control={props.form.control}
                name="negotiable_salary"
                render={({ field: { value, onChange } }) => (
                  <div className="flex justify-around items-center gap-2 border border-border-1 rounded-lg h-[38px] px-4">
                    <div
                      className={`text-label-3 font-normal ${
                        props.form.watch('negotiable_salary') === true
                          ? '!text-typography-disabled'
                          : 'text-typography-label'
                      }`}
                    >
                      Cơ bản
                    </div>
                    <SwitchButton
                      enabled={value ?? true}
                      setEnabled={() => {
                        onChange(!(value ?? true))
                      }}
                      label={''}
                      classname="!gap-0"
                    />
                    <div
                      className={`text-label-3 font-normal ${
                        props.form.watch('negotiable_salary') === false
                          ? '!text-typography-disabled'
                          : 'text-typography-label'
                      }`}
                    >
                      Thỏa thuận
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="col-span-5">
              <Input<UpdateCustomPostRequest>
                name="slot"
                register={props.form.register}
                label={'Số lượng'}
                placeholder="Nhập số lượng"
                type={'number'}
                maxLength={2}
                required
              />
            </div>
          </div>
          {props.form.watch('negotiable_salary') === false && (
            <div className="grid grid-cols-11 gap-6">
              <div className="col-span-4">
                <Input<UpdateCustomPostRequest>
                  name="salary_min"
                  register={props.form.register}
                  label={'Lương tối thiểu'}
                  placeholder="Min"
                  type={'number'}
                  required
                />
              </div>
              <div className="col-span-4">
                <Input<UpdateCustomPostRequest>
                  name="salary_max"
                  register={props.form.register}
                  label={'Lương tối đa'}
                  placeholder="Max"
                  type={'number'}
                  required
                />
              </div>
              <div className="col-span-3">
                <Controller
                  control={props.form.control}
                  name="currency"
                  render={({ field: { value, onChange } }) => {
                    // const [urlConfig, setUrlConfig] = useState<string>('')
                    // const getConfig = useGetConfig(urlConfig, '', [])
                    return (
                      <>
                        <InputSelect
                          name={'currency'}
                          options={currencyOptions}
                          value={
                            currencyOptions?.find(
                              (val: any) => value && val.value === value
                            ) ?? null
                          }
                          onChange={(option) => {
                            onChange(option.value ?? '')
                          }}
                          label={'Đơn vị tiền tệ'}
                          register={props.form.register}
                          required
                          message={errors.currency?.message ?? ''}
                          intent={errors.currency ? 'error' : 'default'}
                        />
                      </>
                    )
                  }}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-11 gap-6">
            <div className="col-span-6">
              <InputDate<UpdateCustomPostRequest>
                name="expired_time"
                control={props.form.control}
                intent={
                  props.form.formState.errors.expired_time ? 'error' : 'default'
                }
                label={'Hạn ứng tuyển'}
                message={
                  props.form.formState.errors.expired_time?.message ?? ''
                }
                required
              />
            </div>
          </div>
        </ContainerFormBody>
        <ContainerFormFooter>
          <Button
            btnStyle={'no-background'}
            intent={'grey'}
            onClick={props.closeModal}
          >
            {props.isEdit ? 'Đóng' : 'Hủy'}
          </Button>
          {!props.isEdit && (
            <Button
              posting={props.mutation.isLoading}
              intent={props.isEdit ? 'primary' : 'primary'}
              type={'submit'}
            >
              {props.isEdit ? 'Đóng' : 'Tạo mới'}
            </Button>
          )}
        </ContainerFormFooter>
      </form>
      <DevTool control={props.form.control} />
    </>
  )
}

export default FormCustomPost
