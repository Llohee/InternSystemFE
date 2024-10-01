import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Editor } from '@/components/ui/editor/editor'
import { InputSelect } from '@/components/ui/select/select'
import useGetConfig from '@/hooks/query/config'
import { PostDetail, UpdatePostRequest } from '@/models/api'
import { DevTool } from '@hookform/devtools'
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
                    isClearable
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
                    isClearable
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
                    isClearable
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
                placeholder={'Mô tả'}
              />
            )}
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
