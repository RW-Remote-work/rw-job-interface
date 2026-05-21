import { useTextRect } from "@/hooks/useTextRect"
import { Input, InputProps } from "@chakra-ui/react"

export const AutoWidthInput = (props: InputProps) => {
    const { width } = useTextRect(props.value?.toString() || '', {
        border: '1px solid transparent',
        px: '16px',
        height: '40px'
    })

    return <Input width={width} {...props} />
}