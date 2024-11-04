import { Modal } from '@/components/ui/modal/modal'

const DetailCustomPostModal = (props: {
  isOpen: boolean
  closeModal: () => void
}) => {
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Chi tiết đề tài
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size="large"
      >
        <div className="relative">
          {/* <FormCustomPost
            form={formCreate}
            handleFormSubmit={handleFormSubmit}
            mutation={mutation}
            closeModal={() => {
              closeModal()
            }}
          /> */}
        </div>
      </Modal>
    </>
  )
}

export default DetailCustomPostModal
