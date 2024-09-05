import Image from 'next/image'
import waitingDev from '@/public/images/wating-dev.png'

const ProfileWrapper = () => {
  return (
    <div className="grow w-full rounded-t-md ">
      <div className="flex justify-center">
        <div>
          <Image src={waitingDev} alt="" className={'max-w-sm'}></Image>
          <div className="text-center">Trang hiện đang phát triển...</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileWrapper
