// import { ErrorResponse } from '@/models/api/common'
// import { Button } from '../ui/button/button'
// import { Input } from '../ui/input/input'
// import { useCheckEmailForm } from './hooks'
// import { useEffect } from 'react'
// const CheckEmailForm = (props: { email?: string }) => {
//   const { checkForm, handleFormSubmit, mutation } = useCheckEmailForm(
//     props.email
//   )
//   useEffect(() => {
//     if (!checkForm.getValues('email') || checkForm.getValues('email') != '')
//       checkForm.setValue('email', props.email ?? '')
//   }, [props.email])
//   return (
//     <form
//       onSubmit={checkForm.handleSubmit(handleFormSubmit)}
//       className="flex flex-col gap-6"
//     >
//       <div className="text-heading-4 uppercase text-center">Đăng nhập</div>
//       <div className="flex flex-col gap-5">
//         <Input
//           label="Email"
//           name="email"
//           register={checkForm.register}
//           intent={
//             mutation.isError || checkForm.formState.errors.email
//               ? 'error'
//               : 'default'
//           }
//           placeholder={'Nhập email'}
//           onChange={(e) => {
//             checkForm.setValue('email', e.currentTarget.value)
//             checkForm.clearErrors()
//             mutation.reset()
//           }}
//           message={
//             mutation.isError
//               ? (mutation.error.response?.data as ErrorResponse)?.description ??
//                 mutation.error.response ??
//                 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
//               : checkForm.formState.errors.email?.message ?? ''
//           }
//           required
//           autoComplete="on"
//           autoFocus
//         />
//       </div>

//       <Button
//         size={'medium'}
//         type="submit"
//         fullWidth
//         posting={mutation.isLoading}
//       >
//         Tiếp theo
//       </Button>
//     </form>
//   )
// }

// export default CheckEmailForm
