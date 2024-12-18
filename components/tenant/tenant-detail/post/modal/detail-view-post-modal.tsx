import { ListTab } from '@/components/ui/list-tab/list-tab'
import { Modal } from '@/components/ui/modal/modal'
import { ModalLoading } from '@/components/ui/skeleton'
import { useGetPostbyId } from '@/hooks/query/post'
import { PostDetail } from '@/models/api'
import DetailView from './detail-view'
import TenantApplyPost from '../tenant-approve/apply-post'
import PostHistory from '../history/post-history'
interface PostProps {
  isOpen: boolean
  closeModal: () => void
  postDetail: PostDetail
}
const DetailViewPostModal = (props: PostProps) => {
  const GetPostbyId = useGetPostbyId(props.postDetail.id)

  return (
    <>
      {GetPostbyId.status === 'error' && <></>}
      {GetPostbyId.status === 'loading' && (
        <ModalLoading
          length={5}
          size="default"
          isOpen={props.isOpen}
          closeModal={props.closeModal}
        />
      )}
      {GetPostbyId.status === 'success' && (
        <DetailViewPost
          isOpen={props.isOpen}
          closeModal={props.closeModal}
          postDetail={GetPostbyId.data}
        />
      )}
    </>
  )
}

const DetailViewPost = (props: PostProps) => {
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow text-heading-7 text-typography-title">
              Chi tiết bài đăng
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size="xl"
      >
        <div className="relative">
          <ListTab
            // selectedIndex={selectedTab}
            // onChange={onChangeSelectedTab}
            titles={[
              {
                title: 'Bài đăng',
                node: (
                  <DetailView
                    postDetail={props.postDetail}
                    closeModal={props.closeModal}
                  />
                ),
              },
              {
                title: 'Ứng tuyển',
                node: (
                  <TenantApplyPost
                    postDetail={props.postDetail}
                    closeModal={props.closeModal}
                  />
                ),
              },
              {
                title: 'Lịch sử',
                node: (
                  <PostHistory
                    postDetail={props.postDetail}
                    closeModal={props.closeModal}
                  />
                ),
              },
            ]}
            tabPadding={'px-6'}
          />
        </div>
      </Modal>
    </>
  )
}

export default DetailViewPostModal
