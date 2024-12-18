import { Modal } from '@/components/ui/modal/modal'
import { useGetCVbyId } from '@/hooks/query/profile-cv'
import { UserGetDetail } from '@/models/api'
import CvDetail from './cv-detail'

const DetailCVView = (props: {
  isOpen: boolean
  closeModal: () => void
  CV_applying: {
    cv_id: string
    user_info: UserGetDetail
    status: 'Pending' | 'HR Approver' | 'AU Approver'
  }
}) => {
  const getCVDetail = useGetCVbyId(props.CV_applying.cv_id)
  return (
    <>
      {getCVDetail.status === 'success' && (
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
            <CvDetail cvDetaildata={getCVDetail.data} />
          </div>
        </Modal>
      )}
    </>
  )
}

export default DetailCVView
