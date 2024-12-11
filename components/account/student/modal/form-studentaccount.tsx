import { YEAR_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SelectDateRangeInput } from '@/components/ui/select-date/select-date-range-input'
import { SwitchButton } from '@/components/ui/switch/switch'
import { checkPhoneVN } from '@/hooks/regex'
import { UpdateUserRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormStudentAccount = (props: {
  form: UseFormReturn<UpdateUserRequest, any>
  handleFormSubmit: SubmitHandler<UpdateUserRequest>
  mutation: any
  studentDetail?: UserGetDetail
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

  return (
    <>
      <form
        className="grid md:grid-cols-1"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="flex gap-3 items-center">
            <Input<UpdateUserRequest>
              label="Email"
              name="email"
              register={register}
              intent={props.form.formState.errors.email ? 'error' : 'default'}
              placeholder={'Nhập email trường học'}
              message={props.form.formState.errors.email?.message ?? ''}
              disabled={props.isEdit}
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
          {!props.isEdit && (
            <div className="col col-span-full">
              <Input<UpdateUserRequest>
                label={'Mật khẩu'}
                name="password"
                register={props.form.register}
                type={'password'}
                intent={
                  props.form.formState.errors.password ? 'error' : 'default'
                }
                placeholder={'Nhập mật khẩu'}
                message={props.form.formState.errors.password?.message ?? ''}
                required
              />
            </div>
          )}
          <div className="col col-span-full grid md:grid-cols-2 gap-6">
            <Input<UpdateUserRequest>
              label={'Họ và tên'}
              name="fullname"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập họ và tên'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Mã số sinh viên'}
              name="id_number"
              register={props.form.register}
              intent={
                props.form.formState.errors.id_number ? 'error' : 'default'
              }
              placeholder={'Nhập tên mã số sinh viên'}
              message={props.form.formState.errors.id_number?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Khoa'}
              name="faculty"
              register={props.form.register}
              intent={props.form.formState.errors.faculty ? 'error' : 'default'}
              placeholder={'Nhập tên khoa'}
              message={props.form.formState.errors.faculty?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Viện'}
              name="institute"
              register={props.form.register}
              intent={
                props.form.formState.errors.institute ? 'error' : 'default'
              }
              placeholder={'Nhập tên viện'}
              message={props.form.formState.errors.institute?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Ngành'}
              name="major"
              register={props.form.register}
              intent={props.form.formState.errors.major ? 'error' : 'default'}
              placeholder={'Nhập tên ngành'}
              message={props.form.formState.errors.major?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Lớp'}
              name="class"
              register={props.form.register}
              intent={props.form.formState.errors.class ? 'error' : 'default'}
              placeholder={'Nhập tên lớp'}
              message={props.form.formState.errors.class?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Chương trình đào tạo'}
              name="program_training"
              register={props.form.register}
              intent={
                props.form.formState.errors.program_training
                  ? 'error'
                  : 'default'
              }
              placeholder={'Nhập chương trình đào tạo'}
              message={
                props.form.formState.errors.program_training?.message ?? ''
              }
              required
            />
            <Controller
              control={props.form.control}
              defaultValue={props.studentDetail?.academic_year}
              name="academic_year"
              render={({ field: { value, onChange } }) => {
                // const parsedYearRange = value
                //   ? {
                //       start: dayjs(`${value.split('-')[0]}-01-01`).toDate(),
                //       end: dayjs(`${value.split('-')[1]}-12-31`).toDate(),
                //     }
                //   : undefined
                return (
                  <FilterRangerDate
                    label="Niên khóa"
                    format={YEAR_FORMAT_VIEW}
                    picker="year"
                    required
                    default={props.studentDetail?.academic_year}
                    data={value}
                    disabledDate={false}
                    onChange={onChange}
                  />
                )
              }}
            />

            <Input<UpdateUserRequest>
              label={'Số điện thoại'}
              name="phone"
              register={props.form.register}
              intent={props.form.formState.errors.phone ? 'error' : 'default'}
              placeholder={'Nhập số điện thoại'}
              message={props.form.formState.errors.phone?.message ?? ''}
              onInput={(event) => {
                event.currentTarget.value = checkPhoneVN(event)
              }}
            />
          </div>
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
