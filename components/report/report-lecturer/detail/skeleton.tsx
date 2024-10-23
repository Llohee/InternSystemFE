export const ReportDetailSkeleton = () => {
  return (
    <>
      <div className="w-full h-full bg-white border-grey-3 p-5 overflow-hidden">
        <div className="  grid md:grid-cols-12 ">
          <div className="col-span-8 px-2 flex flex-col gap-2">
            <div>
              <div className="flex gap-2 items-center">
                <div className=" animate-pulse bg-grey-5 h-4 w-20" />
                <div className=" animate-pulse bg-grey-5 h-6 w-20 rounded-full" />
              </div>
              <div className="flex items-center gap-2 py-3">
                <div className="grow flex flex-col gap-1">
                  <div className="animate-pulse bg-grey-5 h-5" />
                  <div className="animate-pulse bg-grey-5 h-5 w-[50%]" />
                </div>
                <div className=" animate-pulse bg-grey-5 h-8 w-24" />
              </div>
              <div className="grid grid-cols-2 gap-2 w-full h-fit p-5">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="col-span-1 animate-pulse bg-grey-5 h-4"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className=" animate-pulse bg-grey-5 h-6 w-20 my-3"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className=" animate-pulse bg-grey-5 h-8 w-28" />
                <div className=" animate-pulse bg-grey-5 h-28 my-3" />
                <div className="grow grid grid-cols-2 gap-5">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="col-span-1">
                      <div className="animate-pulse bg-grey-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-5">
            <div className=" animate-pulse bg-grey-5 h-6 w-20 rounded-lg" />
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className=" animate-pulse bg-grey-5 h-4 w-28" />
                <div className=" animate-pulse bg-grey-5 h-6 w-20 rounded-lg" />
              </div>
            ))}
            <div className="flex flex-col gap-3">
              <div className=" animate-pulse bg-grey-5 h-4 w-28" />
              <div className="flex gap-3">
                <div className=" animate-pulse bg-grey-5 h-10 w-10 rounded-full aspect-square" />
                <div className=" animate-pulse bg-grey-5 h-10 w-full rounded-lg" />
              </div>
            </div>
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className=" animate-pulse bg-grey-5 h-4 w-28" />
                <div className=" animate-pulse bg-grey-5 h-6 w-20 rounded-lg" />
              </div>
            ))}
            <div className="flex flex-col gap-3">
              <div className=" animate-pulse bg-grey-5 h-4 w-28" />
              <div className="flex gap-3">
                <div className=" animate-pulse bg-grey-5 h-10 w-10 rounded-full aspect-square" />
                <div className=" animate-pulse bg-grey-5 h-10 w-full rounded-lg" />
              </div>
              <div className=" animate-pulse bg-grey-5 h-4 w-full" />
              <div className=" animate-pulse bg-grey-5 h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export const ReportListViewSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        {/* <div className="animate-pulse bg-grey-5 h-5 w-[50%]"/>
        <div className="animate-pulse bg-grey-5 h-8 rounded-md"/> */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex gap-1">
            <div className="animate-pulse bg-grey-5 h-8 rounded-full aspect-square" />
            <div className="grow flex flex-col gap-1">
              <div className="animate-pulse bg-grey-5 h-4" />
              <div className="animate-pulse bg-grey-5 h-4 w-[50%]" />
              <div className="animate-pulse bg-grey-5 h-4 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
