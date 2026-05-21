import { Icon, IconProps } from "@chakra-ui/react";

export const ChevronRightIcon = (props: IconProps) => {
    return (
        <Icon w="16px" h="16px" viewBox="0 0 16 16" color="#333333" fill="none" {...props}>
            <path
                d="M6.39998 11.2L9.59998 8.00001L6.39997 4.80001"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
