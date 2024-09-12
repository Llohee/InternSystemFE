import { useState } from 'react'
import ReportLecturerListView from './list-view'

const ReportLecturerDetailWrapper = (props: { id: string }) => {
  const [showList, setShowList] = useState(true)

  return (
    <>
      <div
        className={`lg:flex w-full ${
          !showList && 'h-[calc(100vh_-_5rem)] '
        } md:h-[calc(100vh_-_3rem)] overflow-auto`}
      >
        <div
          className={`${
            showList ? 'w-[100%] lg:w-[24rem] xl:w-[22rem]' : 'w-[80%] md:w-fit'
          } overflow-hidden bg-grey-3 flex-nowrap max-w-[28rem]`}
        >
          <ReportLecturerListView
            idLecturer={props.id}
            showList={showList}
            setShowList={setShowList}
            {...props}
          />
        </div>
        {/* <div
          className={`${
            showList ? '' : ''
          } grow w-full lg:relative md:!h-[calc(100vh_-_3rem)] overflow-auto`}
        >
          <TicketViewWrapper {...props} isOpenSideListTicket={showList} />
        </div> */}
      </div>
    </>
  )
}
export default ReportLecturerDetailWrapper
