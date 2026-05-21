import { Icon, IconProps } from "@chakra-ui/react"

export const PlusIcon = (props: IconProps) => {
    return (
        <Icon viewBox='0 0 28 28' w="28px" h="28px" fill="none" color='#D2D2D2' {...props}>
            <rect x="0.563965" y="12.3848" width="26.9893" height="3.49805" fill="currentColor" />
            <rect x="12.3101" y="27.627" width="26.9893" height="3.49805" transform="rotate(-90 12.3101 27.627)" fill="currentColor" />
        </Icon>
    )
}