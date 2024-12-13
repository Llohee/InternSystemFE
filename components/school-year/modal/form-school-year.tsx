import { YEAR_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SchoolYearDetail, UpdateSchoolYearRequest } from '@/models/api'
import { DevTool } from '@hookform/devtools'
import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormSchoolYear = (props: {
  form: UseFormReturn<UpdateSchoolYearRequest, any>
  handleFormSubmit: SubmitHandler<UpdateSchoolYearRequest>
  mutation: any
  closeModal: () => void
  schoolYearDetail?: SchoolYearDetail
  isEdit?: boolean
}) => {
  const { register, handleSubmit, watch, setError, clearErrors, formState } =
    props.form
  const { errors, isSubmitting, isValid } = formState
  const { RangePicker } = DatePicker

  const watchStart_DayDate = watch(`start_day`)
  const watchEnd_DayDate = watch(`end_day`)

  const watchStart_Name = watch('name.start')
  const watchEnd_Name = watch('name.end')

  const validateYears = () => {
    if (watchStart_Name && watchEnd_Name) {
      const mathYear = Math.abs(
        dayjs(watchEnd_Name).year() - dayjs(watchStart_Name).year()
      )
      if (mathYear > 1 || mathYear == 0) {
        setError('name', {
          type: 'manual',
          message: `Năm bắt đầu và năm kết thúc phải liền nhau`,
        })
      } else {
        clearErrors('name')
      }
    }
  }

  const validateDates = () => {
    if (watchStart_DayDate && watchEnd_DayDate) {
      const isStart_DayAfterEnd_Day = dayjs(watchStart_DayDate).isAfter(
        dayjs(watchEnd_DayDate)
      )
      const isEnd_DayBeforeStart_Day = dayjs(watchEnd_DayDate).isBefore(
        dayjs(watchStart_DayDate)
      )

      const isStart_DateBeforeStart_Name = dayjs(watchStart_DayDate).isBefore(
        dayjs(watchStart_Name).startOf('year')
      )
      const isStart_DateAfterEnd_Name = dayjs(watchStart_DayDate).isAfter(
        dayjs(watchEnd_Name).endOf('year')
      )

      const isEnd_DateBeforeStart_Name = dayjs(watchEnd_DayDate).isBefore(
        dayjs(watchStart_Name).startOf('year')
      )
      const isEnd_DateAfterEnd_Name = dayjs(watchEnd_DayDate).isAfter(
        dayjs(watchEnd_Name).endOf('year')
      )

      if (isStart_DayAfterEnd_Day) {
        setError('start_day', {
          type: 'manual',
          message: `Ngày bắt đầu phải nhỏ hơn ngày kết thúc`,
        })
      } else if (isStart_DateBeforeStart_Name || isStart_DateAfterEnd_Name) {
        setError('start_day', {
          type: 'manual',
          message: `Ngày bắt đầu phải thuộc năm họchọc`,
        })
      } else {
        clearErrors('start_day')
      }
      if (isEnd_DayBeforeStart_Day) {
        setError('end_day', {
          type: 'manual',
          message: `Ngày kết thúc phải lớn hơn ngày bắt đầu`,
        })
      } else if (isEnd_DateBeforeStart_Name || isEnd_DateAfterEnd_Name) {
        setError('end_day', {
          type: 'manual',
          message: `Ngày kết thúc phải thuộc năm học`,
        })
      } else {
        clearErrors('end_day')
      }
    }
  }
  useEffect(() => {
    if (watch('name') || !watch('name')) {
      props.form.resetField('start_day')
      props.form.resetField('end_day')
    }
  }, [watch('name')])
  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="">
            <label
              className={`flex gap-1 text-label-3 text-typography-label mb-2`}
            >
              Năm học
              <span className="text-error-base">*</span>
            </label>
            <Controller
              control={props.form.control}
              defaultValue={props.schoolYearDetail?.name}
              name="name"
              rules={{
                validate: () => {
                  validateYears()
                  return true
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                const handleDateChange = (
                  dates: [Dayjs | null, Dayjs | null] | null,
                  dateStrings: [string, string]
                ) => {
                  if (!dates || dates[0] === null || dates[1] === null) {
                    onChange(undefined)
                    return
                  }

                  const startOfYear = dates[0].startOf('year').toDate()
                  const endOfYear = dates[1].endOf('year').toDate()

                  onChange({ start: startOfYear, end: endOfYear })
                  validateYears()
                }
                return (
                  <>
                    <RangePicker
                      picker={'year'}
                      placeholder={['Chọn năm bắt đầu', 'Chọn năm kết thúc']}
                      className="w-full py-2 px-3"
                      value={
                        value ? [dayjs(value.start), dayjs(value.end)] : null
                      }
                      onChange={handleDateChange}
                      format={YEAR_FORMAT_VIEW}
                      required
                    />
                    {error && (
                      <span className="mt-2 text-error-base text-label-5">
                        {error.message}
                      </span>
                    )}
                  </>
                )
              }}
            />
          </div>
          <Input<UpdateSchoolYearRequest>
            label="Ghi chú"
            name="description"
            register={register}
            intent={
              props.form.formState.errors.description ? 'error' : 'default'
            }
            placeholder={'Nhập ghi chú'}
            message={props.form.formState.errors.description?.message ?? ''}
          />
          <div className="">
            <label
              className={`flex gap-1 text-label-3 text-typography-label mb-2`}
            >
              Ngày bắt đầu
              <span className="text-error-base">*</span>
            </label>
            <Controller
              name="start_day"
              control={props.form.control}
              rules={{
                required: "Ngày bắt đầu là bắt buộc",
                validate: () => {
                  validateDates()
                  return true
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <DatePicker
                    className="w-full py-2 px-3"
                    format={'DD/MM/YYYY'}
                    value={value ? dayjs(value).second(0).millisecond(0) : null}
                    onChange={(date) => {
                      if (date) {
                        onChange(dayjs(date).startOf('day').toISOString())
                        validateDates()
                      } else {
                        onChange('')
                      }
                    }}
                    placeholder={
                      !watch('name') ? 'Chọn năm học trước' : 'Chọn ngày'
                    }
                    disabled={!watch('name')}
                    disabledDate={
                      watch('name')
                        ? (current) =>
                            (current &&
                              current <
                                dayjs(watch('name.start')).startOf('year')) ||
                            current > dayjs(watch('name.end')).endOf('year')
                        : () => false
                    }
                  />
                  {error && (
                    <span className="mt-2 text-error-base text-label-5">
                      {error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="">
            <label
              className={`flex gap-1 text-label-3 text-typography-label mb-2`}
            >
              Ngày kết thúc
              <span className="text-error-base">*</span>
            </label>
            <Controller
              name="end_day"
              control={props.form.control}
              rules={{
                required: "Ngày bắt đầu là bắt buộc",
                validate: () => {
                  validateDates()
                  return true
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <DatePicker
                    className="w-full py-2 px-3"
                    format={'DD/MM/YYYY'}
                    value={value ? dayjs(value).second(0).millisecond(0) : null}
                    onChange={(date) => {
                      if (date) {
                        onChange(dayjs(date).startOf('day').toISOString())
                        validateDates()
                      } else {
                        onChange('')
                      }
                    }}
                    placeholder={
                      !watch('name') ? 'Chọn năm học trước' : 'Chọn ngày'
                    }
                    disabled={!watch('name')}
                    disabledDate={
                      watch('name')
                        ? (current) =>
                            (current &&
                              current <
                                dayjs(watch('name.start')).startOf('year')) ||
                            current > dayjs(watch('name.end')).endOf('year')
                        : () => false
                    }
                  />
                  {error && (
                    <span className="mt-2 text-error-base text-label-5">
                      {error.message}
                    </span>
                  )}
                </div>
              )}
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
            posting={props.mutation.isLoading || isSubmitting}
            intent={props.isEdit ? 'primary' : 'primary'}
            type={'submit'}
            disabled={!isValid || Object.keys(errors).length > 0}
          >
            {props.isEdit ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </ContainerFormFooter>
      </form>
      <DevTool control={props.form.control} />
    </>
  )
}

export default FormSchoolYear
