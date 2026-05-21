'use client'

import { Box } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import type { DefaultValues, UseFormReturn } from 'react-hook-form'
import { FormProvider, useForm, } from 'react-hook-form'
import { useMount } from 'react-use'
import { FormContext } from './context'

interface FormProps<Values extends Record<string, any>> {
  form: UseFormReturn<Values>
  className?: string
  onSubmit?: (data: Values) => void
  editable?: boolean
  defaultValues?: DefaultValues<Values>
}

export function Form<Values extends Record<string, any>>({ children, className, onSubmit, form, defaultValues }: PropsWithChildren<FormProps<Values>>) {
  const methods = form

  useMount(() => {
    if (!defaultValues)
      return
    Object.entries(defaultValues).forEach(([key, value]) => {
      methods.setValue(key as any, value)
    })
  })

  const { handleSubmit } = methods

  handleSubmit((value: Values) => {
    console.log('innerSubmit', value)
    onSubmit?.(value)
  })

  return (
    <FormContext.Provider value={{}}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </FormContext.Provider>
  )
}
