import { getLink } from "@/utils/navigation";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import JobScore from "@/components/JobScore";
import ResumeBoost from "@/components/ResumeBoost";
import { i18n } from "next-i18next";

import Star from "@/assets/svgs/star.svg";
import StarActive from "@/assets/svgs/star-active.svg";
import Share from "@/assets/svgs/share.svg";
import LinkIcon from "@/assets/svgs/link.svg";
import TwitterIconSvg from "@/assets/svgs/twitter.svg";
import { useRouter } from "next/router";
import { formatDate, getServerSideLanguage, isClient } from "@/utils/common";
import api, { PagingJobResponse } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useModal from "@/hooks/useModal";
import Delivery from "@/components/Modals/Delivery";
import Loading from "@/components/Loading";
import { useFavoriteAction } from "@/hooks/useFavorite";
import { copyText } from "@/utils";
import { Layout } from "@/layouts";
import { useUserSelector } from "@/hooks/useUser";
import { JobSalaryType, JobType } from "@/data/constants";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { TwitterIcon, TwitterShareButton } from "next-share";
import { useWorkOperator } from "../hooks/useWorkOperator";
import { useMemo, useState, useEffect } from "react";
import { BlurBox } from "../components";
import UnlockAllRemoteJobModal from "@/components/Modals/UnlockAllRemoteJobModal";



export const getServerSideProps = async (context: GetServerSidePropsContext<{ id: string }>) => {
  const { req, params } = context;

  const locale = getServerSideLanguage(context);
  // 获取岗位详情
  const jobId = params!.id!;
  let jobData: PagingJobResponse | null = null;
  try {
    const cookies = req.cookies;
    const cookieString = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    console.log('cookieString:', cookieString);
    const response = await api.web.getJob(Number(jobId), {
      headers: {
        Cookie: cookieString
      }
    });
    jobData = response;
  } catch (error) {
    console.error('Error fetching job data:', error);
  }

  // 添加一个标记来验证服务端渲染
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      jobData,
      jobId,
    },
  };
};

