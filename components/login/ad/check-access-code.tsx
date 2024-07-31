// // import { ErrorResponse, LoginError } from '@/models/api'
// import Link from 'next/link'
// import { useEffect } from 'react'
// import { useLoginWithAccessCode } from '../hooks'
// import { Spinner } from '@/components/ui/spinner/spinner'
// const CheckAccessCode = (props: { accessCode: string }) => {
//   const { mutation } = useLoginWithAccessCode()
//   useEffect(() => {
//     if (props.accessCode) {
//       mutation.mutate(props.accessCode as string)
//     }
//   }, [props.accessCode])
//   return (
//     <div>
//       <div className="p-10">
//         {mutation.isLoading && (
//           <div className="flex flex-col items-center justify-center gap-10">
//             <Spinner size="large"></Spinner>
//             <div className="text-heading-5">Đang xác nhận tài khoản</div>
//           </div>
//         )}
//         {mutation.isError && (
//           <div className="flex flex-col items-center justify-center gap-5">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-28 h-28 text-grey-5 fill-error-base "
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <div className="text-heading-5">Xác nhận tài khoản thành công</div>
//           </div>
//         )}
//         {mutation.isSuccess && <div></div>}
//       </div>
//       <div className="flex gap-2 mt-5 items-center text-subtitle-2 select-text justify-center text-center text-primary-base hover:text-primary-hover focus:text-primary-pressed active:text-primary-pressed">
//         <Link href={'/login'} className="cursor-pointer">
//           Quay lại đăng nhập
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default CheckAccessCode
