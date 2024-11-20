import { AttachmentDetail } from '@/models/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'
import { useUploadFileMutation } from './hook'

export function Uploader<T extends FieldValues>({
  label = 'upload.files',
  ...props
}: {
  className?: string
  name: Path<T>
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
  attachment: AttachmentDetail
  label?: string
  isDownload?: boolean
  disabled?: boolean
  required?: boolean
  module: string
  fileTypes?: string[]
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
  })
  const fileTypes = ['JPG', 'PNG', 'GIF']
  const [item, setItem] = useState<AttachmentDetail | null>(
    props.attachment ?? null
  )
  const [file, setFile] = useState<File | null>(null)

  const handleGotLink = (res: AttachmentDetail) => {
    setItem(res)
    onChange(res.object as any)
    setFile(null)
  }

  const handleUploadFailed = (msg: string) => {
    setFile(null)
  }

  const [uploadPercentage, setUploadPercentage] = useState<number>(0)

  const mutation = useUploadFileMutation(
    handleGotLink,
    handleUploadFailed,
    props.module
  )

  const handleChange = (file: File) => {
    setFile(file)
    mutation.mutate({
      file,
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        setUploadPercentage(percent)
      },
    })
  }

  const handleRemove = () => {
    onChange(null)
    setItem(null)
  }

  useEffect(() => {
    if (value && props.attachment && value === props.attachment.object) {
      setItem(props.attachment)
    }
  }, [value])

  return (
    <div className={props.className}>
      {label && (
        <div className="text-left">
          <div className="text-label-3 text-typography-label">
            {label}
            {props.required && <span className="text-error-base pl-1">*</span>}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1 py-2 items-center justify-start">
        {item ? (
          <FileItem
            itemContent={item}
            onRemoveClicked={!props.disabled ? handleRemove : undefined}
          />
        ) : (
          mutation.isLoading && <FileItemLoading percent={uploadPercentage} />
        )}
      </div>

      {!item && (
        <FileUploader
          {...props}
          handleChange={handleChange}
          children={<UploadView {...props} />}
          required={props.required ?? false}
          types={props.fileTypes}
        />
      )}
    </div>
  )
}

const FileItem = ({
  itemContent,
  onRemoveClicked,
}: {
  itemContent: AttachmentDetail
  onRemoveClicked?: () => void
}) => {
  return (
    <div className="relative flex justify-center items-center group text-primary-base bg-primary-background rounded-xl h-7">
      <Link
        href={itemContent.dowload_url}
        target="_blank"
        className="whitespace-nowrap text-left group-hover:opacity-50"
      >
        <div className="rounded-sm px-1 py-0.5 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 rounded p-1 my-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span className="text-button-5 truncate my-auto w-24">
            {itemContent.name}
          </span>
        </div>
      </Link>
      {onRemoveClicked && (
        <div className="top-0 right-0 z-10 hidden group-hover:block hover:bg-grey-5 absolute cursor-pointer rounded-r-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 text-primary-base"
            onClick={onRemoveClicked}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

const FileItemLoading = ({ percent }: { percent: number }) => (
  <div className="relative group">
    <div className="whitespace-nowrap text-left flex gap-2 px-2 py-1 justify-center items-center text-primary-base bg-primary-background rounded-xl group-hover:opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className=" w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
      <div className="flex justify-start items-center w-20 bg-grey-3 rounded-full h-2 py-2 border border-grey-4">
        <div
          style={{ width: `${percent}%` }}
          className="bg-primary-base h-auto rounded-full text-[6px] text-center text-white leading-relaxed animate-pulse"
        >
          {percent}%
        </div>
      </div>
    </div>
  </div>
)

export const UploadView = (props: {
  fileTypes?: string[]
  disabled?: boolean
}) => {
  return (
    <>
      <div
        className={`border-2 border-dashed  ${
          props.disabled
            ? 'bg-grey-2 !cursor-not-allowed'
            : 'hover:bg-grey-3 cursor-pointer'
        } border-grey-2 rounded-lg mb-2 p-6 flex items-center`}
      >
        <div className="flex flex-row items-center gap-2">
          <div
            className={`p-3 rounded-full aspect-square bg-primary-background ${
              props.disabled ? 'text-primary-border' : 'text-primary-base'
            }`}
          >
            <svg
              width="30"
              height="25"
              viewBox="0 0 30 25"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.5322 0.519347C17.3268 0.129229 15.0565 0.355114 12.9712 1.17214C10.8859 1.98917 9.06639 3.36566 7.71299 5.15013C6.5314 6.70808 5.74505 8.52426 5.41509 10.4432C3.99655 10.9153 2.74958 11.8143 1.85156 13.0273C0.777185 14.4786 0.278464 16.2763 0.451661 18.0737C0.624857 19.871 1.45769 21.5404 2.78942 22.7598C4.12115 23.9792 5.85736 24.6621 7.66296 24.6766H10.1073C10.7796 24.6766 11.3246 24.1316 11.3246 23.4593C11.3246 22.787 10.7796 22.242 10.1073 22.242H7.67789C6.47583 22.2312 5.32018 21.7761 4.4335 20.9642C3.54568 20.1513 2.99046 19.0383 2.875 17.8401C2.75953 16.6419 3.09201 15.4434 3.80827 14.4759C4.52452 13.5084 5.57377 12.8406 6.7535 12.6012C7.27631 12.4951 7.66915 12.061 7.72261 11.5302C7.90215 9.7475 8.57004 8.04889 9.65276 6.62132C10.7355 5.19374 12.1911 4.09255 13.8593 3.43892C15.5275 2.7853 17.3438 2.60459 19.1081 2.91669C20.8724 3.22878 22.5165 4.02158 23.8592 5.20783C25.202 6.39407 26.1915 7.92778 26.7188 9.64015C27.2461 11.3525 27.2908 13.1772 26.8479 14.9133C26.405 16.6494 25.4917 18.2297 24.2085 19.4802C22.9254 20.7307 21.3221 21.603 19.5751 22.001C18.9196 22.1503 18.5093 22.8028 18.6587 23.4583C18.808 24.1137 19.4605 24.5241 20.116 24.3747C22.2996 23.8772 24.3037 22.7869 25.9077 21.2237C27.5116 19.6606 28.6532 17.6852 29.2069 15.5151C29.7605 13.345 29.7047 11.0641 29.0456 8.92368C28.3864 6.78321 27.1496 4.86608 25.4711 3.38327C23.7926 1.90046 21.7376 0.909464 19.5322 0.519347Z" />
              <path d="M14.1155 11.6431C14.2323 11.5264 14.3668 11.4383 14.5103 11.3789C14.6522 11.3201 14.8077 11.2873 14.9707 11.2866L14.9763 11.2865L14.9819 11.2866C15.2916 11.288 15.6008 11.4068 15.837 11.6431L20.7062 16.5122C21.1815 16.9876 21.1815 17.7583 20.7062 18.2337C20.2308 18.7091 19.46 18.7091 18.9847 18.2337L16.1936 15.4426V23.4593C16.1936 24.1316 15.6486 24.6766 14.9763 24.6766C14.304 24.6766 13.759 24.1316 13.759 23.4593V15.4426L10.9679 18.2337C10.4925 18.7091 9.7218 18.7091 9.24643 18.2337C8.77105 17.7583 8.77105 16.9876 9.24643 16.5122L14.1155 11.6431Z" />
            </svg>
          </div>
          <div>
            <div
              className={`text-sm font-semibold ${
                props.disabled
                  ? 'text-typography-disabled'
                  : 'text-typography-title'
              } text-heading-7`}
            >
              Nhấp hoặc kéo tệp vào đây để tải lên
            </div>
            <div
              className={`text-subtitle-4 ${
                props.disabled
                  ? 'text-typography-disabled'
                  : 'text-typography-title'
              }`}
            >
              {props.fileTypes
                ? props.fileTypes.map((e) => e.toLowerCase()).join(', ')
                : 'doc, docx, xlsx, xls, csv, mp3, mp4, png, jpeg, jpg, pdf, ppt, pptx, zip, rar,...'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const FileItem = (props: {
//   className?: string
//   itemContent: AttachmentDetail
//   onRemoveClicked?: () => void
// }) => {
//   return (
//     <div
//       className={`relative flex justify-center items-center group text-primary-base bg-primary-background rounded-xl h-7  ${props.className}`}
//     >
//       <Link
//         href={props.itemContent.dowload_url}
//         target="_blank"
//         className="whitespace-nowrap text-left group-hover:opacity-50"
//       >
//         <div
//           className="rounded-sm px-1 py-0.5 flex flex-row "
//           onClick={() => {}}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6 rounded p-1 my-auto "
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
//             />
//           </svg>

//           <span className="text-button-5 truncate my-auto w-24">
//             {props.itemContent.name}
//           </span>
//         </div>
//       </Link>
//       {props.onRemoveClicked && (
//         <div className="top-0 right-0 z-10 hidden group-hover:block hover:bg-grey-5 absolute cursor-pointer rounded-r-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-7 h-7 text-primary-base "
//             onClick={props.onRemoveClicked}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </div>
//       )}
//     </div>
//   )
// }
// const FileItemLoading = (props: { percent: number }) => {
//   return (
//     <div className={`relative group`}>
//       <div className="whitespace-nowrap text-left flex gap-2 px-2 py-1 justify-center items-center text-primary-base bg-primary-background rounded-xl group-hover:opacity-50">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className=" w-5 h-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
//           />
//         </svg>
//         <div className="flex justify-start items-center w-20 bg-grey-3 rounded-full h-2 py-2 border border-grey-4">
//           <div
//             style={{
//               width: `${props.percent}%`,
//             }}
//             className="bg-primary-base h-auto rounded-full text-[6px] text-center text-white leading-relaxed animate-pulse"
//           >
//             {props.percent}%
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export const AttachmentsView = (props: {
//   className?: string
//   attachments: {
//     name: string
//     object: string
//     dowload_url: string
//   }[]
// }) => {
//   return (
//     <div className={props.className}>
//       <div className="flex items-center gap-1 text-label-3 min-w-fit mb-2">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="w-4 h-4"
//         >
//           <path
//             fillRule="evenodd"
//             d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Tệp đính kèm
//       </div>
//       {props.attachments.length === 0 ? (
//         <div className="italic min-w-fit mx-0.5 text-subtitle-3">
//           (Không có tệp đính kèm nào)
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-1">
//           {props.attachments.map((item, index) => (
//             <div className="col">
//               <FileItem key={index} itemContent={item} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
