import React from 'react';
import { Stack, Text, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { buttonHover } from "@/theme/style"; // 假设 buttonHover 从这里导入
import { useUserSelector } from "@/hooks/useUser";

// 定义 Props 类型
interface HeroSectionProps {
    titleFontSize?: any;
    subtitleFontSize?: any;
    descFontSize?: any;
    buttonFontSize?: any;
    buttonDirection?: any;
    buttonSpacing?: any;
    sectionSpacing?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    titleFontSize,
    subtitleFontSize,
    descFontSize,
    buttonFontSize,
    buttonDirection,
    buttonSpacing,
    sectionSpacing,
}) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { isLogin } = useUserSelector();

    return (
        <>
            {/* 标题区块 */}
            <Stack spacing={2} textAlign="center" mb={4}>
                <Text
                    fontSize={titleFontSize}
                    fontWeight="700"
                    letterSpacing="12%"
                    color="#13172E"
                    fontFamily="Alibaba PuHuiTi 2.0, sans-serif"
                >
                    {t("homePage.heroSection.title")}
                </Text>
                <Text
                    fontSize={subtitleFontSize}
                    fontWeight="700"
                    letterSpacing="12%"
                    color="#13172E"
                    fontFamily="Alibaba PuHuiTi 2.0, sans-serif"
                >
                    {t("homePage.heroSection.subtitle")}
                </Text>
            </Stack>

            {/* 描述文本 */}
            <Box maxWidth="820px" textAlign="center" mb={8}>
                <Text
                    fontSize={descFontSize}
                    fontWeight="400"
                    color="#54555D"
                    lineHeight="1.5em"
                    fontFamily="Alibaba PuHuiTi 2.0, sans-serif"
                >
                    {t("homePage.heroSection.description")}
                </Text>
            </Box>

            {/* 按钮区域 */}
            <Stack
                direction={buttonDirection}
                spacing={buttonSpacing}
                width="100%"
                justify="center"
                align="center"
                mt={4}
                mb={sectionSpacing}
            >
                {!isLogin && (
                    <Button
                        height="56px"
                        paddingX="28px"
                        borderRadius="80px"
                        bg="#13172E"
                        color="white"
                        fontWeight="500"
                        fontSize={buttonFontSize}
                        fontFamily="Source Han Sans CN, sans-serif"
                        _hover={{
                            ...buttonHover,
                        }}
                        onClick={() => router.push("/register")}
                    >
                        {t("homePage.heroSection.registerButton")}
                    </Button>
                )}

                <Button
                    height="56px"
                    paddingX="28px"
                    borderRadius="80px"
                    bg="transparent"
                    color="#13172E"
                    border="1.5px solid"
                    borderColor="#13172E"
                    fontWeight="500"
                    fontSize={buttonFontSize}
                    fontFamily="Source Han Sans CN, sans-serif"
                    _hover={{
                        ...buttonHover,
                    }}
                    onClick={() => {
                        const membershipSection = document.getElementById('membership-section');
                        if (membershipSection) {
                            membershipSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }}
                >
                    {t("homePage.heroSection.membershipButton")}
                </Button>
            </Stack>
        </>
    );
};

export default HeroSection;
