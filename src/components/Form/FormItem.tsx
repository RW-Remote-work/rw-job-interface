'use client'

import { Box, FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import type { ControllerProps } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

export interface FormItemProps extends FormControlProps {
  className?: string
  name: string
  label?: string
  render?: (props: Parameters<ControllerProps['render']>[0]) => JSX.Element
  rules?: ControllerProps['rules']
  helperText?: string | ReactNode
  hideDetails?: boolean
  noStyle?: boolean
}

export function FormItem({
  name, label, render, className, helperText, rules, hideDetails = false, noStyle = false, defaultValue,
  ...otherProps
}: PropsWithChildren<FormItemProps>) {
  const { control, } = useFormContext()




  return (
    <Controller disabled rules={rules} control={control} name={name} defaultValue={defaultValue} render={(props) => {
      const isInvalid = props.fieldState.invalid


      if (noStyle) {
        return <>{render?.({ ...props })}</>
      }

      return <FormControl
        isInvalid={isInvalid}
        className={className}
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
                isInvalid ? (
                  <FormErrorMessage mt="0">{props.fieldState.error?.message}</FormErrorMessage>
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
