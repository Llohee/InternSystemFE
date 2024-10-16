import { Button } from '@/components/ui/button/button'
import { Editor } from '@/components/ui/editor/editor'
import { Input } from '@/components/ui/input/input'
import { UpdateCVRequest } from '@/models/api/profile-cv-api'
import { UseFormReturn } from 'react-hook-form'

const FormLayoutOptions = (props: {
  useForm: UseFormReturn<UpdateCVRequest>
  selectedOptions: any[]
  setSelectedOptions: (options: { name: string; label: string }[]) => void
  default?: { field: string; values: string }
}) => {
  const changValueMatchingRule = (val: { field: string; values: any }) => {
    let newArr = props.useForm.watch('layout_optional') ?? []
    if (!Array.isArray(newArr)) {
      newArr = []
    }
    const existingFieldIndex = newArr.findIndex(
      (item) => item.field === val.field
    )
    if (existingFieldIndex !== -1) {
      newArr[existingFieldIndex].values = val.values
    } else {
      newArr.push({
        field: val.field,
        values: val.values,
      })
    }
    props.useForm.setValue('layout_optional', newArr)
  }
  const deleteValueMatchingRule = (field: string) => {
    const currentLayout = props.useForm.watch('layout_optional') ?? []
    const updatedLayout = currentLayout.filter((item) => item.field !== field)
    props.useForm.setValue('layout_optional', updatedLayout)
    const updatedSelectedOptions = props.selectedOptions.filter(
      (option) => option.name !== field
    )
    props.setSelectedOptions(updatedSelectedOptions)
  }
  return (
    <div className="flex flex-col gap-6 relative">
      {props.selectedOptions.map((option) => {
        const currentLayout = props.useForm.watch('layout_optional') ?? []
        const existingField = currentLayout.find(
          (item) => item.field === option.name
        )
        const currentValue = existingField ? existingField.values : ''
        return (
          <div
            key={option.name}
            className="bg-grey-3 px-6 py-4 rounded-lg border border-grey-3 hover:border-border-1 flex flex-col gap-2 text-body-3 group"
          >
            <div className="border-border-1 border-b py-2 text-label-1">
              {option.label}
            </div>
            <Editor
              register={props.useForm.register}
              label={''}
              name={`layout_optional.${option.name}`}
              onChange={(newContent) =>
                changValueMatchingRule({
                  field: option.name,
                  values: newContent,
                })
              }
              value={currentValue}
              intent="default"
              placeholder={`Nhập ${option.label}`}
            />
            <div className="hidden group-hover:flex absolute right-8">
              <Button
                intent={'grey'}
                btnStyle="no-background"
                iconOnly
                onClick={() => deleteValueMatchingRule(option.name)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 17 17"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.77306 13.8598C3.80439 14.2796 3.99295 14.6722 4.30109 14.9592C4.60922 15.2461 5.01425 15.4062 5.43528 15.4076H11.1442C11.5652 15.4062 11.9702 15.2461 12.2784 14.9592C12.5865 14.6722 12.7751 14.2796 12.8064 13.8598L13.3308 6.51866H3.24862L3.77306 13.8598Z" />
                  <path d="M14.4008 4.29644H11.0675V2.62977C11.0675 2.48243 11.009 2.34112 10.9048 2.23694C10.8006 2.13275 10.6593 2.07422 10.5119 2.07422H6.06749C5.92015 2.07422 5.77884 2.13275 5.67465 2.23694C5.57047 2.34112 5.51194 2.48243 5.51194 2.62977V4.29644H2.1786C2.03126 4.29644 1.88995 4.35497 1.78577 4.45916C1.68158 4.56335 1.62305 4.70465 1.62305 4.852C1.62305 4.99934 1.68158 5.14065 1.78577 5.24483C1.88995 5.34902 2.03126 5.40755 2.1786 5.40755H14.4008C14.5482 5.40755 14.6895 5.34902 14.7937 5.24483C14.8978 5.14065 14.9564 4.99934 14.9564 4.852C14.9564 4.70465 14.8978 4.56335 14.7937 4.45916C14.6895 4.35497 14.5482 4.29644 14.4008 4.29644ZM6.62305 3.18533H9.95638V4.29644H6.62305V3.18533Z" />
                </svg>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FormLayoutOptions
