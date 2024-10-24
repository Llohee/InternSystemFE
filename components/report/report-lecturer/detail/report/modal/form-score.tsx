import { ContainerFormBody } from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { Uploader } from '@/components/ui/upload/upload'
import { ReportDetail, UpdateReportRequest } from '@/models/api'
import { UseFormReturn } from 'react-hook-form'
import { useScoreCreate } from './hook'
import { Button } from '@/components/ui/button/button'

const FromScore = (props: {
  report: ReportDetail
  closeModal: () => void
  form: UseFormReturn<UpdateReportRequest, any>
}) => {
  const { register } = props.form
  const { createScore, handleFormSubmit, mutation } = useScoreCreate(
    props.report.id
  )
  return (
    <>
      <ContainerFormBody>
        <Input
          label="Ghi chú"
          name="description"
          register={register}
          intent={props.form.formState.errors.description ? 'error' : 'default'}
          placeholder={'Nhập ghi chú'}
          defautValue={props.report?.description}
          message={props.form.formState.errors.description?.message ?? ''}
          disabled
        />
        <Uploader
          defaultValue={props.report?.attachments}
          attachment={props.report?.attachments}
          className="col-span-full"
          label="Tệp đính kèm"
          module="university"
          control={props.form?.control}
          name="attachments"
          required={true}
          disabled
        />
        <form
          className="flex gap-3 w-full pb-2.5"
          onSubmit={createScore.handleSubmit(handleFormSubmit)}
        >
          <Input
            label="Điểm số"
            name="score"
            register={createScore.register}
            intent={
              props.form.formState.errors.description ? 'error' : 'default'
            }
            type="number"
            placeholder={'Nhập điểm số'}
            defautValue={props.report?.score ? String(props.report.score) : ''}
            message={props.form.formState.errors.description?.message ?? ''}
            disabled={props.report.score ? true : false}
            required={props.report.score ? false : true}
          />
          {createScore.formState.errors.score && (
            <div className="text-error-base text-caption-2">
              Vui lòng nhập điểm số
            </div>
          )}
          {!props.report.score && (
            <div className="flex justify-end items-end gap-3 mb-1">
              <Button type="submit" posting={mutation.isLoading}>
                Chấm điểm
              </Button>
            </div>
          )}
        </form>
      </ContainerFormBody>
    </>
  )
}

export default FromScore
