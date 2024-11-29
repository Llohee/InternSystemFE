import Avatar from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import {
  ContainerFormBody,
  ContainerFormFooter,
} from '@/components/ui/container'
import { PostDetail, UserDetail } from '@/models/api'
import ConfirmApproveModal from './confirm-approve'
import { useState } from 'react'
import { ViewStatusStudent } from '@/components/common/student-status/status-view'
import DetailCVView from '../cv-detail/view-cv-detail'

const ApplyPost = (props: {
  postDetail: PostDetail
  closeModal: () => void
}) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
  const [isShowModalDetailView, setIsShowModalDetailView] = useState(false)
  const [cvDetail, setCvDetail] = useState<
    { cv_id: string; user_info: UserDetail; status: string } | undefined
  >(undefined)
  return (
    <>
      <ContainerFormBody>
        <div className="flex flex-col gap-2">
          {props.postDetail.CV_applying.map((val, index) => (
            <>
              <div
                key={val.user_info.id}
                className="w-full flex gap-3 items-center px-4 py-3 hover:bg-slate-100 group first:rounded-t-lg last:rounded-b-lg cursor-pointer group"
              >
                <button
                  onClick={() => {
                    setCvDetail(val), setIsShowModalDetailView(true)
                  }}
                  className="w-full grid grid-cols-[minmax(0,_1fr)_fit-content(20px)] gap-3 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <Avatar name={val.user_info.fullname ?? ''} />
                      <div>
                        <div className="text-label-4 text-typography-label group-hover:underline group-hover:underline-offset-1">
                          {val.user_info.fullname}
                        </div>
                        <div className="text-subtitle-4 text-typography-subtitle">
                          {val.user_info.email}
                        </div>
                      </div>
                    </div>
                    <ViewStatusStudent status={val.status} />
                  </div>
                </button>
                <Button
                  disabled={val.status !== 'Pending'}
                  onClick={() => {
                    setIsShowModalConfirm(true), setCvDetail(val)
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5893 8.07741C17.9147 8.40285 17.9147 8.93049 17.5893 9.25592L10.9226 15.9226C10.5972 16.248 10.0695 16.248 9.74408 15.9226L6.41074 12.5893C6.08531 12.2638 6.08531 11.7362 6.41074 11.4107C6.73618 11.0853 7.26382 11.0853 7.58926 11.4107L10.3333 14.1548L16.4107 8.07741C16.7362 7.75197 17.2638 7.75197 17.5893 8.07741Z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 3.66667C7.39763 3.66667 3.66667 7.39763 3.66667 12C3.66667 16.6024 7.39763 20.3333 12 20.3333C16.6024 20.3333 20.3333 16.6024 20.3333 12C20.3333 7.39763 16.6024 3.66667 12 3.66667ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                    ></path>
                  </svg>
                </Button>
              </div>
            </>
          ))}
        </div>
      </ContainerFormBody>
      <ContainerFormFooter>
        <Button
          btnStyle={'no-background'}
          intent={'grey'}
          onClick={props.closeModal}
        >
          Đóng
        </Button>
      </ContainerFormFooter>
      {cvDetail && (
        <ConfirmApproveModal
          isOpen={isShowModalConfirm}
          closeModal={() => setIsShowModalConfirm(false)}
          post_id={props.postDetail.id}
          CV_applying={cvDetail}
        />
      )}
      {cvDetail && (
        <DetailCVView
          isOpen={isShowModalDetailView}
          closeModal={() => setIsShowModalDetailView(false)}
          CV_applying={cvDetail}
        />
      )}
    </>
  )
}

export default ApplyPost
