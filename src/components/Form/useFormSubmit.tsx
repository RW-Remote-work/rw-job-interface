import { FieldValues, useFormContext } from "react-hook-form"

export const useFormSubmit = <T extends FieldValues>(onSubmit?: (values: T) => void) => {

  const { handleSubmit } = useFormContext()



  return handleSubmit((values: any) => {
    onSubmit?.(values)
  })

}