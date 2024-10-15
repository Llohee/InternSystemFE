import FormCV from './form-cv'
import { useCVCreate } from './hook'

const CreateCV = () => {
  const { handleFormSubmit, formCreate, mutation } = useCVCreate()
  return (
    <div className="container mx-auto">
      <FormCV
        useForm={formCreate}
        handleFormSubmit={handleFormSubmit}
        mutation={mutation}
      />
    </div>
  )
}

export default CreateCV
