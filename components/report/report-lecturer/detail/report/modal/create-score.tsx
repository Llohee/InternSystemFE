import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { ModalLoading } from '@/components/ui/skeleton'
import { useGetReportById } from '@/hooks/query/report-lecturer'
import { ReportDetail } from '@/models/api'
import { useState } from 'react'
import FromScore from './form-score'
import { useScoreUpdate } from './hook'
import ReportComment from '@/components/report/report-student/create/comment'
import { ListTab } from '@/components/ui/list-tab/list-tab'

const CreatescoreModal = (props: {
  isOpen: boolean
  closeModal: () => void
  report_id: string
  defaultTabReport: boolean
}) => {
  const getReportById = useGetReportById(props.report_id)
  if (getReportById.status === 'loading')
    return (
      <ModalLoading
        closeModal={props.closeModal}
        isOpen={props.isOpen}
        length={5}
        size="large"
      ></ModalLoading>
    )
  if (getReportById.status === 'error') return <></>
  return (
    <Createscore
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      report={getReportById.data}
      defaultTabReport={props.defaultTabReport}
    />
  )
}

const Createscore = (props: {
  isOpen: boolean
  closeModal: () => void
  report: ReportDetail
  defaultTabReport: boolean
}) => {
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false)

  const closeModal = () => {
    setIsConfirmCloseModal(true)
  }
  const { handleFormSubmit, formUpdate, mutation } = useScoreUpdate(
    props.closeModal
  )
  const [selectedTab, onChangeSelectedTab] = useState(
    props.defaultTabReport ? 2 : 0
  )
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Chi tiết báo cáo
            </div>
            <Button
              iconOnly
              ariaLabel="Reset form"
              btnStyle="no-background"
              onClick={() => {
                // formCreate.reset()
                // mutation.reset()
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
        closeModal={props.closeModal}
        size="large"
        className="!max-w-large"
        hideBorder
        appear={false}
      >
        <ListTab
          selectedIndex={selectedTab}
          onChange={onChangeSelectedTab}
          titles={[
            {
              title: 'Báo cáo',
              node: (
                <FromScore
                  form={formUpdate}
                  report={props.report}
                  closeModal={() => props.closeModal()}
                />
              ),
            },
            {
              title: 'Bình luận',
              node: (
                <ReportComment
                  closeModal={props.closeModal}
                  ReportId={props.report?.id}
                  module={'lecturer-comment'}
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
              formUpdate.reset()
              mutation.reset()
              props.closeModal()
            }
          }}
          isOpen={isConfirmCloseModal}
        /> */}
      </Modal>
    </>
  )
}

export default CreatescoreModal
