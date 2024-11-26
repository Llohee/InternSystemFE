import { Button } from '@/components/ui/button/button'
import {
  ContainerCreateReportTime,
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { Pill } from '@/components/ui/pill'
import { Uploader } from '@/components/ui/upload/upload'
import { ReportDetail, UpdateReportRequest } from '@/models/api'
import { DevTool } from '@hookform/devtools'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormReport = (props: {
  form: UseFormReturn<UpdateReportRequest, any>
  handleFormSubmit: SubmitHandler<UpdateReportRequest>
  currentReportDetail?: ReportDetail
  mutation: any
  closeModal: () => void
  resetForm?: () => void
  isEdit?: boolean
}) => {
  const { register, handleSubmit } = props.form
  return (
    <>
      <form onSubmit={handleSubmit(props.handleFormSubmit)}>
        <ContainerFormBody className={`${!props.isEdit && 'h-[275.2px]'}`}>
          <Input<UpdateReportRequest>
            label="Ghi chú"
            name="description"
            register={register}
            intent={
              props.form.formState.errors.description ? 'error' : 'default'
            }
            placeholder={'Nhập ghi chú'}
            defautValue={
              props.isEdit ? props.currentReportDetail?.description : ''
            }
            message={props.form.formState.errors.description?.message ?? ''}
            disabled={props.isEdit}
            required
          />
          <Uploader
            defaultValue={props.currentReportDetail?.attachments}
            attachment={props.currentReportDetail?.attachments}
            className="col-span-full"
            label="Tệp đính kèm"
            module="university"
            control={props.form?.control}
            name="attachments"
            required={true}
            disabled={props.isEdit}
          />
          {props.currentReportDetail?.score_business && (
            <div className="text-label-3 text-typography-label grid grid-cols-11 items-center">
              <div className="col-span-3">Điếm số Doanh nghiệp:</div>
              <div className="">
                {props.currentReportDetail?.score_business > 3 ? (
                  <Pill intent="success">
                    {props.currentReportDetail?.score_business}
                  </Pill>
                ) : (
                  <Pill intent="error">
                    {props.currentReportDetail?.score_business}
                  </Pill>
                )}
              </div>
            </div>
          )}
          {props.currentReportDetail?.score_lecturer && (
            <div className="text-label-3 text-typography-label grid grid-cols-11 items-center">
              <div className="col-span-3">Điếm số Giảng viên:</div>
              <div className="">
                {props.currentReportDetail?.score_lecturer > 3 ? (
                  <Pill intent="success">
                    {props.currentReportDetail?.score_lecturer}
                  </Pill>
                ) : (
                  <Pill intent="error">
                    {props.currentReportDetail?.score_lecturer}
                  </Pill>
                )}
              </div>
            </div>
          )}
          <DevTool control={props.form.control} />
          {props.isEdit && (
            <ContainerCreateReportTime
              upload_time={props.currentReportDetail?.upload_time}
              expired_time={props.currentReportDetail?.expired_time}
            />
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
          {!props.isEdit && (
            <Button
              posting={props.mutation.isLoading}
              intent={'primary'}
              type={'submit'}
            >
              Tạo mới
            </Button>
          )}
        </ContainerFormFooter>
      </form>
    </>
  )
}

export default FormReport
