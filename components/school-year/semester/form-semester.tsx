import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input, inputStyles } from '@/components/ui/input/input'
import {
  SchoolYearDetail,
  SemesterDetail,
  UpdateSemesterRequest,
} from '@/models/api'
import { DatePicker } from 'antd'
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
  const { register, handleSubmit, watch, setError, clearErrors, formState } =
    props.form
  const { errors, isSubmitting, isValid } = formState

  const watchStart_DayDate = watch(`start_day`)
  const watchEnd_DayDate = watch(`end_day`)

  const validateDates = () => {
    if (watchStart_DayDate && watchEnd_DayDate) {
      const isStart_DayAfterEnd_Day = dayjs(watchStart_DayDate).isAfter(
        dayjs(watchEnd_DayDate)
      )
      const isEnd_DayBeforeStart_Day = dayjs(watchEnd_DayDate).isBefore(
        dayjs(watchStart_DayDate)
      )
      const isStart_DaySameEnd_Day = dayjs(watchStart_DayDate).isSame(
        dayjs(watchEnd_DayDate)
      )

      if (isStart_DayAfterEnd_Day || isStart_DaySameEnd_Day) {
        setError('start_day', {
          type: 'manual',
          message: `Ngày bắt đầu phải nhỏ hơn ngày kết thúc`,
        })
      } else {
        clearErrors('start_day')
      }
      if (isEnd_DayBeforeStart_Day || isStart_DaySameEnd_Day) {
        setError('end_day', {
          type: 'manual',
          message: `Ngày kết thúc phải lớn hơn ngày bắt đầu`,
        })
      } else {
        clearErrors('end_day')
      }
    }
  }
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
              {dayjs(props.schoolyearDetail.start_day).format(DATE_FORMAT_VIEW)}{' '}
              - {dayjs(props.schoolyearDetail.end_day).format(DATE_FORMAT_VIEW)}
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
                validate: () => {
                  validateDates()
                  return true
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <DatePicker
                    className={inputStyles({
                      className: '!w-full',
                      intent: error ? 'error' : 'default',
                    })}
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
                    placeholder={'Chọn ngày bắt đầu'}
                    disabledDate={(current) =>
                      (current &&
                        current < dayjs(props.schoolyearDetail.start_day)) ||
                      current > dayjs(props.schoolyearDetail.end_day)
                    }
                  />
                  {error && (
                    <span className="mt-2 text-error-base text-label-5">
                      {props.form.formState.errors.start_day?.message}
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
                validate: () => {
                  validateDates()
                  return true
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <DatePicker
                    className={inputStyles({
                      className: '!w-full',
                      intent: error ? 'error' : 'default',
                    })}
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
                    placeholder={'Chọn ngày kết thúc'}
                    disabledDate={(current) =>
                      (current &&
                        current < dayjs(props.schoolyearDetail.start_day)) ||
                      current > dayjs(props.schoolyearDetail.end_day)
                    }
                  />
                  {error && (
                    <span className="mt-2 text-error-base text-label-5">
                      {props.form.formState.errors.end_day?.message}
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
          >
            {props.isEdit ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </ContainerFormFooter>
      </form>
    </>
  )
}

export default FormSemester