export default function Detail({ jobData: initialJobData, jobId }: { jobData: PagingJobResponse | null, jobId: number }) {
  // 在组件中检查这个标记
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: jobData,
    isLoading,
    refetch,
  } = useQuery(["getJob"], () => api.web.getJob(jobId as number), {
    enabled: !!jobId,
    refetchOnWindowFocus: false,
    initialData: initialJobData,
  });

  // 直接使用 jobData，因为它有 initialData，服务端和第一次客户端渲染会保持一致
  const data = jobData;
  const { t } = useTranslation();
  const { job = {}, labels = [], isFavorite, favoriteCount, isApply, blurEffect, matchScore } = data || {};

  // 使用 useWorkOperator hook 获取申请功能
  const { applyJobMutation } = useWorkOperator({
    onApplySuccess: () => {
      console.log('Work detail: Apply success, refetching data...');
      refetch();
      // 同时失效列表页的缓存，确保返回列表页时数据是最新的
      // 使用 queryKey 前缀匹配，失效所有以 'jobList' 开头的查询
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
      console.log('Work detail: Invalidated jobList cache');
    },
  });

  // 现在 isApply 已经定义，可以安全地传递给 useModal
  const [DeliveryModal, { onOpen }] = useModal(Delivery, {
    width: 500,
    data: jobId,
    isApply: isApply, // 传递申请状态
    // onApply: () => {
    //   console.log('Work detail: Delivery onApply called');
    // },
    hasTopRightCloseButton: false, // 去除右上角关闭按钮
    closeOnOverlayClick: false, // 禁用点击外部区域关闭弹窗
  });

  // 调试信息
  console.log('Debug - isApply:', isApply, 'data:', data);
  const {
    id = 0,
    name = "",
    type,
    jobClassId,
    currencyName,
    currencyCode,
    countryId,
    currencyId,
    salaryMin,
    salaryMax,
    salaryType,
    duty,
    requirement = "",
    companyInfo,
    remark,
    publisherId,
    publishTime,
    jobClassName,
    countryName,
    countryEngName,
    publisherName,
    publisherAvatar,
    source,
  } = job;

  const { handleFavorite } = useFavoriteAction({
    id,
    isFavorite,
    onSuccess: refetch,
  });
  const { isLogin } = useUserSelector();
  const [isUnlockAllRemoteJobModalOpen, setIsUnlockAllRemoteJobModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    if (isClient()) {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleDelivery = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log('handleDelivery called, source:', source, 'isLogin:', isLogin);
    if (isLogin) {
      if (source === "RAPID") {
        console.log('Using RAPID delivery path');
        const jobId = Number(router.query.id) || 0;
        api.web.getJobDeliver(Number(jobId)).then((res) => {
          window.open(res.deliverWebsite, "_blank");
          // 对于 RAPID 类型的职位，打开外部链接后也需要更新申请状态
          // 延迟一下再调用申请接口，确保用户有时间看到外部页面
          setTimeout(() => {
            api.web.apply(jobId).then(() => {
              console.log('RAPID job application status updated');
              refetch(); // 刷新数据以获取最新的申请状态
              // 同时失效列表页的缓存，确保返回列表页时数据是最新的
              // 使用 queryKey 前缀匹配，失效所有以 'jobList' 开头的查询
              queryClient.invalidateQueries({ queryKey: ['jobList'] });
              console.log('RAPID job: Invalidated jobList cache');
            }).catch((err) => {
              console.error('Failed to update RAPID job application status:', err);
            });
          }, 1000);
        });
      } else {

        if (blurEffect) {
          setIsUnlockAllRemoteJobModalOpen(true)
          return
        }

        console.log('Using normal delivery modal path');


        applyJobMutation.mutateAsync(Number(jobId)).then(() => {
          onOpen();
        }).catch((error) => {
          // 检查是否是重复申请错误
          const errorDetail = error?.detail || '';
          // 如果是重复申请错误，不显示解锁Modal
          if (errorDetail.includes('重复申请') || errorDetail.includes('已申请')) {
            // 这里不需要额外处理，也不显示解锁Modal
            return;
          }

          // 其他错误才显示解锁Modal
          setIsUnlockAllRemoteJobModalOpen(true)
        });

      }
    } else {
      // 使用 asPath 以包含真实的 id（router.pathname 会返回动态路由模式 '/[id]'）
      const currentUrl = router.asPath || `/${jobId}`;
      window.location.href = getLink("MAIN", "/login") + "?next=" + encodeURIComponent(window.location.href);
    }
  };

  const title = `${t('yuan-cheng-gong-zuo')} - ${name}`;

  const shareTitle = [
    t('ogShareTitle1') + '｜' + name,
    t('ogShareTitle2'),
    t('ogShareTitle3'),
  ].join("\n");

  const salaryValue = useMemo(() => {
    return salaryType !== "UNKNOWN_PAY" && salaryType
      ? `${salaryMin}-${salaryMax} / ` + t(JobSalaryType[salaryType])
      : t(JobSalaryType[salaryType ?? "UNKNOWN_PAY"])
  }, [salaryType, salaryMin, salaryMax, t])

  if (!mounted) {
    return (
      <Layout title={title}>
        <Flex justifyContent="center" alignItems="center" height="80vh">
          <Loading />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <Box mt={{ base: "-44px", md: "-28px", lg: "-55px" }}>
        <Flex
          justifyContent="flex-start"
          mt={{ base: "16px", md: "32px", lg: "52px" }}
          mb={{ base: "20px", md: "30px", lg: "40px" }}
          ml={{ base: "16px", md: "32px", lg: "64px" }}
        >
        {/*<Back onClick={() => router.push("/work")}></Back>*/}
      </Flex>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="80vh">
          <Loading />
        </Flex>
      ) : (
        <Flex
          justifyContent="center"
          pb={{ base: "40px", md: "80px", lg: "40px" }}
          alignItems={{ base: "flex-start", lg: "flex-start" }}
          flexDirection={{ base: "column", lg: "row" }}
          px={{ base: "16px", md: "24px", lg: "0" }}
        >
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            as="main"
            maxWidth={{ base: "100%", lg: "812px" }}
            mx={{ base: "0", md: "24px", lg: "24px" }}
            flexGrow="1"
            width={{ base: "100%", lg: "auto" }}
            order={{ base: 1, lg: 0 }}
            alignSelf={{ lg: "stretch" }}
          >
            {/* 固定顶部区域：岗位标题、标签、ResumeBoost */}
            <Box width="100%" flexShrink={{ lg: 0 }}>
              {/* 桌面端：岗位标题和分享按钮 */}
              <Flex
                display={{ base: "none", lg: "flex" }}
                alignItems="center"
                gap="16px"
                my="4"
                mb="12px"
              >
                <Heading
                  as="h2"
                  size="lg"
                  fontSize="24px"
                  fontWeight="900"
                  flex="1"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {name}
                </Heading>
                {/* 复制和分享按钮 */}
                <Flex gap="16px" flexShrink={0}>
                  <Flex
                    onClick={() => copyText(window.location.href, t('copySuccessShare'))}
                    justifyContent="center"
                    alignItems="center"
                    _hover={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                    padding="0px 12px"
                    height="32px"
                    borderRadius="48px"
                    border="1px solid #E6E7E9"
                    backgroundColor="#FFFFFF"
                    cursor="pointer"
                    gap="4px"
                  >
                    <Image
                      width="12px"
                      height="12px"
                      src={LinkIcon}
                      alt={t('copy')}
                    />
                    <Box fontSize="12px" color="#13172E">{t('copy')}</Box>
                  </Flex>

                  <TwitterShareButton
                    url={currentUrl}
                    title={shareTitle}
                    blankTarget
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      padding="0px 12px"
                      height="32px"
                      borderRadius="48px"
                      border="1px solid #E6E7E9"
                      backgroundColor="#FFFFFF"
                      cursor="pointer"
                      gap="4px"
                      _hover={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                    >
                      <Image
                        width="16px"
                        height="16px"
                        src={TwitterIconSvg}
                        alt={t('share')}
                      />
                      <Box fontSize="12px" color="#13172E">{t('share')}</Box>
                    </Flex>
                  </TwitterShareButton>
                </Flex>
              </Flex>
                {/* ... rest of the content ... */}

              {/* 移动端：岗位标题 */}
              <Heading
                as="h2"
                size="lg"
                display={{ base: "block", lg: "none" }}
                my="2"
                fontSize={{ base: "20px", md: "22px" }}
                fontWeight="900"
                mb="12px"
              >
                {name}
              </Heading>
              {/* 岗位标签 - 桌面端显示 */}
              <Flex
                display={{ base: "none", lg: "flex" }}
                flexDirection="row"
                gap="16px"
                flexWrap="wrap"
              >
                {labels.map((item) => (
                  <Box
                    key={item.id}
                    fontSize="14px"
                    color="#3B3D46"
                  >
                    #{item.name}
                  </Box>
                ))}
              </Flex>
              {/* 临时注释：根据最新接口调整隐藏ResumeBoost组件 */}
              {/* <Box display={{ base: "none", lg: "block" }}>
                <ResumeBoost
                  resumeUrl={data?.optimizedResumeUrl}
                  jobId={Number(jobId)}
                  jobName={name}
                />
              </Box> */}
            </Box>

            {/* 桌面端：岗位详情滚动区域（岗位职责及以下内容） */}
            <Box
              width="100%"
              overflowY={{ lg: "auto" }}
              flex={{ lg: "1" }}
              minHeight={{ lg: "0" }}
              pr={{ lg: "16px" }}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#a8a8a8',
                },
              }}
            >
              <Heading
                as="h3"
                size="md"
                my={{ base: "1", lg: "2" }}
                fontWeight="900"
                mb={{ base: "12px", md: "14px", lg: "16px" }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              >
                {t('gang-wei-zhi-ze')} </Heading>
              <BlurBox enabled={blurEffect} offsetLeft={24} offsetRight={24} showLock onLockClick={() => setIsUnlockAllRemoteJobModalOpen(true)}>
                <Text
                  my={{ base: "1", lg: "2" }}
                  mb={{ base: "24px", md: "32px", lg: "40px" }}
                  fontSize={{ base: "14px", md: "15px", lg: "16px" }}
                  lineHeight={{ base: "1.6", lg: "1.5" }}
                  dangerouslySetInnerHTML={{
                    __html: duty?.replace(/\n/g, "<br/>") || "",
                  }}
                ></Text>
              </BlurBox>

              {requirement && requirement !== "" && requirement !== "无" && (
                <>
                  <Heading
                    as="h3"
                    size="md"
                    my={{ base: "1", lg: "2" }}
                    fontWeight="900"
                    mb={{ base: "12px", md: "14px", lg: "16px" }}
                    fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  >
                    {t('gang-wei-yao-qiu')} </Heading>
                  <BlurBox enabled={blurEffect} offsetLeft={24} offsetRight={24} onLockClick={() => setIsUnlockAllRemoteJobModalOpen(true)}>
                    <Text
                      my={{ base: "1", lg: "2" }}
                      mb={{ base: "24px", md: "32px", lg: "40px" }}
                      fontSize={{ base: "14px", md: "15px", lg: "16px" }}
                      lineHeight={{ base: "1.6", lg: "1.5" }}
                      dangerouslySetInnerHTML={{
                        __html: requirement.replace(/\n/g, "<br/>"),
                      }}
                    ></Text>
                  </BlurBox>
                </>
              )}
              {remark && remark.trim() !== "" && (
                <>
                  <Heading
                    as="h3"
                    size="md"
                    my={{ base: "1", lg: "2" }}
                    fontWeight="900"
                    mb={{ base: "12px", md: "14px", lg: "16px" }}
                    fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  >
                    {t('gang-wei-bei-zhu')} </Heading>
                  <BlurBox enabled={blurEffect} offsetLeft={24} offsetRight={24} onLockClick={() => setIsUnlockAllRemoteJobModalOpen(true)}>
                    <Text
                      my={{ base: "1", lg: "2" }}
                      mb={{ base: "24px", md: "32px", lg: "40px" }}
                      fontSize={{ base: "14px", md: "15px", lg: "16px" }}
                      lineHeight={{ base: "1.6", lg: "1.5" }}
                      dangerouslySetInnerHTML={{
                        __html: remark.replace(/\n/g, "<br/>"),
                      }}
                    ></Text>
                  </BlurBox>
                </>
              )}
              <Heading
                as="h3"
                size="md"
                my={{ base: "1", lg: "2" }}
                fontWeight="900"
                mb={{ base: "12px", md: "14px", lg: "16px" }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              >
                {t('gong-si-tuan-dui-jie-0')} </Heading>
              <BlurBox enabled={blurEffect} offsetLeft={24} offsetRight={24} onLockClick={() => setIsUnlockAllRemoteJobModalOpen(true)}>
                <Text
                  my={{ base: "1", lg: "2" }}
                  mb={{ base: "24px", md: "32px", lg: "40px" }}
                  fontSize={{ base: "14px", md: "15px", lg: "16px" }}
                  lineHeight={{ base: "1.6", lg: "1.5" }}
                  dangerouslySetInnerHTML={{
                    __html: companyInfo?.replace(/\n/g, "<br/>") || "",
                  }}
                ></Text>
              </BlurBox>
            </Box>

            {/* 固定底部区域：按钮 + 提示文字 */}
            <Flex
              mt={{ base: "40px", md: "80px", lg: "25px" }}
              flexDirection={{ base: "column", lg: "row" }}
              justifyContent="space-between"
              width="100%"
              alignItems={{ base: "stretch", lg: "center" }}
              gap={{ base: "16px", lg: "0" }}
              flexShrink={{ lg: 0 }}
            >
              {/* 移动端：立即申请按钮 */}
              <Button
                onClick={(e) => handleDelivery(e)}
                height={{ base: "44px", lg: "48px" }}
                borderRadius="44px"
                display={{ base: "flex", lg: "none" }}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                order={1}
              >
                <Text
                  color="white"
                  fontWeight="400"
                  fontSize="18px"
                  letterSpacing="0.095em"
                >
                  {isApply ? t('applied') : t('li-ji-shen-qing')}
                </Text>
              </Button>

              {/* 移动端：复制和分享按钮 */}
              <Flex
                flexDirection="row"
                gap="16px"
                order={0}
                justifyContent="center"
                display={{ base: "flex", lg: "none" }}
              >
                <Flex
                  onClick={() => copyText(window.location.href, t('copySuccessShare'))}
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                  padding="0px 12px"
                  height="32px"
                  borderRadius="48px"
                  border="1px solid #E6E7E9"
                  backgroundColor="#FFFFFF"
                  cursor="pointer"
                  gap="4px"
                >
                  <Image
                    width="12px"
                    height="12px"
                    src={LinkIcon}
                    alt="复制"
                  />
                  <Box fontSize="12px" color="#13172E">复制</Box>
                </Flex>

                <TwitterShareButton
                  url={currentUrl}
                  title={shareTitle}
                  blankTarget
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    padding="0px 12px"
                    height="32px"
                    borderRadius="48px"
                    border="1px solid #E6E7E9"
                    backgroundColor="#FFFFFF"
                    cursor="pointer"
                    gap="4px"
                    _hover={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                  >
                    <Image
                      width="16px"
                      height="16px"
                      src={TwitterIconSvg}
                      alt="分享"
                    />
                    <Box fontSize="12px" color="#13172E">分享</Box>
                  </Flex>
                </TwitterShareButton>
              </Flex>
            </Flex>
            <Box
              fontSize={{ base: "11px", lg: "12px" }}
              color="rgba(0, 0, 0, 0.4)"
              mt={{ base: "16px", lg: "16px" }}
              px={{ base: "0", lg: "0" }}
              flexShrink={{ lg: 0 }}
            >
              {/* <Box>*该远程工作信息来源于站外平台，本站仅提供部分信息展示与订阅服务，更多请查看免责申明。</Box>
              <Box>*如遇到违法/违规/欺诈等不良性质的招聘信息，请通过下方渠道联系我们进行举报，共同维护社区环境。</Box> */}
              <Box>
                {t('qiu-zhi-guo-cheng-zh')} </Box>
            </Box>
          </Flex>
          {/* 右侧区域容器（JobScore 在面板上方） */}
          <Flex
            flexDirection="column"
            width={{ base: "100%", lg: "340px" }}
            mx={{ base: "0", lg: "24px" }}
            order={{ base: 0, lg: 1 }}
            mb={{ base: "24px", lg: "0" }}
            mt={{ base: "24px", lg: "0" }}
          >
            {/* JobScore 组件（在右侧面板上方） */}
            <Box mb="24px" display={{ base: "none", lg: "block" }}>
              <JobScore
                score={matchScore}
                isLoggedIn={isLogin}
                fullWidth={true}
                jobId={Number(router.query.id)}
                position={job?.name}
              />
            </Box>

            {/* 桌面端：右侧面板 */}
            <Flex
              flexDirection="column"
              padding={{ base: "24px 16px", md: "28px 24px", lg: "32px" }}
              as="aside"
              borderRadius={{ base: "xl", lg: "4px" }}
              backgroundColor={{ base: "white", lg: "#FBFBFB" }}
              shadow={{ base: "sm", lg: "none" }}
            >
            {/* 移动端：Tag 标签形式显示 */}
            <Flex
              display={{ base: "flex", lg: "none" }}
              flexWrap="wrap"
              gap={3}
              mb={4}
            >
              {jobClassName && (
                <Box
                  bg="#F1F2F3"
                  color="#13172E"
                  borderRadius="md"
                  h="24px"
                  px={2}
                  fontSize="12px"
                  display="flex"
                  alignItems="center"
                  fontWeight="normal"
                >
                  {jobClassName}
                </Box>
              )}
              {type && (
                <Box
                  bg="#F1F2F3"
                  color="#13172E"
                  borderRadius="md"
                  h="24px"
                  px={2}
                  fontSize="12px"
                  display="flex"
                  alignItems="center"
                  fontWeight="normal"
                >
                  {t(JobType[type as keyof typeof JobType])}
                </Box>
              )}
              {(countryName || countryEngName) && (
                <Box 
                  bg="#F1F2F3" 
                  color="#13172E" 
                  borderRadius="md" 
                  h="24px" 
                  px={2} 
                  fontSize="12px" 
                  display="flex" 
                  alignItems="center" 
                  fontWeight="normal"
                >
                  {i18n?.language === "zh" ? countryName : (countryEngName || countryName)}
                </Box>
              )}
            </Flex>

            {/* 移动端：薪资信息 */}
            <Box display={{ base: "block", lg: "none" }} mb={4}>
              <Text fontSize="20px" fontWeight="bold" color="#13172E" lineHeight="1.4">
                {salaryType !== "UNKNOWN_PAY" && salaryType
                  ? `${currencyName || currencyCode || ''} ${salaryMin}-${salaryMax} / ${t(JobSalaryType[salaryType])}`
                  : t(JobSalaryType[salaryType ?? "UNKNOWN_PAY"])}
              </Text>
            </Box>

            {/* 移动端：岗位标签 */}
            {labels && labels.length > 0 && (
              <Flex display={{ base: "flex", lg: "none" }} flexWrap="wrap" gap={2} mb={4}>
                {labels.map((item) => (
                  <Text key={item.id} fontSize="12px" color="#13172E" fontWeight="normal">
                    #{item.name}
                  </Text>
                ))}
              </Flex>
            )}

            {/* 移动端：收藏信息 */}
            <Flex
              display={{ base: "flex", lg: "none" }}
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Text fontSize="13px" color="#84858B">
                {favoriteCount} {t('ren-shou-cang-gai-ga')}
              </Text>
              <Flex
                cursor="pointer"
                onClick={handleFavorite}
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                backgroundColor="#F1F2F3"
                borderRadius="full"
              >
                <Image
                  src={isFavorite ? StarActive : Star}
                  alt={t('shou-cang')}
                  width="16px"
                  height="16px"
                ></Image>
              </Flex>
            </Flex>

            {/* 桌面端：立即申请和收藏按钮 */}
            <Flex
              display={{ base: "none", lg: "flex" }}
              gap="12px"
              mb="16px"
            >
              {/* 立即申请按钮 */}
              <Button
                onClick={handleDelivery}
                height="32px"
                bg="#13172E"
                color="#FFFFFF"
                borderRadius="29px"
                px="16px"
                py="4px"
                fontSize="12px"
                fontWeight="500"
                fontFamily="Source Han Sans CN, sans-serif"
                lineHeight="1.167em"
                flex="1"
                _hover={{ bg: "#23284A" }}
                _active={{ bg: "#23284A" }}
              >
                {isApply ? t('applied') : t('li-ji-shen-qing')}
              </Button>

              {/* 收藏按钮 */}
              <Button
                onClick={handleFavorite}
                height="32px"
                bg="transparent"
                color="#13172E"
                border="1px solid #13172E"
                borderRadius="29px"
                px="16px"
                py="4px"
                fontSize="12px"
                fontWeight="500"
                fontFamily="Source Han Sans CN, sans-serif"
                lineHeight="1.167em"
                flex="1"
                _hover={{ bg: "#F1F2F3" }}
                _active={{ bg: "#E6E7E9" }}
              >
                {isFavorite ? t('alreadyFavorited') : t('addToFavorites')}
              </Button>
            </Flex>

            {/* 桌面端：薪资待遇 */}
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="16px"
              color="rgba(0, 0, 0, 0.6)"
              mb="16px"
            >
              {t('xin-zi-dai-yu')} </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="20px"
              color="black"
              mb="40px"
            >
              {/* @ts-ignore: 后端类型 */}
              {salaryType !== "UNKNOWN_PAY" && salaryType
                ? `${salaryMin}-${salaryMax} / ${currencyName || currencyCode || ''} / ${t(JobSalaryType[salaryType])}`
                : t(JobSalaryType[salaryType ?? "UNKNOWN_PAY"])}
            </Box>

            {/* 桌面端：职位分类 */}
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="16px"
              color="rgba(0, 0, 0, 0.6)"
              mb="16px"
            >
              {t('zhi-wei-fen-lei')} </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="20px"
              color="black"
              mb="40px"
            >
              {jobClassName}
            </Box>

            {/* 桌面端：工作类型 */}
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="16px"
              color="rgba(0, 0, 0, 0.6)"
              mb="16px"
            >
              {t('gong-zuo-lei-xing')} </Box>
            {/* @ts-ignore: 后端类型 */}
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="20px"
              color="black"
              mb="40px"
            >
              {t(JobType[type as keyof typeof JobType])}
            </Box>

            {/* 桌面端：国家地区 */}
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="16px"
              color="rgba(0, 0, 0, 0.6)"
              mb="16px"
            >
              {t('guo-jia-di-qu')} </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              fontWeight="900"
              fontSize="20px"
              color="black"
              mb="40px"
            >
              {i18n?.language === "zh" ? countryName : (countryEngName || countryName)}
            </Box>

            <Divider display={{ base: "none", lg: "block" }} borderStyle="dashed" borderColor="#ADADAD" />

            {/* 移动端：发布者信息（简化版） */}
            <Flex
              display={{ base: "flex", lg: "none" }}
              alignItems="center"
              mt={4}
              pt={4}
              borderTop="1px solid"
              borderColor="#F1F2F3"
            >
              <Avatar
                name={publisherName}
                src={publisherAvatar}
                marginRight="12px"
                width="24px"
                height="24px"
              />
              <Flex alignItems="center" gap={1}>
                <Text fontSize="13px" color="#3B3D46" fontWeight="normal">
                  {publisherName || publisherId}
                </Text>
                <Box w="4px" h="4px" bg="#999" borderRadius="full"></Box>
                <Text fontSize="13px" color="#9D9EA3" fontWeight="normal">
                  {formatDate(publishTime || "")}
                </Text>
              </Flex>
            </Flex>

            {/* 桌面端：发布者信息（原样式） */}
            <Flex
              display={{ base: "none", lg: "flex" }}
              alignItems="center"
              fontSize="12px"
              color="rgba(0, 0, 0, 0.5)"
              mt="25px"
            >
              <Avatar
                name={publisherName}
                src={publisherAvatar}
                marginRight="16px"
                width="56px"
                height="56px"
              />
              <Flex
                justifyContent="space-around"
                height="100%"
                flexDirection="column"
              >
                <Text
                  fontSize="16px"
                  color="black"
                  fontWeight="900"
                >
                  {publisherName || publisherId}
                </Text>
                <Text>{formatDate(publishTime || "")}</Text>
              </Flex>
            </Flex>
          </Flex>
          </Flex>
        </Flex>
      )}
      {DeliveryModal}


      <UnlockAllRemoteJobModal
        isOpen={isUnlockAllRemoteJobModalOpen}
        onClose={() => setIsUnlockAllRemoteJobModalOpen(false)}
      />
      </Box>
    </Layout>
  );
}
