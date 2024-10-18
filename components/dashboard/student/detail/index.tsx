import { useGetPostbyId } from '@/hooks/query/post'
import { PostDetail } from '@/models/api'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import PostDetailView from './post-detail-view'

const PostDetailWrapper = (props: { id: string }) => {
  const router = useRouter()
  const getPostbyId = useGetPostbyId(props.id)
  if (getPostbyId.status === 'loading') return <></>
  if (getPostbyId.status === 'error') {
    const errorCode = (getPostbyId.error as AxiosError).response?.status
    switch (errorCode) {
      case 401:
        router.replace('/401', router.asPath)
        break
      case 404:
        router.replace('/404', router.asPath)
        break
      default:
        router.replace('/error', router.asPath)
        return <></>
    }
    return <></>
  }
  return (
    <div>
      <PostDetailView postDetail={getPostbyId.data} />
    </div>
  )
}


export default PostDetailWrapper
