import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'

import { ConfirmCloseModal } from '@/components/common/confirm-close-modal'
import { useState } from 'react'
import { TenantDetail } from '@/models/api'
import { useGetTenantById } from '@/hooks/query/tenant'
import { useGetUserDetail } from '@/hooks/query/auth'
import { ModalLoading } from '@/components/ui/skeleton'
import DetailView from './detail'

const TenantDetailViewModal = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
}) => {
  const useDetail = useGetUserDetail()
  const getTenantById = useGetTenantById(
    props.tenantDetail.id,
    useDetail.data.role === 'AU' ? 'business' : 'university'
  )
  if (getTenantById.status === 'loading')
    return (
      <ModalLoading
        length={5}
        size="xl"
        isOpen={props.isOpen}
        closeModal={props.closeModal}
      />
    )
  if (getTenantById.status === 'error') return <></>
  return (
    <>
      <TenantDetailView
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        tenantDetail={getTenantById.data}
      />
    </>
  )
}
const TenantDetailView = (props: {
  isOpen: boolean
  closeModal: () => void
  tenantDetail: TenantDetail
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
          />
        </div>
      </Modal>
    </>
  )
}

export default TenantDetailViewModal
