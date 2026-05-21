import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { setCookie } from "@/utils/cookies";
import { getLink } from "@/utils/navigation";
import globe from "@/assets/svgs/globe.svg";
import frame from "@/assets/images/frame.png";

const SimpleHeader = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const handleLanguageSwitch = () => {
    const lang = i18n.language === "zh" ? "en" : "zh";
    setCookie("lang", lang);
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <Box
      zIndex={99}
      position="fixed"
      top={0}
      width="100%"
      height="60px"
      borderBottom="1px solid #f2f2f2"
      background="white"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        height="100%"
        maxWidth="1200px"
        margin="0 auto"
        px={{ base: "16px", md: "70px" }}
      >
        <Flex alignItems="center">
          <Link href={getLink("MAIN", "/")} _hover={{ opacity: 0.8 }}>
            <Image src={frame} alt="RW Nomad" width="62px" height="34px" />
          </Link>
          <Link
            href={getLink("MAIN", "/")}
            ml="24px"
            fontSize="14px"
            color="#54555D"
            _hover={{ color: "#13172E", textDecoration: "none" }}
          >
            {t("home")}
          </Link>
        </Flex>

        <HStack spacing="16px">
          <IconButton
            aria-label="language"
            icon={<Image src={globe} alt="Language Switch" width="24px" height="24px" />}
            variant="ghost"
            onClick={handleLanguageSwitch}
          />
          <Text
            fontSize="14px"
            cursor="pointer"
            onClick={handleLanguageSwitch}
            color="#54555D"
            _hover={{ color: "#13172E" }}
          >
            {i18n.language === "zh" ? "EN" : "中文"}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default SimpleHeader;
