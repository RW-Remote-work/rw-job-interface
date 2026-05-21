import { getLink } from "@/utils/navigation";
import { Box, Flex, HStack, Text, Button, Avatar, IconButton, Heading } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useMemo, useState, useEffect } from "react";
import { PagingJobResponse } from "@/api";
import { JobType, useJobTypeOption } from "../constants";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { JobSalaryType } from "@/data/constants";
import { useTranslation } from "next-i18next";
import { i18n } from "next-i18next";
import { useUser } from "@/hooks/useUser";
import JobScore from "@/components/JobScore";

// 客户端渲染的岗位描述组件
const JobDutyContent = ({ duty }: { duty?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Text
      className="ellipsis3"
      dangerouslySetInnerHTML={{
        __html: duty?.replace(/\n/g, "<br/>") || "",
      }}
    />
  );
};

interface JobCardProps extends PagingJobResponse {
  onApplyClick?: () => void
  onFavoriteClick?: () => void
  onRemoveFavoriteClick?: () => void
  score?: number
  statusLabel?: string
  buttonLabel?: string
}

export const JobCard = ({
  job,
  favoriteCount = 0,
  isApply = false,
  isFavorite = false,
  labels = [],
  onApplyClick,
  onFavoriteClick,
  onRemoveFavoriteClick,
  score,
  statusLabel,
  buttonLabel,
}: JobCardProps) => {
  const jobTypeOption = useJobTypeOption(job?.type as JobType)
  const salaryType = job?.salaryType
  const salaryMin = job?.salaryMin
  const salaryMax = job?.salaryMax
  const currencyName = job?.currencyName
  const currencyCode = job?.currencyCode
  const { t } = useTranslation()
  const [{ isLogin }] = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const salaryValue = useMemo(() => {
    return salaryType !== "UNKNOWN_PAY" && salaryType
      ? `${salaryMin}-${salaryMax} / ` + t(JobSalaryType[salaryType])
      : t(JobSalaryType[salaryType ?? "UNKNOWN_PAY"])
  }, [salaryType, salaryMin, salaryMax, t])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // 移除直接调用申请接口，统一在Modal关闭时处理
    onApplyClick?.()
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (isFavorite) {
      onRemoveFavoriteClick?.()
    } else {
      onFavoriteClick?.()
    }
  };

  const handleCardClick = () => {
    if(!isLogin) {
      const targetUrl = `/${job?.id}`;
      window.location.href = getLink("MAIN", "/login") + "?next=" + encodeURIComponent(window.location.href);
      return
    }
    
    window.open(`/${job?.id}`, '_blank')
  }


  const externalTags = [
    job?.jobClassName ? t(job.jobClassName) : undefined,
    jobTypeOption?.label,
    i18n?.language === "zh" 
      ? (job?.countryName ? t(job.countryName) : undefined)
      : (job?.countryEngName || job?.countryName),
  ].filter((v): v is string => v !== undefined)

  return (
     <Flex
       bg={job?.recommendFlag === 1 ? "rgba(241, 237, 229, 1)" : "white"}
       borderRadius="xl"
       px={8} pt={6} pb={4} w="100%"
       cursor="pointer"
       transition="all 0.2s ease-in-out"
       shadow="sm"
       _hover={{
         shadow: "lg",
       }}
       onClick={handleCardClick}
       gap={6}
       alignItems="stretch"
     >
      {/* 左侧主要内容区 */}
      <Box flex="1">
      {/* 顶部标签栏（纯展示） */}
      <Flex justify="space-between" alignItems="flex-start" minHeight="24px" mb={4} gap={2}>
        <HStack spacing={3} flex={1} flexWrap="wrap" rowGap={2}>
          {
            job?.recommendFlag && (
              <Box bg="#FEEAE3" color="#DC362E" borderRadius="md" h="24px" px={2} fontSize="12px" display="flex" alignItems="center" fontWeight="normal" minW="fit-content">
                <Text>{t('recommended')}</Text>
              </Box>
            )
          }
          {externalTags.map((tag) => (
            <Box key={tag} bg="#F1F2F3" color="#13172E" borderRadius="md" h="24px" px={2} fontSize="12px" display="flex" alignItems="center" fontWeight="normal" minW="fit-content">
              {tag}
            </Box>
          ))
          }
        </HStack>

        <Box flexShrink={0}>
          {
            isApply && (
              <Box
                py={1}
                px={2}
                bg="#E7F9F0"
                color="#3B3D46"
                borderRadius="4px"
                fontSize="12px"
                lineHeight="16px"
              >
                {t('applied')}
              </Box>
            )
          }
        </Box>
      </Flex>

      {/* 主体内容 */}
      <Flex flexDir={{ base: "column", md: "column", lg: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-start", lg: "center" }} mb={{ base: 1, md: 1, lg: 2 }} gap={{ base: 1, md: 1, lg: 4 }}>
        <Text fontSize="20px" fontWeight="bold" color="#13172E" lineHeight="1.4" flex="1" noOfLines={1} title={job?.name}>{job?.name}</Text>
        {/* <Text fontSize="20px" fontWeight="bold" color="#13172E" lineHeight="1.4" textAlign="right" minW="220px">¥10000-200/月薪</Text> */}
        <Flex gap={1}>
          <Text fontSize="20px" fontWeight="bold" color="#13172E" lineHeight="1.4">
            {i18n?.language === "zh" ? currencyName : currencyCode}
          </Text>
          <Text fontSize="20px" fontWeight="bold" color="#13172E" lineHeight="1.4">
            {salaryValue}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" fontSize="12px" color="#13172E" lineHeight="20px" fontWeight="normal" mb={2}>
        <JobDutyContent duty={job?.duty} />
      </Flex>
      <HStack spacing={4} mt={2} mb={2}>
        {labels?.map((tag) => (
          <Text key={tag.name} fontSize="12px" color="#13172E" fontWeight="normal">#{tag.name}</Text>
        ))}
      </HStack>

      {/* 底部信息栏 */}
      <Flex flexDir={{ base: "column", md: "column", lg: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-start", lg: "center" }} mt={6} gap={{ base: 4, md: 4, lg: 0 }}>
        <HStack spacing={3}>
          <Avatar width="24px" height="24px" name={job?.publisherName} src={job?.publisherAvatar} />
          <HStack spacing={1}>
            <Text fontSize="13px" color="#3B3D46" fontWeight="normal">{job?.publisherName}</Text>
            {/* dot */}
            <Box w="4px" h="4px" bg="#999" borderRadius="full"></Box>
            {/* 使用 dayjs 求出多久前, 如果相差 1 天以内, 则显示相对时间,  否则显示绝对时间 */}
            <Text fontSize="13px" color="#9D9EA3" fontWeight="normal" suppressHydrationWarning>
              {mounted && dayjs(job?.publishTime).isAfter(dayjs().subtract(1, 'day')) ? dayjs(job?.publishTime).fromNow() : dayjs(job?.publishTime).format('YYYY-MM-DD')}
            </Text>
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <Button
            variant="outline"
            borderRadius="full"
            h="32px"
            px={5}
            fontSize="sm"
            fontWeight="bold"
            aria-label={t('applyNow')}
            onClick={handleApplyClick}
          >
            {t('applyNow')}
          </Button>
          <Flex align="center">
            <IconButton
              aria-label={t('collect')}
              icon={<StarIcon fontSize="12px" />}
              variant="outline"
              color={isFavorite ? "#13172E" : "#9D9EA3"}
              border="none"
              bg={'#F1F2F3'}
              onClick={handleFavoriteClick}
              mr={2}
              rounded="full"
              w="32px"
              h="32px"
              minW="32px"
            />
            <Text fontSize="md" color="#84858B">{favoriteCount}</Text>
          </Flex>
        </HStack>
      </Flex>
      {/* {DeliveryModal} */}
      </Box>
      {/* 右侧 JobScore 组件 */}
      {score !== undefined && (
        <Box height="100%" display={{ base: "none", lg: "flex" }} alignItems="stretch">
          <JobScore
            score={score}
            isLoggedIn={isLogin}
            buttonLabel={buttonLabel}
            jobId={job?.id}
            position={job?.name}
          />
        </Box>
      )}
    </Flex>
  );
};

export default JobCard;
