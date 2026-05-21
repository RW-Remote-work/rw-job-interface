'use client'
import { Box, StyleConfig, StyleProps } from "@chakra-ui/react";
import loginBg from "@/assets/svgs/login-bg.svg";
import IdealTypeImage, { IdealTypeImageProps } from "./IdealTypeImage";
import { PropsWithChildren } from "react";

interface LoginFlexContainerProps {
    idealType: IdealTypeImageProps["type"];
    containerStyle?: StyleProps
}

export const LoginFlexContainer = ({ idealType, children, containerStyle }: PropsWithChildren<LoginFlexContainerProps>) => {
    return (
        <Box
            w="100vw"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#FAF8F5"
            bgImage={loginBg}
            bgRepeat="no-repeat"
            bgPosition="center center"
            bgSize="cover"
        >
            <Box
                w={{ sm: "100%", md: "1200px" }}
                mx={{ sm: '24px' }}
                h="640px"
                borderRadius="40px"
                overflow="hidden"
                display="flex"
                bg="#FFFFFF"
                boxShadow="12px 21px 126px 5px #BBC4FB00"
                {...containerStyle}
            >
                <IdealTypeImage
                    type={idealType}
                    display={{ sm: 'none', md: 'block' }}
                    flex={1}
                    height={{ sm: '0', md: '640px', lg: '640px' }}
                    // height="100%"
                    // minH="320px"
                    w={{ sm: '0px', md: '0px', lg: '697px' }}
                    overflow="hidden"
                />
                <Box
                    // mx="auto"
                    w={{ sm: '100%', md: '503px' }}
                    h="100%"
                    transition="all 0.3s"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    // pt={{ sm: '32px', md: '76px' }}
                    // pb={{ sm: '32px', md: '113px' }}
                    pl={{ sm: "32px", md: "72px" }}
                    pr={{ sm: "32px", md: "75px" }}
                >
                    <Box
                        as="form"
                        w="100%"
                        display="flex"
                        flexDirection="column"
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}