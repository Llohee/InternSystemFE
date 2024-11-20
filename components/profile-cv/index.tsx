import { useGetStudentById } from '@/hooks/query/account/student'
import { useGetUserDetail } from '@/hooks/query/auth'
import { useGetAllCV } from '@/hooks/query/profile-cv'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CVListViewSkeleton } from '../report/report-lecturer/detail/skeleton'
import ListCV from './list-cv'
import ProfileUser from './profile'

const ProfielAndCVWrapper = () => {
  const userDetail = useGetUserDetail()
  const studentDetail = useGetStudentById(userDetail.data.id)
  const getAllCV = useGetAllCV()
  const router = useRouter()
  const [totalPost, setTotalPost] = useState(0)
  useEffect(() => {
    if (getAllCV.status === 'success') setTotalPost(getAllCV.data.total ?? 0)
  }, [getAllCV])
  // const filterPost = useFilterForCVStore()
  // const [filterValue, setFilterValue] = useState<CVFilterRequest>()
  // const [filterQuery, setFilterQuery] = useState()

  // useEffect(() => {
  //   filterPost.update(
  //     produce(filterPost.filter, (draftState: any) => {
  //       draftState.query = []
  //       draftState.params = []
  //       draftState.sort = []
  //       draftState.local = ''
  //     })
  //   )
  // }, [])
  if (studentDetail.status === 'loading' || getAllCV.status === 'loading')
    return <CVListViewSkeleton />
  if (studentDetail.status === 'error' || getAllCV.status === 'error') {
    const errorCode = (studentDetail.error as AxiosError).response?.status
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
    <>
      <div className="">
        <div className="w-full relative">
          <div className="w-full px-5">
            <div
              className={`flex flex-col lg:grid lg:grid-cols-12  gap-5 divide-x-2 divide-solid divide-grey-1`}
            >
              <div
                className={`col lg:col-span-8 flex flex-col items-start lg:order-1`}
              >
                <div className={`w-full top-0 bg-white z-20`}>
                  {getAllCV.status === 'success' && (
                    <ListCV getAllCV={getAllCV.data} />
                  )}
                </div>
              </div>
              <div className="col lg:row-span-full flex flex-col gap-5 relative col-span-full order-first lg:col-start-9 lg:col-span-4 py-4">
                {studentDetail.status === 'success' && (
                  <ProfileUser detailStudent={studentDetail.data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfielAndCVWrapper
