import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { ModalLoading } from '@/components/ui/skeleton'
import { useGetSchedulebyId } from '@/hooks/query/schedule'
import { ScheduleDetail } from '@/models/api'
import { useScheduleUpdate } from './hook'
import { FormSchedule } from './form-schedule'
import Image from 'next/image'
import { useState } from 'react'
import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
interface UpdateScheduleProps {
  isOpen: boolean
  closeModal: () => void
  schedule: ScheduleDetail
  isEdit: boolean
}
const UpdateScheduleModal = (props: UpdateScheduleProps) => {
  const getSchedule = useGetSchedulebyId(props.schedule.id)
  if (getSchedule.status === 'loading')
    return (
      <ModalLoading
        length={7}
        size="large"
        isOpen={props.isOpen}
        closeModal={props.closeModal}
      />
    )
  if (getSchedule.status === 'error') return <></>

  return (
    <UpdateModal
      closeModal={props.closeModal}
      data={getSchedule.data}
      isOpen={props.isOpen}
      isEdit={props.isEdit}
    />
  )
}
interface UpdateModalProps {
  isOpen: boolean
  closeModal: () => void
  data: ScheduleDetail
  isEdit: boolean
}
const UpdateModal = (props: UpdateModalProps) => {
  const { formUpdate, mutation, handleFormSubmit } = useScheduleUpdate(
    props.closeModal,
    props.data
  )
  if (!props.data) return <></>
  const getSchedule = useGetSchedulebyId(props.data.id)
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false)
  const closeModal = () => {
    props.closeModal()
    // setIsConfirmCloseModal(true)
  }
  const [isReset, setIsReset] = useState(false)
  if (getSchedule.status === 'success')
    return (
      <>
        <Modal
          title={
            <div className="w-full flex gap-3 items-center">
              <div className="grow">Chi tiết mốc thời gian</div>
              <Button
                iconOnly
                btnStyle="no-background"
                ariaLabel="Reset form"
                onClick={() => {
                  setIsReset(!isReset)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="currentColor"
                >
                  <path d="M16.1364 11.3849C16.1364 14.7688 13.3839 17.5213 10 17.5213C6.61614 17.5213 3.86364 14.7688 3.86364 11.3849C3.86364 8.00108 6.61614 5.24858 10 5.24858C11.3561 5.24858 12.6407 5.69176 13.7023 6.49835L11.245 8.81176L17.4952 9.48199L17.2014 3.20312L14.7093 5.54994C13.3798 4.47267 11.7352 3.88494 10 3.88494C5.86477 3.88494 2.5 7.24972 2.5 11.3849C2.5 15.5202 5.86477 18.8849 10 18.8849C14.1352 18.8849 17.5 15.5202 17.5 11.3849H16.1364Z" />
                </svg>
              </Button>
            </div>
          }
          isOpen={props.isOpen}
          closeModal={() => closeModal()}
          size="large"
        >
          <div className="">
            <FormSchedule
              form={formUpdate}
              handleFormSubmit={handleFormSubmit}
              mutation={mutation}
              closeModal={closeModal}
              scheduleDetail={props.data}
              isReset={isReset}
              isEdit={props.isEdit}
            />
          </div>
          {/* <ConfirmCloseModal
            closeModal={(y) => {
              if (!y) setIsConfirmCloseModal(false)
              else {
                setIsConfirmCloseModal(false)
                props.closeModal()
                // mutation.reset()
              }
            }}
            isOpen={isConfirmCloseModal}
          /> */}
        </Modal>
      </>
    )
  if (getSchedule.status === 'loading') return <ModalLoading {...props} />
  if (getSchedule.status === 'error') return <>Lỗi</>
  return <></>
}

export default UpdateScheduleModal
