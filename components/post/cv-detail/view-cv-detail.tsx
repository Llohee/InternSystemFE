import { Modal } from '@/components/ui/modal/modal'
import { UserDetail } from '@/models/api'
import React from 'react'
import CVDetail from './cv-detail'
import { useGetCVbyId } from '@/hooks/query/profile-cv'
import CvDetail from './cv-detail'

const DetailCVView = (props: {
  isOpen: boolean
  closeModal: () => void
  CV_applying: { cv_id: string; user_info: UserDetail; status: string }
}) => {
  const getCVDetail = useGetCVbyId(props.CV_applying.cv_id)
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Thông tin ứng tuyển
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size="xl"
      >
        <div className="relative">
          {getCVDetail.status === 'success' && (
            <CvDetail cvDetaildata={getCVDetail.data} />
          )}
        </div>
      </Modal>
    </>
  )
}

export default DetailCVView
