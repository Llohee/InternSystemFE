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
import { SwitchButton } from '@/components/ui/switch/switch'
import { useGetConfigLTWhithoutGroup } from '@/hooks/query/account/lecturer'
import { useGetConfigSTWhithoutGroup } from '@/hooks/query/account/student'
import { GroupDetail, UpdateGroupRequest, UserGetDetail } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { Combobox, ComboboxInput } from '@headlessui/react'
import { DevTool } from '@hookform/devtools'
import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

export const FormGroup = (props: {
  form: UseFormReturn<UpdateGroupRequest, any>
  handleFormSubmit: SubmitHandler<UpdateGroupRequest>
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
