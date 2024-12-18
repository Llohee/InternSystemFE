import { Modal } from '@/components/ui/modal/modal'

import { TenantDetail } from '@/models/api'
import DetailView from './detail'

const TenantDetailViewModal = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
  tenantChoose: TenantDetail
  type: string
}) => {
  const isAUAccept = props.tenantDetail.receiver_bussiness?.some(
    (e) => e.bussiness_notlink === props.tenantChoose.id
  )
  const isHRAccept = props.tenantDetail.receiver_university?.some(
    (e) => e.university_notlink === props.tenantChoose.id
  )
  // const useDetail = useGetUserDetail()
  // const tenantDetail = useGetTenantById(
  //   props.tenantChoose.id,
  //   useDetail.data.role === 'AU' ? 'business' : 'university'
  // )
  return (
    <>
      <TenantDetailView
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        tenantDetail={props.tenantChoose}
        isAUAccept={isAUAccept}
        isHRAccept={isHRAccept}
        type={props.type}
      />
    </>
  )
}
const TenantDetailView = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
  isAUAccept?: boolean
  isHRAccept?: boolean
  // userDetail: UserDetail
  type: string
}) => {
  // const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false)
  // const closeModal = () => {
  //   setIsConfirmCloseModal(true)
  // }
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
        closeModal={props.closeModal}
        size="large"
      >
        <div className="relative">
          <DetailView
            tenantDetail={props.tenantDetail}
            closeModal={props.closeModal}
            isAUAccept={props.isAUAccept}
            isHRAccept={props.isHRAccept}
            type={props.type}
          />
        </div>
      </Modal>
    </>
  )
}

export default TenantDetailViewModal
