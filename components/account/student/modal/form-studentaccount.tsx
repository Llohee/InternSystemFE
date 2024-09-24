import { YEAR_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SelectDateRangeInput } from '@/components/ui/select-date/select-date-range-input'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import { usegetConfigUniversity } from '@/hooks/query/university'
import { checkPhoneVN } from '@/hooks/regex'
import { UpdateUserRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormStudentAccount = (props: {
  form: UseFormReturn<UpdateUserRequest, any>
  handleFormSubmit: SubmitHandler<UpdateUserRequest>
  mutation: any
  userDetail?: UserGetDetail
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
    onChange: (data: string | undefined) => void
    format?: string
    picker?: 'time' | 'date' | 'month' | 'year'
  }) => {
    function updateRangeDate(data: { start?: Date; end?: Date }) {
      if (!data.start && !data.end) {
        props.onChange(undefined)
      } else if (data.start && data.end) {
        const startYear = dayjs(data.start).year()
        const endYear = dayjs(data.end).year()
        props.onChange(`${startYear}-${endYear}`)
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
            {/* <Controller
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
            /> */}
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
          <div className="col col-span-full grid md:grid-cols-2 gap-5">
            <Input<UpdateUserRequest>
              label={'Tên tài khoản'}
              name="fullname"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên tài khoản'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Mã số sinh viên'}
              name="id_number"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên mã số sinh viên'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Khoa'}
              name="faculty"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên khoa'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Viện'}
              name="institute"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên viện'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Ngành'}
              name="major"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên ngành'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Input<UpdateUserRequest>
              label={'Lớp'}
              name="institute"
              register={props.form.register}
              intent={
                props.form.formState.errors.fullname ? 'error' : 'default'
              }
              placeholder={'Nhập tên lớp'}
              message={props.form.formState.errors.fullname?.message ?? ''}
              required
            />
            <Controller
              control={props.form.control}
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

          {props.mutation.error && (
            <div className="col col-span-full mt-5 text-error-base text-label-5">
              {(props.mutation.error as AxiosError<ErrorResponse>)?.response
                ?.data?.description ?? ''}
            </div>
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
