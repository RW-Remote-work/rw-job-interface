import { Flex, Text, Box, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

const WorkPageHeaderBanner: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language?.startsWith('en');
  const titleFontSize = isEn ? '48px' : '56px';
  const titleLetterSpacing = isEn ? 'normal' : '12%';

  const { data: jobMetrics, isLoading } = useQuery({
    queryKey: ['jobMetrics'],
    queryFn: () => api.web.getJobMetrics(),
    refetchOnWindowFocus: false,
  });

  const cumulativeJobCount = jobMetrics?.cumulativeJobCount || 0;
  const yesterdayJobCount = jobMetrics?.yesterdayJobCount || 0;

  return (
    <Box
      display={{ base: "none", xl: "block" }}
      position="relative"
      width="100%"
      maxW="1048px"
      height="287px"
      margin="0 auto"
      mt="24px"
      mb="32px"
      overflow="hidden"
    >
      {/* 左侧装饰元素组 (x: 31-895) */}
      {/* pics.svg - Tourism */}
      <Box
        position="absolute"
        left="31px"
        top="0"
        width="100.49px"
        height="100.49px"
      >
        <Image
          src="/svg/pics.svg"
          alt="Tourism"
          width={100.49}
          height={100.49}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* teamwork-left.svg - E-commerce */}
      <Box
        position="absolute"
        left="53px"
        top="88px"
        width="131.81px"
        height="66.2px"
      >
        <Image
          src="/svg/teamwork-left.svg"
          alt="E-commerce"
          width={131.81}
          height={66.2}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* teamwork-right.svg - Education */}
      <Box
        position="absolute"
        left="895px"
        top="131.16px"
        width="139.99px"
        height="84.54px"
      >
        <Image
          src="/svg/teamwork-right.svg"
          alt="Education"
          width={139.99}
          height={84.54}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* 中间主要内容区域 (x: 99, y: 63, w: 850) */}
      <Flex
        position="absolute"
        left="99px"
        top="63px"
        direction="column"
        align="center"
        gap="12px"
        width="850px"
      >
        {/* 第一行：岗位统计 */}
        <Flex align="center" gap="4px">
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="14px"
            lineHeight="1.57em"
            color="#54555D"
          >
            {t('cumJobsPosted')}
          </Text>
          {isLoading ? (
            <Spinner size="sm" color="#3A56CC" />
          ) : (
            <Text
              fontFamily="'Source Han Sans CN', sans-serif"
              fontWeight="700"
              fontSize="14px"
              lineHeight="1.57em"
              color="#3A56CC"
            >
              {cumulativeJobCount}
            </Text>
          )}
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="14px"
            lineHeight="1.57em"
            color="#54555D"
          >
            {t('jobsCount')}
          </Text>
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="14px"
            lineHeight="1.57em"
            color="#54555D"
          >
            {t('yesterdayAdded')}
          </Text>
          {isLoading ? (
            <Spinner size="sm" color="#3A56CC" />
          ) : (
            <Text
              fontFamily="'Source Han Sans CN', sans-serif"
              fontWeight="700"
              fontSize="14px"
              lineHeight="1.57em"
              color="#3A56CC"
              bg="#EFF1FD"
              border="1px solid #D0D6FB"
              borderRadius="4px"
              px="6px"
            >
              {yesterdayJobCount}
            </Text>
          )}
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="14px"
            lineHeight="1.57em"
            color="#54555D"
          >
            {t('newJobs')}
          </Text>
        </Flex>

        {/* 第二行：主标题 */}
        <Flex direction="column" align="center" gap="2px">
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="700"
            fontSize={titleFontSize}
            lineHeight="1.14em"
            letterSpacing={titleLetterSpacing}
            color="#13172E"
            whiteSpace="nowrap"
          >
            {t("oneStopSubscription")}
          </Text>
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="700"
            fontSize={titleFontSize}
            lineHeight="1.14em"
            letterSpacing={titleLetterSpacing}
            color="#13172E"
            whiteSpace="nowrap"
          >
            {t("globalBestRemoteJobs")}
          </Text>
        </Flex>

        {/* 第三行：核心价值主张 */}
        <Flex direction="column" align="center" gap="0">
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="16px"
            lineHeight="1.5em"
            textAlign="center"
            color="#54555D"
          >
            {t("digitalNomadPurpose")}
          </Text>
          <Text
            fontFamily="'Source Han Sans CN', sans-serif"
            fontWeight="400"
            fontSize="16px"
            lineHeight="1.5em"
            textAlign="center"
            color="#54555D"
          >
            {t("aiJobMatching")}
          </Text>
        </Flex>
      </Flex>

      {/* 分类标签 (SVG 包含形状和文字) */}
      {/* Web3 标签 (x=0, y=129) */}
      <Box
        position="absolute"
        left="0"
        top="129px"
        width="96px"
        height="96px"
      >
        <Image
          src="/svg/tag-web3-full.svg"
          alt="Web3"
          width={96}
          height={96}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Overseas Education 标签 (x=841, y=53.16) */}
      <Box
        position="absolute"
        left="841px"
        top="53.16px"
        width="112px"
        height="112px"
      >
        <Image
          src="/svg/tag-overseas-education-full.svg"
          alt="Overseas Education"
          width={112}
          height={112}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Internet 标签 (x=904.68, y=13) */}
      <Box
        position="absolute"
        left="904.68px"
        top="13px"
        width="133px"
        height="70px"
      >
        <Image
          src="/svg/tag-internet-full.svg"
          alt="Internet"
          width={133}
          height={70}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default WorkPageHeaderBanner;
