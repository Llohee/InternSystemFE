const ReportStudentWrapper = () => {
  return (
    <>
      <div className="w-full relative">
        <div className="w-full px-5">
          <div
            className={`flex flex-col
          lg:grid lg:grid-cols-12
          gap-5 divide-x-2 divide-solid divide-grey-1`}
          >
            <div className="col lg:row-span-full flex flex-col gap-5 relative order-1 col-span-full lg:order-2 lg:col-start-9 lg:col-span-4">
              <div className="sticky top-5">
                <div className="p-6 bg-grey-1 rounded-lg">Thông tin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportStudentWrapper
