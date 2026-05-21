import { Box, FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { Fragment, PropsWithChildren, ReactNode } from 'react'
import { useContext } from 'react'
import { ControllerProps, FieldValues, RegisterOptions, useFieldArray, UseFieldArrayReturn, UseFormRegister, UseFormRegisterReturn, UseFormReturn } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import { FormContext } from './context'

export interface FormItemArrayProps extends FormControlProps {
  className?: string
  name: string
  label?: string
  render?: (props: Parameters<ControllerProps['render']>[0]) => JSX.Element
  registerOptions?: RegisterOptions
  helperText?: string | ReactNode
  hideDetails?: boolean
  noStyle?: boolean
}

export function FormItemArray({
  name, label, render, className, helperText, registerOptions, hideDetails = false, noStyle = false, defaultValue,
  ...otherProps
}: PropsWithChildren<FormItemArrayProps>) {
  const formContext = useFormContext()

  const { control, } = formContext

  const fieldArrayReturnValue = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name, // unique name for your Field Array
  });

  return (
    <Controller control={control} name={name} defaultValue={defaultValue} render={(props) => {
      const errorMsg = props.fieldState.error?.message
      const isError = Boolean(errorMsg)

      if (noStyle) {
        return <>{render?.({ ...props })}</>
      }

      return <FormControl
        isInvalid={isError}
        className={className}
        isRequired={Boolean(registerOptions?.required)}
        {...otherProps}
      >
        {
          label ? (
            <FormLabel>{label}</FormLabel>
          ) : null
        }
        {render?.({ ...props, })}
        {
          hideDetails ? null : (
            <Box minH="24px" mt="4px">
              {
                isError ? (
                  <FormErrorMessage mt="0">{errorMsg}</FormErrorMessage>
                ) : (
                  <FormHelperText mt="0" color="#929292" fontSize="14px">
                    {helperText}
                  </FormHelperText>
                )
              }
            </Box>
          )
        }
      </FormControl>
    }} />

  )
}
