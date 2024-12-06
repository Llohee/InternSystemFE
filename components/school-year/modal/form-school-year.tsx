import { YEAR_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import InputDate from '@/components/ui/input/input-date'
import { SelectDateRangeInput } from '@/components/ui/select-date/select-date-range-input'
import { SchoolYearDetail, UpdateSchoolYearRequest } from '@/models/api'
import dayjs from 'dayjs'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormSchoolYear = (props: {
  form: UseFormReturn<UpdateSchoolYearRequest, any>
  handleFormSubmit: SubmitHandler<UpdateSchoolYearRequest>
  mutation: any
  closeModal: () => void
  schoolYearDetail?: SchoolYearDetail
  isEdit?: boolean
}) => {
  const FilterRangerDate = (props: {
    data?: { start?: Date; end?: Date }
    disabledDate: boolean
    label?: string
    required?: boolean
    default?: { start: Date; end: Date }
    onChange: (data: { start: Date; end: Date } | undefined) => void
    format?: string
    picker?: 'time' | 'date' | 'month' | 'year'
  }) => {
    function updateRangeDate(data: { start?: Date; end?: Date }) {
      if (!data.start && !data.end) {
        props.onChange(undefined)
      }
      if (data.start && !data.end)
        props.onChange({ start: data.start, end: data.start })
      else if (!data.start && data.end)
        props.onChange({ start: data.end, end: data.end })
      else if (data.start && data.end) {
        if (dayjs(data.start).isBefore(data.end)) {
          props.onChange({ start: data.start, end: data.end })
        } else if (dayjs(data.start).isAfter(data.end))
          props.onChange({ start: data.end, end: data.start })
        else props.onChange({ start: data.start, end: data.end })
      }
    }
    return (
      <div className="flex gap-2">
        <SelectDateRangeInput
          label={props.label}
          required={props.required}
          disabledDate={props.disabledDate}
          format={props.format}
          picker={props.picker}
          default={props.default}
          onChange={updateRangeDate}
        />
      </div>
    )
  }

  const { register, handleSubmit } = props.form

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <Controller
            control={props.form.control}
            defaultValue={props.schoolYearDetail?.name}
            name="name"
            render={({ field: { value, onChange } }) => {
              // const parsedYearRange = value
              //   ? {
              //       start: dayjs(`${value.split('-')[0]}-01-01`).toDate(),
              //       end: dayjs(`${value.split('-')[1]}-12-31`).toDate(),
              //     }
              //   : undefined
              return (
                <FilterRangerDate
                  label="Năm học"
                  format={YEAR_FORMAT_VIEW}
                  picker="year"
                  required
                  default={props.schoolYearDetail?.name}
                  data={value}
                  disabledDate={false}
                  onChange={onChange}
                />
              )
            }}
          />
          <Input<UpdateSchoolYearRequest>
            label="Ghi chú"
            name="description"
            register={register}
            intent={
              props.form.formState.errors.description ? 'error' : 'default'
            }
            placeholder={'Nhập ghi chú'}
            defautValue={
              props.isEdit ? props.schoolYearDetail?.description : ''
            }
            message={props.form.formState.errors.description?.message ?? ''}
            disabled={props.isEdit}
            required
          />
          <InputDate<UpdateSchoolYearRequest>
            name="start_day"
            control={props.form.control}
            intent={
              props.form.formState.errors.start_day ? 'error' : 'default'
            }
            // onChange={(e) => {
            //   setTime(e.target.value)
            // }}
            label="Ngày bắt đầu"
            message={props.form.formState.errors.start_day?.message ?? ''}
            required
            // disabled={
            //   props.ProjectDetail?.approval_status == 'REJECT' ||
            //   props.typeHandle == 'aprrove'
            //     ? true
            //     : false
            // }
          />
          <InputDate<UpdateSchoolYearRequest>
            name="end_day"
            control={props.form.control}
            intent={props.form.formState.errors.end_day ? 'error' : 'default'}
            // onChange={(e) => {
            //   setTime(e.target.value)
            // }}
            label="Ngày bắt đầu"
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

export default FormSchoolYear
