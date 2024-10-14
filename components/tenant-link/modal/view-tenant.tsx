import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'

import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { useState } from 'react'
import { TenantDetail } from '@/models/api'
interface CreateGroup {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
}
const CreateGroupModal = (props: CreateGroup) => {
  
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
              Thông tin chi tiết
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={closeModal}
        size="large"
      >
        <div className="relative">
          {/* <FormGroup
            form={formCreate}
            handleFormSubmit={handleFormSubmit}
            mutation={mutation}
            closeModal={() => {
              closeModal()
            }}
          /> */}
        </div>
        <ConfirmCloseModal
          closeModal={(y) => {
            if (!y) setIsConfirmCloseModal(false)
            else {
              setIsConfirmCloseModal(false)
              // formCreate.reset()
              // mutation.reset()
              props.closeModal()
            }
          }}
          isOpen={isConfirmCloseModal}
        />
      </Modal>
    </>
  )
}

export default CreateGroupModal
