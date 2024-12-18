import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SwitchButton } from '@/components/ui/switch/switch'
import {
  GetAllSchoolYearResponse,
  ScheduleDetail,
  UpdateScheduleRequest,
} from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { AxiosError } from 'axios'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { SelectMilestones } from './select-milestones'
import { DevTool } from '@hookform/devtools'
import { useEffect, useState } from 'react'
import { InputSelect } from '@/components/ui/select/select'
import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import dayjs from 'dayjs'

export const FormSchedule = (props: {
  form: UseFormReturn<UpdateScheduleRequest, any>
  getAllSchoolYear: GetAllSchoolYearResponse
  handleFormSubmit: SubmitHandler<UpdateScheduleRequest>
  scheduleDetail?: ScheduleDetail
  mutation: any
  closeModal: () => void
  resetForm?: () => void
  isReset?: boolean
  isEdit?: boolean
}) => {
  const { register, handleSubmit } = props.form
  const getLengthListMilestones = () => {
    if (props.isEdit) {
      let length =
        props.scheduleDetail?.milestones.filter(
          (item: any) => item !== undefined
        ).length ?? 0
      return length
    }
    let length =
      (props.form.watch('milestones')?.filter((item: any) => item !== undefined)
        .length ?? 0) + 1
    return length
  }
  const [semesterChoose, setSemesterChoose] = useState<
    | {
        value: any
        label: string
        start_day: Date
        end_day: Date
      }
    | undefined
  >()
  return (
    <>
      <form
        className="grid md:grid-cols-1"
        onSubmit={handleSubmit(props.handleFormSubmit)}
      >
        <ContainerFormBody>
          <div className="flex gap-3 items-center">
            <Input<UpdateScheduleRequest>
              label="Tên mốc thời gian"
              name="name"
              register={register}
              intent={props.form.formState.errors.name ? 'error' : 'default'}
              placeholder={'Nhập tên mốc thời gian'}
              message={props.form.formState.errors.name?.message ?? ''}
              disabled={props.isEdit}
              defautValue={props.scheduleDetail?.name}
              required
            />
            <Controller
              control={props.form.control}
              name="is_active"
              defaultValue={props.scheduleDetail?.is_active ?? false}
              render={({ field: { value, onChange } }) => (
                <SwitchButton
                  enabled={value ?? false}
                  setEnabled={() => {
                    onChange(!(value ?? false))
                  }}
                  label={'Trạng thái'}
                  disabled
                />
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              control={props.form.control}
              name="school_year"
              defaultValue={props.scheduleDetail?.school_year}
              render={({ field: { value, onChange } }) => {
                const options = props.getAllSchoolYear?.data.map(
                  (val: any) => ({
                    value: val.id,
                    label: `${val.name.start} - ${val.name.end}`,
                  })
                )
                return (
                  <InputSelect
                    options={options}
                    value={options?.filter((val) => value === val?.value)}
                    onChange={(options) => {
                      onChange(options?.value ?? '')
                    }}
                    label={'Năm học'}
                    placeholder={'Chọn năm học'}
                    required
                    intent={
                      props.form.formState.errors.school_year
                        ? 'error'
                        : 'default'
                    }
                    message={
                      props.form.formState.errors.school_year?.message ?? ''
                    }
                  />
                )
              }}
            />
            <Controller
              control={props.form.control}
              name="semester"
              defaultValue={props.scheduleDetail?.semester}
              render={({ field: { value, onChange } }) => {
                const options =
                  (props.getAllSchoolYear?.data ?? [])
                    .find((e) => e.id === props.form.watch('school_year'))
                    ?.semester?.map((val: any) => ({
                      value: val.id,
                      label: `${val.name} (${dayjs(val.start_day).format(
                        DATE_FORMAT_VIEW
                      )} - ${dayjs(val.end_day).format(DATE_FORMAT_VIEW)})`,
                      start_day: val.start_day as Date,
                      end_day: val.end_day as Date,
                    })) ?? []
                useEffect(() => {
                  if (props.isEdit) {
                    setSemesterChoose(
                      options.find(
                        (e) => e.value === props.form.watch('semester')
                      )
                    )
                  }
                }, [props.isEdit])
                return (
                  <div className="col flex flex-col gap-3">
                    <InputSelect
                      options={options}
                      value={options?.filter((val) => value === val?.value)}
                      onChange={(options) => {
                        onChange(options?.value ?? '')
                        setSemesterChoose(options)
                      }}
                      label={'Kì học'}
                      placeholder={
                        !props.form.watch('school_year')
                          ? 'Chọn năm học trước'
                          : 'Chọn kì học'
                      }
                      disabled={props.form.watch('school_year') ? false : true}
                      intent={
                        props.form.formState.errors.semester
                          ? 'error'
                          : 'default'
                      }
                      required
                      message={
                        props.form.formState.errors.semester?.message ?? ''
                      }
                    />
                  </div>
                )
              }}
            />
          </div>
          <div className="">
            <div className="text-label-3 text-typography-label pb-2">
              <label className="col-span-5">
                Cấu hình mốc
                <span className="text-error-base pl-1">*</span>
              </label>
            </div>
            {[...Array(getLengthListMilestones())].map((_, index) => (
              <div key={index} className="w-full">
                <SelectMilestones
                  index={index}
                  useForm={props.form}
                  default={(props.scheduleDetail?.milestones ?? [])[index]}
                  // type={props.type}
                  semesterChoose={semesterChoose}
                  isReset={props.isReset}
                  scheduleDetail={props.scheduleDetail}
                  getLengthListMilestones={getLengthListMilestones}
                  isEdit={props.isEdit}
                />
              </div>
            ))}
          </div>
        </ContainerFormBody>
        <ContainerFormFooter>
          <Button
            btnStyle={'no-background'}
            intent={'grey'}
            onClick={props.closeModal}
          >
            {props.isEdit ? 'Thoát' : 'Hủy'}
          </Button>
          {!props.isEdit && (
            <Button
              posting={props.mutation.isLoading}
              intent={props.isEdit ? 'primary' : 'primary'}
              type={'submit'}
            >
              {props.isEdit ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          )}
        </ContainerFormFooter>
      </form>
      <DevTool control={props.form.control} />
    </>
  )
}
