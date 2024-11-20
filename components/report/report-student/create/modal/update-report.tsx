import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { ReportDetail } from '@/models/api'
import { useState } from 'react'
import FormReport from './form-report'
import { ListTab } from '@/components/ui/list-tab/list-tab'
import { useReportUpdate } from './hook'
import ReportComment from '../comment'
import { useReportCommentCreate } from '../comment/hook'

const Updatereport = (props: {
  isOpen: boolean
  closeModal: () => void
  currentReportDetail: ReportDetail
}) => {
  const { handleFormSubmit, formUpdate, mutation } = useReportUpdate(
    props.closeModal
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
              Chi tiết báo cáo
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size="large"
        hideBorder
        appear={false}
      >
        <ListTab
          titles={[
            {
              title: 'Báo cáo',
              node: (
                <FormReport
                  form={formUpdate}
                  handleFormSubmit={handleFormSubmit}
                  currentReportDetail={props.currentReportDetail}
                  closeModal={() => {
                    props.closeModal()
                  }}
                  mutation={mutation}
                  isEdit={true}
                />
              ),
            },
            {
              title: 'Bình luận',
              node: (
                <ReportComment
                  closeModal={props.closeModal}
                  ReportId={props.currentReportDetail?.id}
                  module={'student-comment'}
                />
              ),
            },
          ]}
          tabPadding={'px-6'}
        />
        {/* <ConfirmCloseModal
          closeModal={(y) => {
            if (!y) setIsConfirmCloseModal(false)
            else {
              setIsConfirmCloseModal(false)
              // resetForm()
              // mutation.reset()
              props.closeModal()
            }
          }}
          isOpen={isConfirmCloseModal}
        /> */}
      </Modal>
    </>
  )
}

export default Updatereport
