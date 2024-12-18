import { DATE_FORMAT_VIEW } from '@/components/common/constant'
import { Button } from '@/components/ui/button/button'
import {
  CustomComboboxButton,
  ComboboxButtonWrapper,
  CustomComboboxOption,
  CustomComboboxOptions,
  ComboboxText,
  UserDetailOptionDisp,
  UserDetailSideDisp,
} from '@/components/ui/combobox/combobox'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input, inputStyles } from '@/components/ui/input/input'
import { InputSelect } from '@/components/ui/select/select'
import { SwitchButton } from '@/components/ui/switch/switch'
import { useGetConfigLTWhithoutGroup } from '@/hooks/query/account/lecturer'
import { useGetConfigSTWhithoutGroup } from '@/hooks/query/account/student'
import { usegetConfigSchoolYear } from '@/hooks/query/school-year'
import {
  GetAllSchoolYearResponse,
  GroupDetail,
  SemesterDetail,
  UpdateGroupRequest,
  UserGetDetail,
} from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { Combobox, ComboboxInput } from '@headlessui/react'
import { DevTool } from '@hookform/devtools'
import { DatePicker } from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormGroup = (props: {
  form: UseFormReturn<UpdateGroupRequest, any>
  handleFormSubmit: SubmitHandler<UpdateGroupRequest>
  getAllSchoolYear: GetAllSchoolYearResponse
  groupDetail?: GroupDetail
  mutation: any
  closeModal: () => void
  isEdit?: boolean
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = props.form
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
            <Input<UpdateGroupRequest>
              label={'Tên nhóm'}
              name="name"
              register={props.form.register}
              intent={props.form.formState.errors.name ? 'error' : 'default'}
              placeholder={'Nhập tên nhóm'}
              message={props.form.formState.errors.name?.message ?? ''}
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
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              control={props.form.control}
              name="school_year"
              render={({ field: { value, onChange } }) => {
                const options = props.getAllSchoolYear?.data?.map(
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
                        // setDisableStartDate(options.start)
                        // setDisableEndDate(options.end)
                        props.form.setValue('overdue_apply', null)
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
          <Controller
            control={props.form.control}
            name="lecturer"
            render={({
              field: {
                ref,
                value: trackValue,
                onChange: onChangeTrackValue,
                ...rest
              },
            }) => {
              const getallLecture = useGetConfigLTWhithoutGroup()
              const [search, setSearch] = useState('')
              const filterUser = getallLecture.data?.filter((person) => {
                return (
                  (person.fullname ?? '')
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  person.email.toLowerCase().includes(search.toLowerCase())
                )
              })
              const handleTrackValueChange = (
                selectedUser: UserGetDetail | null
              ) => {
                onChangeTrackValue(selectedUser ? selectedUser.id : null)
              }
              return (
                <div className="col col-span-full flex flex-col gap-2">
                  <label
                    className={`flex gap-1 text-label-3 text-typography-label`}
                  >
                    Giảng viên phụ trách
                    <span className="text-error-base">*</span>
                  </label>
                  <Combobox
                    value={
                      filterUser?.find((user) => trackValue === user.id) ?? null
                    }
                    onChange={handleTrackValueChange}
                    {...rest}
                  >
                    {({ value }) => (
                      <>
                        <div className="relative mt-1">
                          <div className="relative">
                            <ComboboxButtonWrapper
                              onClick={() => setSearch('')}
                            >
                              {({ open }) => (
                                <>
                                  <ComboboxInput
                                    ref={ref}
                                    className={inputStyles({
                                      intent: errors.lecturer
                                        ? 'error'
                                        : 'default',
                                    })}
                                    onChange={(event) =>
                                      setSearch(event.target.value)
                                    }
                                    placeholder={'Lựa chọn'}
                                    onClick={(e) => {
                                      if (open) {
                                        e.preventDefault()
                                      }
                                    }}
                                  />
                                  <CustomComboboxButton
                                    onClick={() => setSearch('')}
                                  />
                                </>
                              )}
                            </ComboboxButtonWrapper>
                          </div>
                          <CustomComboboxOptions className="bottom-full">
                            {getallLecture.isFetching || !filterUser ? (
                              <ComboboxText>Đang tải giảng viên</ComboboxText>
                            ) : filterUser.length === 0 ? (
                              <ComboboxText>
                                Không tìm thấy giảng viên
                              </ComboboxText>
                            ) : (
                              filterUser.map((user) => (
                                <CustomComboboxOption
                                  key={user.id}
                                  value={user}
                                >
                                  <UserDetailOptionDisp user={user} />
                                </CustomComboboxOption>
                              ))
                            )}
                          </CustomComboboxOptions>
                          {value && (
                            <UserDetailSideDisp
                              value={[value as UserGetDetail]}
                              onClear={() => {
                                onChangeTrackValue(null)
                              }}
                            />
                          )}
                        </div>
                        {errors.lecturer?.message ? (
                          <span className={'text-label-5 text-error-base'}>
                            {errors.lecturer?.message}
                          </span>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  </Combobox>
                </div>
              )
            }}
          />
          <Controller
            control={props.form.control}
            name="students"
            render={({
              field: {
                ref,
                value: trackValue,
                onChange: onChangeTrackValue,
                ...rest
              },
            }) => {
              const getallLecture = useGetConfigSTWhithoutGroup()
              const [search, setSearch] = useState('')
              const filterUser = getallLecture.data?.filter((person) => {
                return (
                  (person.fullname ?? '')
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  person.email.toLowerCase().includes(search.toLowerCase())
                )
              })

              const handleTrackValueChange = (
                selectedUsers: UserGetDetail[] | ChangeEvent<Element>
              ) => {
                if (Array.isArray(selectedUsers)) {
                  const selectedIds = selectedUsers.map((user) => user.id)
                  onChangeTrackValue(selectedIds)
                }
              }

              return (
                <div className="col col-span-full flex flex-col gap-2">
                  <label
                    className={`flex gap-1 text-label-3 text-typography-label`}
                  >
                    Sinh viên
                    <span className="text-error-base">*</span>
                  </label>
                  <Combobox
                    value={filterUser?.filter(
                      (user) =>
                        trackValue?.some((trackId) => trackId === user.id) ??
                        false
                    )}
                    onChange={handleTrackValueChange}
                    {...rest}
                    multiple
                  >
                    {({ value }) => (
                      <>
                        <div className="relative mt-1">
                          <div className="relative">
                            <ComboboxButtonWrapper
                              onClick={() => setSearch('')}
                            >
                              {({ open }) => (
                                <>
                                  <ComboboxInput
                                    ref={ref}
                                    className={inputStyles({
                                      intent: errors.lecturer
                                        ? 'error'
                                        : 'default',
                                    })}
                                    onChange={(event) =>
                                      setSearch(event.target.value)
                                    }
                                    placeholder={'Lựa chọn'}
                                    onClick={(e) => {
                                      if (open) {
                                        e.preventDefault()
                                      }
                                    }}
                                  />
                                  <CustomComboboxButton
                                    onClick={() => setSearch('')}
                                  />
                                </>
                              )}
                            </ComboboxButtonWrapper>
                          </div>
                          <CustomComboboxOptions className="bottom-full">
                            {getallLecture.isFetching || !filterUser ? (
                              <ComboboxText>Đang tải sinh viên</ComboboxText>
                            ) : filterUser.length === 0 ? (
                              <ComboboxText>
                                Không tìm thấy sinh viên
                              </ComboboxText>
                            ) : (
                              filterUser.map((user) => (
                                <CustomComboboxOption
                                  key={user.id}
                                  value={user}
                                >
                                  <UserDetailOptionDisp user={user} />
                                </CustomComboboxOption>
                              ))
                            )}
                          </CustomComboboxOptions>
                          {value && value.length > 0 && (
                            <UserDetailSideDisp
                              value={value}
                              onChangeTrackValue={handleTrackValueChange}
                            />
                          )}
                        </div>

                        {errors.students?.message ? (
                          <span className={'text-label-5 text-error-base'}>
                            {errors.students?.message}
                          </span>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  </Combobox>
                </div>
              )
            }}
          />
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div className="col-span-1">
              <label
                className={`flex gap-1 text-label-3 text-typography-label mb-2`}
              >
                Hạn tự ứng tuyển
                <span className="text-error-base">*</span>
              </label>
              <Controller
                name="overdue_apply"
                control={props.form.control}
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
                      format="DD-MM-YYYY HH:mm"
                      value={value ? dayjs(value) : null}
                      onChange={(date) => {
                        if (date) {
                          onChange(dayjs(date))
                        } else {
                          onChange('')
                        }
                      }}
                      placeholder={
                        !watch('semester')
                          ? 'Chọn kì học trước'
                          : 'Chọn hạn tự ứng tuyển'
                      }
                      showTime={{ format: 'HH:mm' }}
                      disabled={!watch('semester')}
                      disabledDate={
                        watch('semester')
                          ? (current) =>
                              (current &&
                                current < dayjs(semesterChoose?.start_day)) ||
                              current > dayjs(semesterChoose?.end_day)
                          : () => false
                      }
                    />
                    {error && (
                      <span className="mt-2 text-error-base text-label-5">
                        {props.form.formState.errors.overdue_apply?.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="col-span-1 flex gap-1 text-body-3 text-typography-subtitle">
              <span>*</span>{' '}
              <div>
                Sinh viên không thể tự ứng tuyển vào doanh nghiệp nếu quá hạn.
              </div>
            </div>
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
