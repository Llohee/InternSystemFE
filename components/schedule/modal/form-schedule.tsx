import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { SwitchButton } from '@/components/ui/switch/switch'
import { ScheduleDetail, UpdateScheduleRequest } from '@/models/api'
import { ErrorResponse } from '@/models/api/common'
import { AxiosError } from 'axios'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { SelectMilestones } from './select-milestones'
import { DevTool } from '@hookform/devtools'

export const FormSchedule = (props: {
  form: UseFormReturn<UpdateScheduleRequest, any>
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
