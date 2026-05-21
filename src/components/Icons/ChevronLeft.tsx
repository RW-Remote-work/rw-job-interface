import { Icon, IconProps } from "@chakra-ui/react";

export const ChevronLeftIcon = (props: IconProps) => {
    return (
        <Icon w="16px" h="16px" viewBox="0 0 16 16" color="#333333" fill="none" {...props}>
            <path
                d="M9.60002 11.2L6.40002 8.00001L9.60003 4.80001"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
