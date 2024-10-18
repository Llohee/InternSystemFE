import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { Input } from '@/components/ui/input/input'
import { InputSelect } from '@/components/ui/select/select'
import { usegetConfigCV } from '@/hooks/query/profile-cv'
import { UpdateApplyCVRequest, UserDetail } from '@/models/api'
import { DevTool } from '@hookform/devtools'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

const FormApply = (props: {
  form: UseFormReturn<UpdateApplyCVRequest, any>
  handleFormSubmit: SubmitHandler<UpdateApplyCVRequest>
  mutation: any
  closeModal: () => void
  resetForm?: () => void
  userDetail: UserDetail
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = props.form
  return (
    <>
      <form onSubmit={handleSubmit(props.handleFormSubmit)}>
        <ContainerFormBody>
          <div className="bg-grey-1 grid grid-cols-2 gap-2 px-6 py-4 border border-border-1 rounded-lg text-label-3 text-typography-label">
            <div className="col-span-2 flex gap-2">
              <div className="">Họ và tên: </div>
              <div className="font-normal">{props.userDetail.fullname}</div>
            </div>
            <div className="col-span-1 flex gap-2">
              <div className="">Email: </div>
              <div className="font-normal">{props.userDetail.email}</div>
            </div>
            <div className="col-span-1 flex gap-2 justify-end">
              <div className="">Số điện thoại: </div>
              <div className="font-normal">{props.userDetail.phone}</div>
            </div>
          </div>
          <Controller
            control={props.form.control}
            name="cv_id"
            rules={{ required: 'Trường học là bắt buộc' }}
            render={({ field: { value, onChange } }) => {
              const allCV = usegetConfigCV()
              const [options, setOptions] = useState<any[]>([])
              useEffect(() => {
                if (allCV.data) {
                  setOptions(
                    allCV.data.data.map((val: any) => ({
                      value: val.id,
                      label: val.title,
                    }))
                  )
                }
              }, [allCV.data])
              return (
                <InputSelect
                  options={options}
                  value={options.filter((val) => value?.includes(val.value))}
                  onChange={(options) => onChange(options?.value)}
                  register={props.form.register}
                  label={
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.33333 17.8333C5.33333 16.4525 6.4525 15.3333 7.83333 15.3333H9.5C10.8808 15.3333 12 16.4525 12 17.8333H5.33333Z"
                          fill="#00204D"
                        />
                        <path
                          d="M10.3333 12.8333C10.3333 13.7538 9.58714 14.5 8.66667 14.5C7.74619 14.5 7 13.7538 7 12.8333C7 11.9129 7.74619 11.1667 8.66667 11.1667C9.58714 11.1667 10.3333 11.9129 10.3333 12.8333Z"
                          fill="#00204D"
                        />
                        <path
                          d="M13.6667 12H18.6667V13.6667H13.6667V12Z"
                          fill="#00204D"
                        />
                        <path
                          d="M18.6667 15.3333H13.6667V17H18.6667V15.3333Z"
                          fill="#00204D"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C13.3811 2 14.5 3.11893 14.5 4.5V6.16667H22V22H2V6.16667H9.5V4.5C9.5 3.11893 10.6189 2 12 2ZM11.1667 4.5C11.1667 4.0394 11.5394 3.66667 12 3.66667C12.4606 3.66667 12.8333 4.0394 12.8333 4.5V7.83333H11.1667L11.1667 4.5ZM9.5 7.83333H3.66667V20.3333H20.3333V7.83333H14.5V9.5H9.5V7.83333Z"
                          fill="#00204D"
                        />
                      </svg>
                      <span>Chọn CV cá nhân</span>
                    </>
                  }
                  placeholder={'Lựa chọn'}
                  isLoading={allCV.isLoading}
                  maxMenuHeight={350}
                  required
                />
              )
            }}
          />
          <Input<UpdateApplyCVRequest>
            name="description"
            register={props.form.register}
            type="textArea"
            lineTextArea={5}
            label={
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 21.1304C2 20.6502 2.38932 20.2609 2.86957 20.2609H20.2609C20.7411 20.2609 21.1304 20.6502 21.1304 21.1304C21.1304 21.6107 20.7411 22 20.2609 22H2.86957C2.38932 22 2 21.6107 2 21.1304Z"
                    fill="#00204D"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.4286 2.25469C14.7682 1.9151 15.3188 1.9151 15.6584 2.25469L19.1366 5.73295C19.4762 6.07254 19.4762 6.62312 19.1366 6.9627L8.70185 17.3975C8.58045 17.5189 8.42585 17.6016 8.25751 17.6353L3.90968 18.5049C3.62458 18.5619 3.32985 18.4726 3.12427 18.267C2.91868 18.0615 2.82945 17.7667 2.88647 17.4816L3.75603 13.1338C3.7897 12.9655 3.87244 12.8109 3.99383 12.6895L14.4286 2.25469ZM5.40975 13.7331L4.84763 16.5437L7.65826 15.9816L17.292 6.34783L15.0435 4.09932L5.40975 13.7331Z"
                    fill="#00204D"
                  />
                </svg>
                <span>Giới thiệu</span>
              </>
            }
            placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
          />
        </ContainerFormBody>
        <ContainerFormFooter className="gap-6">
          <Button
            // btnStyle={'no-background'}
            intent="grey"
            onClick={props.closeModal}
          >
            Hủy
          </Button>
          <Button
            posting={props.mutation.isLoading}
            type={'submit'}
            className="w-full"
          >
            Nộp Hồ sơ ứng tuyển
          </Button>
        </ContainerFormFooter>
        <DevTool control={props.form.control} />
      </form>
    </>
  )
}

export default FormApply
