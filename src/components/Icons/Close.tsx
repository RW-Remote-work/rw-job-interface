import { Icon, IconProps } from "@chakra-ui/react"

export const CloseIcon = (props: IconProps) => {
    return (
        <Icon viewBox='0 0 8 8' w="12px" h="12px" color='#000' {...props}>
            <path
                fill='currentColor'
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                d='M7 1L1 7M7 7L1 1'
            />
        </Icon>
    )
}