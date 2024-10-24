import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'

import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { useState } from 'react'
import { FormUniversity } from './form-university'
import { useUniversityUpdate } from './hook'
import { TenantDetail } from '@/models/api'
import { useGetTenantById } from '@/hooks/query/tenant'
import { ModalLoading } from '@/components/ui/skeleton'
interface UpdateUniversity {
  isOpen: boolean
  closeModal: () => void
  type: string
  universityDetail: TenantDetail
}
const UpdateUniversityModal = (props: UpdateUniversity) => {
  const getUniversityById = useGetTenantById(
    props.universityDetail.id,
    props.type
  )
  if (getUniversityById.status === 'loading')
    return (
      <ModalLoading
        length={5}
        size="xl"
        isOpen={props.isOpen}
        closeModal={props.closeModal}
      />
    )
  if (getUniversityById.status === 'error') return <></>
  return (
    <>
      <UpdateModal
        closeModal={props.closeModal}
        universityDetail={getUniversityById.data}
        type={props.type}
        isOpen={props.isOpen}
      />
    </>
  )
}

const UpdateModal = (props: {
  isOpen: boolean
  closeModal: () => void
  type: string
  universityDetail: TenantDetail
}) => {
  const { handleFormSubmit, formUpdate, mutation } = useUniversityUpdate(
    props.closeModal,
    props.universityDetail,
    props.type
  )
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false)
  const closeModal = () => {
    setIsConfirmCloseModal(true)
  }
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Chỉnh sửa doanh nghiệp
            </div>
            <Button
              iconOnly
              ariaLabel="Reset form"
              btnStyle="no-background"
              onClick={() => {
                formUpdate.reset()
                mutation.reset()
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
        closeModal={closeModal}
        size="large"
      >
        <div className="relative">
          <FormUniversity
            form={formUpdate}
            handleFormSubmit={handleFormSubmit}
            mutation={mutation}
            closeModal={() => {
              closeModal()
            }}
            universityDetail={props.universityDetail}
          />
        </div>
        <ConfirmCloseModal
          closeModal={(y) => {
            if (!y) setIsConfirmCloseModal(false)
            else {
              setIsConfirmCloseModal(false)
              formUpdate.reset()
              mutation.reset()
              props.closeModal()
            }
          }}
          isOpen={isConfirmCloseModal}
        />
      </Modal>
    </>
  )
}

export default UpdateUniversityModal