import { ContainerFormBody } from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { Uploader } from '@/components/ui/upload/upload'
import { ReportDetail, UpdateReportRequest } from '@/models/api'
import { UseFormReturn } from 'react-hook-form'
import { useScoreCreate } from './hook'
import { Button } from '@/components/ui/button/button'
import { useRoleIsHumanResource } from '@/components/auth/hooks'

const FromScore = (props: {
  report: ReportDetail
  closeModal: () => void
  form: UseFormReturn<UpdateReportRequest, any>
}) => {
  const { register } = props.form
  const isRoleHR = useRoleIsHumanResource()
  const { createScore, handleFormSubmit, mutation } = useScoreCreate(
    props.report.id,
    isRoleHR
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
          className=""
          onSubmit={createScore.handleSubmit(handleFormSubmit)}
        >
          <div className="flex gap-3 w-full pb-2.5">
            <Input
              label="Điểm số doanh nghiệp"
              name="score_business"
              register={createScore.register}
              intent={
                props.form.formState.errors.description ? 'error' : 'default'
              }
              type="number"
              placeholder={'Nhập điểm số'}
              defautValue={
                props.report?.score_business
                  ? String(props.report.score_business)
                  : 'Chưa có điểm'
              }
              message={props.form.formState.errors.description?.message ?? ''}
              disabled={isRoleHR ? false : true}
              required={isRoleHR ? true : false}
            />
            <Input
              label="Điểm số giảng viên"
              name="score_lecturer"
              register={createScore.register}
              intent={
                props.form.formState.errors.description ? 'error' : 'default'
              }
              type="number"
              placeholder={'Nhập điểm số'}
              defautValue={
                props.report?.score_lecturer
                  ? String(props.report.score_lecturer)
                  : 'Chưa có điểm'
              }
              message={props.form.formState.errors.description?.message ?? ''}
              disabled={
                props.report.score_lecturer || !props.report.score_business
                  ? true
                  : false
              }
              required={isRoleHR ? false : true}
            />
            {((isRoleHR && !props.report.score_business) ||
              (!isRoleHR && !props.report.score_lecturer)) && (
              <div className="flex justify-end items-end gap-3 mb-1">
                <Button type="submit" posting={mutation.isLoading}>
                  Chấm điểm
                </Button>
              </div>
            )}
          </div>
          {(createScore.formState.errors.score_business ||
            createScore.formState.errors.score_lecturer) && (
            <div className="text-error-base text-caption-2">
              Vui lòng nhập điểm số
            </div>
          )}
        </form>
      </ContainerFormBody>
    </>
  )
}

export default FromScore
