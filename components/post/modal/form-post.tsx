import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Editor } from '@/components/ui/editor/editor'
import { GroupChooseBtn } from '@/components/ui/input/group-choose-btn'
import { Input, inputStyles } from '@/components/ui/input/input'
import InputDate from '@/components/ui/input/input-date'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import useGetConfig from '@/hooks/query/config'
import { PostDetail, UpdatePostRequest } from '@/models/api'
import { DevTool } from '@hookform/devtools'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormPost = (props: {
  form: UseFormReturn<UpdatePostRequest, any>
  handleFormSubmit: SubmitHandler<UpdatePostRequest>
  mutation: any
  postDetail?: PostDetail
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
  // const [option, setOption] = useState(
  //   props.postDetail?.negotiable_salary ?? true
  // )
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
          <Controller
            control={props.form.control}
            name={'local'}
            rules={{
              required: 'Địa điểm là bắt buộc',
            }}
            render={({ field: { value, onChange } }) => {
              const [urlConfig, setUrlConfig] = useState<string>('')
              const getConfig = useGetConfig(urlConfig, '', [])
              const optionsTypeProject = getConfig?.data?.map((val: any) => ({
                value: val.id,
                label: val.name,
              }))
              useEffect(() => {
                let path = `/post/local`
                setUrlConfig(path)
              }, [])
              return (
                <>
                  <InputSelect
                    name={'local'}
                    options={optionsTypeProject}
                    value={
                      optionsTypeProject?.find(
                        (val: any) => value && val.value === value
                      ) ?? null
                    }
                    onChange={(option) => {
                      onChange(option.value ?? '')
                    }}
                    label={'Địa điểm'}
                    register={props.form.register}
                    required
                    disabled={props.isEdit}
                    message={errors.local?.message ?? ''}
                    intent={errors.local ? 'error' : 'default'}
                  />
                </>
              )
            }}
          />
          <Controller
            control={props.form.control}
            name={'position'}
            rules={{
              required: 'Vị trí là bắt buộc',
            }}
            render={({ field: { value, onChange } }) => {
              const [urlConfig, setUrlConfig] = useState<string>('')
              const getConfig = useGetConfig(urlConfig, '', [])
              const optionsTypeProject = getConfig?.data?.map((val: any) => ({
                value: val.id,
                label: val.name,
              }))

              useEffect(() => {
                let path = `/post/position`
                setUrlConfig(path)
              }, [])
              return (
                <>
                  <InputSelect
                    name={'position'}
                    options={optionsTypeProject}
                    value={
                      optionsTypeProject?.find(
                        (val: any) => value && val.value === value
                      ) ?? null
                    }
                    onChange={(option) => {
                      onChange(option.value ?? '')
                    }}
                    label={'Vị trí'}
                    register={props.form.register}
                    required
                    message={errors.position?.message ?? ''}
                    intent={errors.position ? 'error' : 'default'}
                  />
                </>
              )
            }}
          />
          <Controller
            control={props.form.control}
            name={'profession'}
            rules={{
              required: 'Ngành nghề là bắt buộc',
            }}
            render={({ field: { value, onChange } }) => {
              const [urlConfig, setUrlConfig] = useState<string>('')
              const getConfig = useGetConfig(urlConfig, '', [])
              const optionsTypeProject = getConfig?.data?.map((val: any) => ({
                value: val.id,
                label: val.name,
              }))

              useEffect(() => {
                let path = `/post/profession`
                setUrlConfig(path)
              }, [])
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
          <Controller
            control={props.form.control}
            name="request"
            rules={{
              required: 'Yêu cầu là bắt buộc',
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Editor
                register={props.form.register}
                name="request"
                value={value}
                onChange={(data) => {
                  if (removeHtmlTags(data).length <= 0) onChange('')
                  else onChange(data)
                }}
                label={'Yêu cầu'}
                intent={error ? 'error' : 'default'}
                required
                placeholder={'Nhập yêu cầu'}
              />
            )}
          />
          <Controller
            control={props.form.control}
            name="interest"
            rules={{
              required: 'Quyền lợi là bắt buộc',
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Editor
                register={props.form.register}
                name="request"
                value={value}
                onChange={(data) => {
                  if (removeHtmlTags(data).length <= 0) onChange('')
                  else onChange(data)
                }}
                label={'Quyền lợi'}
                intent={error ? 'error' : 'default'}
                required
                placeholder={'Nhập quyền lợi'}
              />
            )}
          />
          <div className="grid grid-cols-11 gap-6">
            <div className="col-span-6 flex flex-col gap-2">
              {/* <GroupChooseBtn
                name="negotiable_salary"
                register={register}
                listValue={[
                  {
                    label: 'Thỏa thuận',
                    value: true,
                  },
                  {
                    label: 'Cơ bản',
                    value: false,
                  },
                ]}
                label={'Mức lương'}
                type="radio"
                onChange={(value) => value}
                classNameList="flex gap-5"
                classNameLabel="text-label-3 text-typography-label font-normal pl-1"
                required
              /> */}
              <div className="text-label-3 text-typography-label">
                Mức lương
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
              <Input<UpdatePostRequest>
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
                <Input<UpdatePostRequest>
                  name="salary_min"
                  register={props.form.register}
                  label={'Lương tối thiểu'}
                  placeholder="Min"
                  type={'number'}
                  required
                />
              </div>
              <div className="col-span-4">
                <Input<UpdatePostRequest>
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
                          name={'position'}
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
                          message={errors.position?.message ?? ''}
                          intent={errors.position ? 'error' : 'default'}
                        />
                      </>
                    )
                  }}
                />
              </div>
            </div>
          )}
          <InputDate<UpdatePostRequest>
            name="expired_time"
            control={props.form.control}
            intent={
              props.form.formState.errors.expired_time ? 'error' : 'default'
            }
            label={'Hạn ứng tuyển'}
            message={props.form.formState.errors.expired_time?.message ?? ''}
            required
          />
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

export default FormPost
