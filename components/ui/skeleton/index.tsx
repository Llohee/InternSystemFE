import { Modal } from '../modal/modal'

export const TableSkeleton = (props: { numberRow?: number }) => {
  return (
    <>
      <div className="flex flex-col gap-5 border-border-2 p-1 rounded-lg">
        {[...Array(props.numberRow ?? 9)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-grey-2 h-8 rounded-lg"
          ></div>
        ))}
      </div>
    </>
  )
}
export const ContentBoxSkeleton = () => {
  return (
    <>
      <div className="h-full bg-white rounded-lg p-5">
        <div className="flex flex-row border-grey-5 mb-6">
          <div className="animate-pulse bg-grey-2 rounded-lg h-12 w-56 my-3"></div>
        </div>

        <div className="flex flex-col gap-5">
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <div className="animate-pulse bg-grey-2 rounded-lg h-10"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export const PageSkeleton = () => {
  return (
    <>
      <div className="animate-pulse bg-grey-2 rounded-lg mt-6 h-[81vh]"></div>
    </>
  )
}
export const FormSkeleton = ({ length = 4 }: { length?: number }) => {
  return (
    <>
      <div className="relative p-5 flex flex-col gap-6">
        {[...Array(length)].map((_, index) => (
          <div key={index + 1} className="flex flex-col gap-2">
            <div className="animate-pulse bg-grey-2 rounnded-lg h-5 w-1/3"></div>
            <div className="animate-pulse bg-grey-2 rounnded-lg h-10 w-full"></div>
          </div>
        ))}
      </div>
    </>
  )
}
export const ModalLoading = (props: {
  isOpen: boolean
  closeModal: () => void
  length?: number
  size?: 'large' | 'default' | 'xl'
}) => {
  const defaultSize = props.size ?? 'default'
  return (
    <>
      <Modal
        title={
          <div className="w-full flex gap-3 items-center">
            <div className="grow">
              <div className="animate-pulse bg-grey-2 rounded-lg h-7 w-36"></div>
            </div>
          </div>
        }
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        size={defaultSize}
      >
        <FormSkeleton length={props.length} />
      </Modal>
    </>
  )
}
export const SingleNotiSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="animate-pulse bg-grey-2 h-9 rounded-full aspect-square" />
      <div className="grow flex flex-col gap-2">
        <div className="animate-pulse bg-grey-2 rounded-lg h-4" />
        <div className="animate-pulse bg-grey-2 rounded-lg h-4" />
        <div className="animate-pulse bg-grey-2 rounded-lg h-4 w-[50%]" />
      </div>
    </div>
  )
}

export const SinglePostSkeleton = () => {
  return (
    <div className="mx-4 lg:mx-16 my-8">
      <div className="flex gap-2 items-center">
        {[...Array(4)].map((_, index) => (
          <div className="grow flex flex-col gap-2">
            <div className="animate-pulse bg-grey-2 rounded-lg h-5 w-[25%]" />
            <div className="animate-pulse bg-grey-2 rounded-md h-8 w-[100%]" />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[...Array(12)].map((_, index) => (
          <div className="flex gap-2 items-center">
            <div className="animate-pulse bg-grey-2 h-20 w-[5px] rounded-l-md"></div>
            <div className="animate-pulse bg-grey-2 h-16 aspect-square rounded-md" />
            <div className="grow flex flex-col gap-2">
              <div className="animate-pulse bg-grey-2 rounded-lg h-5" />
              <div className="animate-pulse bg-grey-2 rounded-lg h-5" />
              <div className="flex gap-2">
                <div className="animate-pulse bg-grey-2 rounded-lg h-5 w-[25%]" />
                <div className="animate-pulse bg-grey-2 rounded-lg h-5 w-[25%]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
