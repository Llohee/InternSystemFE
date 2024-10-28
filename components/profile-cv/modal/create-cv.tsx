import { useState } from 'react'
import FormCV from './form-cv'
import { useCVCreate } from './hook'
import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { useClose } from '@headlessui/react'

const CreateCV = () => {
  let close = useClose()
  const { handleFormSubmit, formCreate, mutation } = useCVCreate(close)
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false)
  const closeModal = () => {
    setIsConfirmCloseModal(true)
  }
  return (
    <>
      <div className="">
        <div className="w-full flex flex-shrink-0 items-center justify-between py-4 px-6 border-b border-border-2  bg-white z-50 text-heading-7 text-typography-title rounded-t-2xl">
          Tạo mới CV
        </div>
        <FormCV
          useForm={formCreate}
          handleFormSubmit={handleFormSubmit}
          mutation={mutation}
          closeModal={() => {
            closeModal()
          }}
        />
      </div>
      <ConfirmCloseModal
        closeModal={(y) => {
          if (!y) setIsConfirmCloseModal(false)
          else {
            setIsConfirmCloseModal(false)
            formCreate.reset()
            mutation.reset()
            close()
          }
        }}
        isOpen={isConfirmCloseModal}
      />
    </>
  )
}

export default CreateCV
