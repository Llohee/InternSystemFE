import { ContainerFormBody, ContainerFormFooter } from '@/components/ui/container'
import { TenantDetail } from '@/models/api'
import React from 'react'

const DetailView = (props: {
  tenantDetail: TenantDetail
  closeModal: () => void
}) => {
  return (
    <>
    <ContainerFormBody>
      
    </ContainerFormBody>
    <ContainerFormFooter>
      
    </ContainerFormFooter>
    </>
  )
}

export default DetailView
