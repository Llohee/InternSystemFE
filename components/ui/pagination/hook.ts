import { SubmitHandler, useForm } from 'react-hook-form'

export interface GotoPageInputs {
  pageNumber: number
}

export const useGotoPage = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<GotoPageInputs>()

  const handleFormSubmit: SubmitHandler<GotoPageInputs> = async (data) => {
    alert(JSON.stringify(data))
  }

  register('pageNumber', {
    min: 1,
  })
  return {
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
  }
}
