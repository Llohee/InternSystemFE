import {
  DATE_FORMAT_VIEW,
  YEAR_FORMAT_VIEW,
} from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input, inputStyles } from '@/components/ui/input/input'
import InputDate from '@/components/ui/input/input-date'
import { SelectDateRangeInput } from '@/components/ui/select-date/select-date-range-input'
import {
  SchoolYearDetail,
  SemesterDetail,
  UpdateSemesterRequest,
} from '@/models/api'
import dayjs from 'dayjs'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormSemester = (props: {
  form: UseFormReturn<UpdateSemesterRequest, any>
  handleFormSubmit: SubmitHandler<UpdateSemesterRequest>
  mutation: any
  closeModal: () => void
  schoolyearDetail: SchoolYearDetail
  SemesterDetail?: SemesterDetail
  isEdit?: boolean
}) => {
  const { register, handleSubmit } = props.form

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="flex flex-col gap-2">
            <label className="text-label-3 text-typography-label">
              Năm học
            </label>
            <div
              className={inputStyles({
                disabled: true,
                className: '!bg-grey-3 truncate',
              })}
            >
              {dayjs(props.schoolyearDetail.name.start).format(
                DATE_FORMAT_VIEW
              )}{' '}
              -{' '}
              {dayjs(props.schoolyearDetail.name.end).format(DATE_FORMAT_VIEW)}
            </div>
          </div>
          <Input<UpdateSemesterRequest>
            label="Tên kì học"
            name="name"
            register={register}
            intent={props.form.formState.errors.name ? 'error' : 'default'}
            placeholder={'Nhập tên kì học'}
            defautValue={props.isEdit ? props.SemesterDetail?.name : ''}
            message={props.form.formState.errors.name?.message ?? ''}
            disabled={props.isEdit}
            required
          />
          <Input<UpdateSemesterRequest>
            label="Ghi chú"
            name="description"
            register={register}
            intent={
              props.form.formState.errors.description ? 'error' : 'default'
            }
            placeholder={'Nhập ghi chú'}
            defautValue={props.isEdit ? props.SemesterDetail?.description : ''}
            message={props.form.formState.errors.description?.message ?? ''}
            disabled={props.isEdit}
          />
          <InputDate<UpdateSemesterRequest>
            name="start_day"
            control={props.form.control}
            intent={props.form.formState.errors.start_day ? 'error' : 'default'}
            // onChange={(e) => {
            //   setTime(e.target.value)
            // }}
            label="Ngày bắt đầu"
            placeholder="Chọn ngày bắt đầu"
            message={props.form.formState.errors.start_day?.message ?? ''}
            required
            // disabled={
            //   props.ProjectDetail?.approval_status == 'REJECT' ||
            //   props.typeHandle == 'aprrove'
            //     ? true
            //     : false
            // }
          />
          <InputDate<UpdateSemesterRequest>
            name="end_day"
            control={props.form.control}
            intent={props.form.formState.errors.end_day ? 'error' : 'default'}
            // onChange={(e) => {
            //   setTime(e.target.value)
            // }}
            label="Ngày kết thúc"
            placeholder="Chọn ngày kết thúc"
            message={props.form.formState.errors.end_day?.message ?? ''}
            required
            // disabled={
            //   props.ProjectDetail?.approval_status == 'REJECT' ||
            //   props.typeHandle == 'aprrove'
            //     ? true
            //     : false
            // }
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
    </>
  )
}

export default FormSemester
