'use client'
import { Box, Text, Button, Flex, Link } from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import { WinkEmoji } from "./WinkEmoji";
import { useTranslation } from "next-i18next";


export const ReleaseJobGuideCard: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
  }, []);

  return (
    <Box
      bg="#EDE8DF"
      borderRadius="12px"
      p={{ base: 4, md: 6 }}
      w="full"
      boxShadow="md"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      gap={{ base: 4, md: 0 }}
      tabIndex={0}
      aria-label="在RW发布岗位卡片"
    >
      <Flex direction="column" gap={4} flex="1">
        <Text fontWeight="bold" fontSize="18px" color="#13172E">
          {t('publishJobOnRW')}
        </Text>
        <Text fontWeight="normal" fontSize="14px" color="#13172E">
          {t('hireGlobalRemoteWorkers')}
        </Text>
        <Button
          variant="outline"
          borderColor="#13172E"
          borderRadius="29px"
          h="32px"
          px="18px"
          fontSize="12px"
          color="#13172E"
          fontWeight="normal"
          alignSelf="flex-start"
          aria-label="快速上手"
          tabIndex={0}
          as={Link}
          href="/publish"
        >
          {t('publishJob')}
        </Button>
      </Flex>
      <WinkEmoji />
    </Box>
  );
};

export default ReleaseJobGuideCard;
