import { Button } from '@/components/ui/button/button'
import {
  ContainerCVFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { UpdateCVRequest } from '@/models/api/profile-cv-api'
import { DevTool } from '@hookform/devtools'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import FormLayoutOptions from './form-layout-options'
import { useState } from 'react'
import CreateOptions from './create-options'

const FormCV = (props: {
  useForm: UseFormReturn<UpdateCVRequest>
  handleFormSubmit: SubmitHandler<UpdateCVRequest>
  mutation: any
  isUpdate?: boolean
}) => {
  const { useForm, mutation, handleFormSubmit } = props
  const [isShowModalOptions, setIsShowModalOptions] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<
    { name: string; label: string }[]
  >([])
  const handleOptionsSubmit = (options: { name: string; label: string }[]) => {
    setSelectedOptions(options)
    setIsShowModalOptions(false)
  }
  return (
    <>
      <form
        onSubmit={useForm.handleSubmit(handleFormSubmit)}
        className="bg-grey-1 relative"
      >
        <ContainerCVFormBody>
          <Input<UpdateCVRequest>
            label={'Tên CV'}
            name="title"
            register={useForm.register}
            placeholder={'Nhập tên CV'}
            message={useForm.formState.errors.title?.message ?? ''}
            intent={useForm.formState.errors.title ? 'error' : 'default'}
            required
          />
          <Input<UpdateCVRequest>
            label={'Mục tiêu nghề nghiệp'}
            name="target_job"
            register={useForm.register}
            placeholder={'Nhập mục tiêu nghề nghiệp'}
            message={useForm.formState.errors.target_job?.message ?? ''}
            intent={useForm.formState.errors.target_job ? 'error' : 'default'}
            required
          />
          <Input<UpdateCVRequest>
            label={'Trình độ học vấn'}
            name="educational_level"
            register={useForm.register}
            placeholder={'Nhập trình độ học vấn'}
            message={useForm.formState.errors.educational_level?.message ?? ''}
            intent={
              useForm.formState.errors.educational_level ? 'error' : 'default'
            }
            required
          />
          <Input<UpdateCVRequest>
            label={'Kinh nghiệm làm việc'}
            name="experient_job"
            register={useForm.register}
            placeholder={'Nhập kinh nghiệm làm việc'}
            message={useForm.formState.errors.experient_job?.message ?? ''}
            intent={
              useForm.formState.errors.experient_job ? 'error' : 'default'
            }
            required
          />
          <FormLayoutOptions
            useForm={useForm}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <div className="flex justify-center">
            <Button
              intent={'warning'}
              size="xs"
              onClick={() => setIsShowModalOptions(true)}
              bounce
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Thêm mục</span>
            </Button>
          </div>
        </ContainerCVFormBody>
        <ContainerFormFooter>
          <Button
            type="submit"
            intent={'primary'}
            onClick={useForm.handleSubmit(handleFormSubmit)}
            disabled={mutation.isLoading}
            posting={mutation.isLoading}
          >
            {props.isUpdate ? 'Lưu' : 'Tạo mới'}
          </Button>
        </ContainerFormFooter>
      </form>
      <CreateOptions
        isOpen={isShowModalOptions}
        closeModal={() => setIsShowModalOptions(false)}
        onSubmit={handleOptionsSubmit}
        optionsUsed={selectedOptions}
      />
      <DevTool control={useForm.control} />
    </>
  )
}

export default FormCV
