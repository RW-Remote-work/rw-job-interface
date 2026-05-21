import { getLink } from "@/utils/navigation";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Collapse,
  useMediaQuery,
} from "@chakra-ui/react";
import { JobCard as WorkJobCard, ReleaseJobGuideCard, JobCustomCard, JobCardSkeleton } from "./components";
import EmptyStateNoJobs from "@/components/EmptyState/EmptyStateNoJobs";
import JobAreaContainer from "@/components/JobAreaContainer";
import JobCard from "@/components/JobCard";
import JobFilterBar from "@/components/JobFilterBar";
import MatchFilter from "@/components/MatchFilter";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getCookie } from "@/utils/cookies";
import {
  fetchJobList,
  fetchJobSubscription,
  useJobList,
  useJobListAll,
  useJobListSubscribed,
  useJobSubscription,
  useSelfResume,
  useAppliedJobs,
  useFavoriteJobs,
} from "./data";
import api, {
  GetUserProfileResponse,
  IPagePagingJobResponse,
  JobDTO,
  JobSubscribeResponse,
  PagingJobResponse,
  ResumeResponse,
} from "@/api";
import { TalentCard } from "./components/TalentCard";
import { getServerSideLanguage } from "@/utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { fetchUserInfo, useUserInfo } from "./user/data";
import { useWorkOperator } from "./hooks/useWorkOperator";
import { JobCustomFormValues } from "./components/JobCustomForm";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JobType } from "./constants";
import to from "await-to-js";
import { SimplePagination } from "@/components/Pagination/SimplePagination";
import Delivery from "@/components/Modals/Delivery";
import useModal from "@/hooks/useModal";
import { UnlockAllRemoteJobModal } from "@/components/Modals/UnlockAllRemoteJobModal";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import MembershipPrompt from "@/components/MembershipPrompt";
import { useMembership } from "@/hooks/useMembership";
import { UpdateResumeModal } from "@/components/UpdateResumeModal";
import { useUpdateAiResume } from "@/hooks/useUpdateAiResume";
import WorkPageHeaderBanner from "@/components/WorkPageHeaderBanner";
import MarqueeLogoScroller from "@/components/MarqueeLogoScroller";

interface WorkPageProps {
  workListResponse: IPagePagingJobResponse;
  userInfo: GetUserProfileResponse | null;
  jobSubscription: JobSubscribeResponse | null;
  [key: string]: any;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<{
  props: WorkPageProps;
}> => {
  const headers = context.req.headers;
  const cookie = headers.cookie || "";

  const locale = getServerSideLanguage(context);

  const token = getCookie(cookie, "token");

  if (!token) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        workListResponse: await fetchJobList(
          {
            page: 1,
            size: 10,
          },
          {
            headers,
          },
        ),
        userInfo: null,
        jobSubscription: null,
        resume: null,
      },
    };
  }

  const [, userInfo = null] = await to(
    fetchUserInfo({
      headers,
    }),
  );

  const [, jobSubscription = null] = await to(
    fetchJobSubscription({
      headers,
    }),
  );

  // 全部岗位列表 - 使用空筛选条件获取
  const workListResponse = await fetchJobList(
    {
      page: 1,
      size: 10,
    },
    {
      headers,
    },
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      workListResponse,
      userInfo,
      jobSubscription,
    },
  };
};

export default function WorkPage({
  workListResponse: initialWorkListResponse,
  userInfo: initialUserInfo,
  jobSubscription: initialJobSubscription,
}: WorkPageProps) {
  const { t } = useTranslation();

  const { data: userInfo } = useUserInfo({
    initialData: initialUserInfo || undefined,
    enabled: Boolean(initialUserInfo),
  });

  const listContainer = useRef<HTMLDivElement>(null);

  const isLogin = useMemo(() => {
    return Boolean(userInfo);
  }, [userInfo]);

  // 获取会员状态
  const membership = useMembership(userInfo, t);
  const isValidMember = membership.isValidMember;

  // 获取用户社区信息（包含贝壳数量）
  const { data: communityInfos } = useQuery({
    queryKey: ["getUserCommunityInfo"],
    queryFn: () => api.web.getUserCommunityInfo(),
    refetchOnWindowFocus: false,
    enabled: isLogin,
  });

  // 获取收藏岗位总数
  const { data: favoriteJobsData } = useQuery({
    queryKey: ["favoriteJobsCount"],
    queryFn: () => api.favorites.pagingJobFavorite({ page: 0, size: 1 }),
    refetchOnWindowFocus: false,
    enabled: isLogin,
  });

  // 会员限制弹窗状态
  const [isUnlockAllRemoteJobModalOpen, setIsUnlockAllRemoteJobModalOpen] =
    useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: resume } = useSelfResume({
    enabled: isLogin,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // 更新简历提示弹窗状态
  const { shouldShowModal, handleUpdate, isInitialized: isUpdateAiResumeInitialized } = useUpdateAiResume({
      resume,
    });

  // 订阅表单状态（用于 JobCustomForm）
  const [filterFormValues, setFilterFormValues] = useState<JobCustomFormValues>(
    () => {
      
      return {
        alarmType: initialJobSubscription?.alarmType || 1,
        keywords: initialJobSubscription?.keywords || [],
        jobClass: initialJobSubscription?.jobClassIds || [],
        jobType: (initialJobSubscription?.types as JobType[]) || [],
        country: initialJobSubscription?.countryIds || [],
      };
    },
  );

  // JobFilterBar 独立筛选状态（用于"全部岗位"的筛选功能）
  // 与订阅状态完全独立，不受 jobSubscription 影响
  const [searchFilters, setSearchFilters] = useState<{
    keywords?: string[];
    jobClassIds?: number[];
    types?: JobType[];
    countryIds?: number[];
  }>({});

  const handleFilterChange = useCallback((filters: {
    keywords?: string;
    jobClassIds?: number[];
    types?: JobType[];
    countryIds?: number[];
  }) => {
    // JobFilterBar 的筛选条件独立管理
    setSearchFilters({
      keywords: filters.keywords ? filters.keywords.split(',').filter(Boolean) : [],
      jobClassIds: filters.jobClassIds || [],
      types: filters.types || [],
      countryIds: filters.countryIds || [],
    })
  }, []);

  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");
  const [isJobCustomCardVisible, setIsJobCustomCardVisible] = useState(true);
  const [matchScoreFilter, setMatchScoreFilter] = useState<string | undefined>('publish_time');
  const [aiMatchedJobs, setAiMatchedJobs] = useState<IPagePagingJobResponse | null>(null);
  const [isLoadingAiMatch, setIsLoadingAiMatch] = useState(false);

  // 当选择排名筛选时，调用 AI 接口获取匹配岗位
  useEffect(() => {
    const fetchAiMatchedJobs = async () => {
      // 按发布时间排序时，不使用 AI 匹配岗位
      if (!matchScoreFilter || matchScoreFilter === 'publish_time') {
        setAiMatchedJobs(null);
        return;
      }

      // 按匹配度排序（Top 100）
      const topN = parseInt(matchScoreFilter, 10);
      if (isNaN(topN)) {
        setAiMatchedJobs(null);
        return;
      }

      setIsLoadingAiMatch(true);
      try {
        const response = await api.ai.getTopNMatchingJobs({ topN });
        setAiMatchedJobs(response);
      } catch (error) {
        console.error("Failed to fetch AI matched jobs:", error);
        setAiMatchedJobs(null);
      } finally {
        setIsLoadingAiMatch(false);
      }
    };

    fetchAiMatchedJobs();
  }, [matchScoreFilter]);

  useEffect(() => {
    setIsJobCustomCardVisible(isLargerThanLg);
  }, [isLargerThanLg]);

  const toggleJobCustomCardVisibility = () => {
    setIsJobCustomCardVisible(!isJobCustomCardVisible);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [tab, setTab] = useState<"SUBSCRIBED" | "APPLIED" | "ALL" | "FAVORITE">("ALL");

  const { data: jobSubscription } = useJobSubscription(
    {},
    {
      initialData: initialJobSubscription || undefined,
      enabled: isLogin,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const isSubscribed = useMemo(() => {
    return Boolean(jobSubscription?.id);
  }, [jobSubscription]);

  // 根据 tab 值确定使用哪个筛选条件
  const activeFilters = useMemo(() => {
    if (tab === "SUBSCRIBED" && jobSubscription) {
      return {
        jobClassIds: jobSubscription.jobClassIds || [],
        types: (jobSubscription.types as JobType[]) || [],
        countryIds: jobSubscription.countryIds || [],
        keywords: jobSubscription.keywords || [],
      };
    }
    // 对于"全部岗位"、"已申请"、"收藏"等tab，使用 JobFilterBar 的筛选条件
    return {
      jobClassIds: searchFilters.jobClassIds || [],
      types: searchFilters.types || [],
      countryIds: searchFilters.countryIds || [],
      keywords: searchFilters.keywords || [],
    };
  }, [tab, jobSubscription, searchFilters.jobClassIds, searchFilters.types, searchFilters.countryIds, searchFilters.keywords]);

  // 全部岗位列表 - 独立的 useQuery
  const {
    data: allJobResponse,
    refetch: refetchAllJobs,
    isLoading: isAllJobsFetching,
  } = useJobListAll(
    {
      page: currentPage,
      size: 10,
      jobClassIds: searchFilters.jobClassIds || [],
      types: searchFilters.types || [],
      countryIds: searchFilters.countryIds || [],
      keywords: searchFilters.keywords || [],
    },
    {},
    {
      enabled: tab === "ALL",
      initialData: initialWorkListResponse,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  // 订阅岗位列表 - 独立的 useQuery
  const {
    data: subscribedJobResponse,
    refetch: refetchSubscribedJobs,
    isLoading: isSubscribedJobsFetching,
  } = useJobListSubscribed(
    {
      page: currentPage,
      size: 10,
      jobClassIds: jobSubscription?.jobClassIds || [],
      types: (jobSubscription?.types as JobType[]) || [],
      countryIds: jobSubscription?.countryIds || [],
      keywords: jobSubscription?.keywords || [],
    },
    {},
    {
      enabled: tab === "SUBSCRIBED",
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  // 根据 tab 值确定显示哪个列表
  const workListResponse = tab === "SUBSCRIBED" ? subscribedJobResponse : allJobResponse;
  const refetchWorkList = tab === "SUBSCRIBED" ? refetchSubscribedJobs : refetchAllJobs;
  const isWorkListFetching = tab === "SUBSCRIBED" ? isSubscribedJobsFetching : isAllJobsFetching;

  // 已申请岗位列表
  const {
    data: appliedJobResponse,
    refetch: refetchAppliedJobs,
    isLoading: isAppliedJobsFetching,
  } = useAppliedJobs(
    { page: currentPage, size: 10 },
    {},
    {
      enabled: tab === "APPLIED",
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  // 收藏岗位列表
  const {
    data: favoriteJobResponse,
    refetch: refetchFavoriteJobs,
    isLoading: isFavoriteJobsFetching,
  } = useFavoriteJobs(
    { page: currentPage, size: 10 },
    {},
    {
      enabled: tab === "FAVORITE",
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  // 根据 tab 值确定显示哪个列表
  const activeJobResponse = useMemo(() => {
    if (tab === "APPLIED") return appliedJobResponse;
    if (tab === "FAVORITE") return favoriteJobResponse;
    if (matchScoreFilter && aiMatchedJobs) return aiMatchedJobs;
    return workListResponse;
  }, [tab, appliedJobResponse, favoriteJobResponse, workListResponse, matchScoreFilter, aiMatchedJobs]);

  const activeIsLoading = useMemo(() => {
    if (tab === "APPLIED") return isAppliedJobsFetching;
    if (tab === "FAVORITE") return isFavoriteJobsFetching;
    if (matchScoreFilter) return isLoadingAiMatch;
    return isWorkListFetching;
  }, [tab, isAppliedJobsFetching, isFavoriteJobsFetching, isWorkListFetching, matchScoreFilter, isLoadingAiMatch]);

  const activeRefetch = tab === "APPLIED" ? refetchAppliedJobs : tab === "FAVORITE" ? refetchFavoriteJobs : refetchWorkList;

  // 保留 updateSubscriptionToFormValues 用于更新订阅表单
  const updateSubscriptionToFormValues = useCallback(
    (subscription: JobSubscribeResponse) => {
      setFilterFormValues({
        jobClass: subscription.jobClassIds || [],
        jobType: (subscription.types as JobType[]) || [],
        country: subscription.countryIds || [],
        alarmType: subscription.alarmType || 1,
        keywords: subscription.keywords || [],
      });
    },
    [],
  );

  // 标记是否是初始挂载
  const isInitialMount = useRef(true);

  // 当订阅状态变化或切换到订阅tab时，更新订阅表单
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (tab === "SUBSCRIBED" && jobSubscription) {
      updateSubscriptionToFormValues(jobSubscription);
    }
  }, [updateSubscriptionToFormValues, jobSubscription, tab]);

  // 根据会员状态设置 Tab：所有用户默认显示全部岗位
  useEffect(() => {
    // 所有用户默认显示全部岗位 Tab
    setTab("ALL");
  }, [isLogin, isValidMember, isSubscribed]);

  // Tab 切换时重置分页到第一页，并清空匹配度筛选
  useEffect(() => {
    setCurrentPage(1);
    // 非全部岗位tab时，清空匹配度筛选，使用正常接口请求数据
    if (tab !== "ALL") {
      setMatchScoreFilter('publish_time');
      setAiMatchedJobs(null);
    }
  }, [tab]);

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const { applyJobMutation, favoriteJobMutation, removeFavoriteJobMutation } =
    useWorkOperator({
      onApplySuccess: () => {
        refetchWorkList();
      },
      onFavoriteSuccess: () => {
        refetchWorkList();
        refetchFavoriteJobs();
      },
      onRemoveFavoriteSuccess: () => {
        refetchWorkList();
        refetchFavoriteJobs();
      },
    });

  const list = activeJobResponse?.records || [];
  const total = activeJobResponse?.total || 0;

  const router = useRouter();

  const tabs = useMemo(() => {
    const labelForAll = `${t("discoverFeaturedJobs")}${
      total > 0 ? `(${total})` : ""
    }`;

    const allItem = {
      label: isSubscribed ? t("allWorkOpportunities") : labelForAll,
      value: "ALL",
    };

    // 未登录用户只显示"全部岗位"tab
    if (!isLogin) {
      return [allItem];
    }

    // 登录后，只有会员才显示订阅岗位 tab
    if (isValidMember) {
      const subscriptionItem = {
        label: t("allSubscribedJobs"),
        value: "SUBSCRIBED",
      };
      return [subscriptionItem, allItem];
    }

    // 非会员登录只显示全部岗位
    return [allItem];
  }, [isSubscribed, total, t, isLogin, isValidMember]);

  // Tab 切换时仅重置"全部岗位"的筛选条件，保留用户选择的筛选条件
  useEffect(() => {
    if (tab === "ALL") {
      setFilterFormValues({
        alarmType: 1,
        keywords: [],
        jobClass: [],
        jobType: [],
        country: [],
      });
    }
    // 当 tab === "SUBSCRIBED" 时，不修改 filterFormValues
    // 这样用户切换回"全部岗位"时可以继续使用之前选择的筛选条件
  }, [tab]);

  const [selectedJobResponse, setSelectedJobResponse] =
    useState<PagingJobResponse | null>(null);

  const [DeliveryModal, { onOpen: openJobDeliveryModal }] = useModal(Delivery, {
    width: 500,
    data: selectedJobResponse?.job?.id,
    isApply: selectedJobResponse?.isApply, // 传递申请状态
    // onApply: () => {
    //   applyJobMutation.mutate(activeJobResponse?.job?.id!)
    // }, // 传递申请成功回调
    hasTopRightCloseButton: false, // 去除右上角关闭按钮
    closeOnOverlayClick: false, // 禁用点击外部区域关闭弹窗
  });

  const handleJobApplyClick = (job: PagingJobResponse) => {
    if (!isLogin) {
      const currentUrl = router.asPath || "/";
      window.location.href = getLink("MAIN", "/login") + "?next=" + encodeURIComponent(window.location.href);
      return;
    }

    setSelectedJobResponse(job);
    if (job.blurEffect) {
      setIsUnlockAllRemoteJobModalOpen(true);
      return;
    }

    applyJobMutation
      .mutateAsync(job.job?.id!)
      .then(() => {
        openJobDeliveryModal();
      })
      .catch((error) => {
        // 检查是否是重复申请错误
        const errorDetail = error?.detail || "";
        // 如果是重复申请错误（从 detail 或 message 中检查），不显示解锁Modal
        if (
          errorDetail.includes("重复申请") ||
          errorDetail.includes("已申请")
        ) {
          // 这里不需要额外处理，也不显示解锁Modal
          return;
        }

        // 其他错误才显示解锁Modal
        setIsUnlockAllRemoteJobModalOpen(true);
      });
  };

  const handleFavoriteClick = (jobId: number) => {
    favoriteJobMutation.mutate(jobId);
  };

  const handleRemoveFavoriteClick = (jobId: number) => {
    removeFavoriteJobMutation.mutate(jobId);
  };

  // 计算剩余岗位数量（总数量减去前两页的数量）
  const remainingJobsCount = useMemo(() => {
    const total = activeJobResponse?.total || 0;
    const pageSize = 10; // 每页显示10个岗位
    const firstTwoPagesCount = pageSize * 2; // 前两页共20个岗位
    return Math.max(0, total - firstTwoPagesCount);
  }, [activeJobResponse?.total]);

  // 处理分页变化，添加会员限制检查
  const handlePageChange = (page: number) => {
    // 允许访问，更新页面
    setCurrentPage(page);

    // 自动滚动到"发现精选工作机会"标签的上边框位置，无须动画
    // 获取所有带有 data-work-tabs 属性的元素
    const tabsElements = document.querySelectorAll("[data-work-tabs]");
    let tabsElement: Element | null = null;

    // 遍历所有元素，找到可见的元素
    for (let i = 0; i < tabsElements.length; i++) {
      const element = tabsElements[i];
      // 检查元素是否可见
      const style = window.getComputedStyle(element);
      if (style.display !== "none" && style.visibility !== "hidden") {
        tabsElement = element;
        break;
      }
    }

    if (tabsElement) {
      const rect = tabsElement.getBoundingClientRect();
      // 添加一个小的偏移量，确保滚动到 tabs 元素的上边框位置
      const offset = 80; // 可以根据需要调整这个值
      const scrollTop = window.pageYOffset + rect.top - offset;
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    } else {
      // 小/中屏时找不到 tabs 元素，尝试查找大屏的 JobFilterBar 元素
      const jobFilterBarElement = document.querySelector("[data-job-filter-bar]");
      if (jobFilterBarElement) {
        const rect = jobFilterBarElement.getBoundingClientRect();
        // 添加一个小的偏移量，确保滚动到 JobFilterBar 元素的上边框位置
        const offset = 80; // 可以根据需要调整这个值
        const scrollTop = window.pageYOffset + rect.top - offset;
        window.scrollTo({ top: scrollTop, behavior: "auto" });
      } else {
        // 如果找不到特定元素，滚动到页面顶部
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }
  };

  if (!mounted) {
    return (
      <Box bg="#F7F7F7" pb="30px">
        <Flex justifyContent="center" alignItems="center" height="80vh">
          <Spinner />
        </Flex>
      </Box>
    );
  }

  return (
    <Box bg="#F7F7F7" pb="30px">
      <Flex
        px={{ base: "16px", md: "70px" }}
        maxW="1200px"
        w="100%"
        mx="auto"
        flexDir="column"
      >
        {/* Header Banner */}
        <WorkPageHeaderBanner />

        {/* Company Logo Marquee - 大屏显示 */}
        <Box display={{ base: "none", lg: "block" }}>
          <MarqueeLogoScroller speed={52} />
        </Box>

        {/* Banner - 中小屏显示 */}
        <Flex
          display={{ base: "flex", md: "flex", lg: "none" }}
          w="100%"
          py={{ base: "32px", md: "40px" }}
          pb={{ base: "24px", md: "24px", lg: "40px" }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex
            direction="column"
            align="center"
            gap={{ base: "6px", md: "2px" }}
            mb={{ base: "8px", md: "12px" }}
          >
            <Text
              fontFamily="'Alibaba PuHuiTi 2.0', sans-serif"
              fontWeight="700"
              fontSize="clamp(20px, 6vw, 56px)"
              lineHeight="1.14em"
              letterSpacing="12%"
              color="#13172E"
              textAlign="center"
              maxW="100%"
              overflowWrap="break-word"
            >
              {`${t("oneStopSubscription")} ${t("globalBestRemoteJobs")}`}
            </Text>
          </Flex>

          <Flex
            display={{ base: "flex", md: "flex", lg: "none" }}
            gap="24px"
            mt="24px"
          >
            <Button
              variant="solid"
              bg="#13172E"
              borderRadius="29px"
              h="33px"
              minH="32px"
              px="18px"
              fontSize="12px"
              lineHeight="20px"
              color="#FFFFFF"
              fontWeight="normal"
              alignSelf="flex-start"
              aria-label="快速上手"
              tabIndex={0}
              onClick={() => window.location.href = getLink("MAIN", "/publish")}
            >
              {t("publishJob")}
            </Button>
            <Button
              variant="outline"
              borderColor="#13172E"
              borderRadius="29px"
              h="32px"
              minH="32px"
              px="18px"
              fontSize="12px"
              lineHeight="20px"
              color="#13172E"
              fontWeight="normal"
              alignSelf="flex-start"
              aria-label="快速上手"
              tabIndex={0}
              onClick={() =>
                window.location.href = getLink("MAIN", "/user") + "/resume/create"
              }
            >
              {t("joinTalentPool")}
            </Button>
          </Flex>
        </Flex>

        {/*  */}

        <Flex flexDirection="column" gap="24px">
          {/* 小屏顶部显示用户信息 */}
          <Box display={{ base: "block", md: "block", lg: "none" }}>
            {userInfo && (
              <Flex bg="white" borderRadius="xl" w="100%" shadow="sm" mb="16px">
                <Flex flexDir="column" w="100%">
                  <TalentCard
                    avatarUrl={userInfo.avatarUrl}
                    name={userInfo.displayName}
                    email={userInfo.email}
                    resume={resume}
                    userInfo={userInfo}
                    onJoinClick={() => {
                      window.location.href = getLink("MAIN", "/publish");
                    }}
                  />
                  <Box mx="32px" h="1px" bg="#F1F2F3" mt={"1"} mb="12px" />

                  {/* 贝壳数量和收藏岗位信息 */}
                  <Flex
                    mx="32px"
                    pb="25px"
                    pt="13px"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="24px"
                  >
                    <Flex alignItems="center" gap="4px">
                      <Text
                        fontFamily="'Source Han Sans CN', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        lineHeight="24px"
                        color="#13172E"
                      >
                        {communityInfos?.shellAccountAmount || 0}
                      </Text>
                      <Text
                        fontFamily="'Source Han Sans CN', sans-serif"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="22px"
                        color="#54555D"
                      >
                        {t("shellQuantity")}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      gap="4px"
                      cursor="pointer"
                      onClick={() => window.location.href = getLink("MAIN", "/user") + "?tab=favorite"}
                      _hover={{ opacity: 0.8 }}
                    >
                      <Text
                        fontFamily="'Source Han Sans CN', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        lineHeight="24px"
                        color="#13172E"
                      >
                        {favoriteJobsData?.total || 0}
                      </Text>
                      <Text
                        fontFamily="'Source Han Sans CN', sans-serif"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="22px"
                        color="#54555D"
                      >
                        {t("favoriteJobs")}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {/* 小屏顶部显示岗位定制表单 */}
            <Box display={{ base: "block", md: "block", lg: "none" }}>
              <Flex
                flexDirection={"column"}
                bg="white"
                borderRadius="xl"
                w="100%"
                shadow="sm"
              >
                <Box
                  mx="32px"
                  display={"flex"}
                  alignItems="center"
                  justifyContent="space-between"
                  py="24px"
                  onClick={toggleJobCustomCardVisibility}
                  cursor="pointer"
                >
                  <Text
                    fontSize="16px"
                    lineHeight="24px"
                    fontWeight="400"
                    color="#000"
                  >
                    {t("jobCustomization")}
                  </Text>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.4632 8.62751C18.8068 8.28393 18.9999 7.81789 19 7.33193C19.0001 6.84597 18.8071 6.37989 18.4635 6.03622C18.1199 5.69256 17.6539 5.49945 17.1679 5.49939C16.682 5.49933 16.2159 5.69232 15.8722 6.0359L7.19727 14.7129C7.04635 14.8634 6.93474 15.0487 6.87227 15.2525L6.01361 18.0813C5.99681 18.1375 5.99554 18.1973 6.00994 18.2541C6.02433 18.311 6.05386 18.3629 6.09538 18.4044C6.1369 18.4458 6.18886 18.4753 6.24576 18.4896C6.30266 18.5039 6.36237 18.5025 6.41856 18.4856L9.24804 17.6276C9.4516 17.5657 9.63685 17.4548 9.78754 17.3046L18.4632 8.62751Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8L16 10"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Collapse in={isJobCustomCardVisible} animateOpacity>
                  <JobCustomCard
                    isSubscribed={isSubscribed}
                    filterFormValues={filterFormValues}
                    onFilterFormValuesChange={setFilterFormValues}
                    userInfo={userInfo}
                    disabled={!!matchScoreFilter}
                  />
                </Collapse>
              </Flex>
            </Box>
          </Box>

          {/* JobFilterBar 组件 */}
          <Flex display={{ base: "none", md: "none", lg: "flex" }}>
            <JobFilterBar
              tab={tab}
              onTabChange={setTab}
              isSubscribed={isSubscribed}
              isLogin={isLogin}
              totalCount={total}
              readOnly={tab === "SUBSCRIBED" || tab === "FAVORITE" || matchScoreFilter === '100'}
              onFilterChange={handleFilterChange}
            />
          </Flex>
          {tab === "ALL" && (
            <Box display={{ base: "none", md: "none", lg: "block" }}>
              <MatchFilter
                jobCount={total}
                value={matchScoreFilter}
                onChange={setMatchScoreFilter}
              />
            </Box>
          )}
          {/* MatchFilter 只显示给会员 */}
          {tab === "SUBSCRIBED" && isValidMember && (
            <Box display={{ base: "none", md: "none", lg: "block" }}>
              <MatchFilter
                jobCount={total}
                isSubscribed={true}
                showMatchScore={false}
                filterFormValues={filterFormValues}
                onFilterFormValuesChange={setFilterFormValues}
                userInfo={userInfo}
              />
            </Box>
          )}

          <Flex
            gap={{ base: "16px", md: "20px", lg: "24px" }}
            flexDirection={{ base: "column", md: "column", lg: "row" }}
          >
            <Flex
              order={{ base: 1, md: 1, lg: 0 }}
              flex="1"
              flexDirection="column"
              gap="24px"
              minW={0}
              w={{ base: "100%", md: "100%", lg: "auto" }}
            >
              {/* 订阅岗位列表：未登录或非会员显示 MembershipPrompt */}
              {tab === "SUBSCRIBED" && (!isLogin || !isValidMember) ? (
                <Flex justifyContent="center" alignItems="center" py="60px">
                  <MembershipPrompt
                    message={!isLogin ? t('pleaseLoginToViewSubscribed') : t('subscriptionMemberOnly')}
                    primaryLabel={!isLogin ? t('loginNow') : t('upgradeMember')}
                    onPrimaryClick={() => {
                      if (!isLogin) {
                        window.location.href = getLink("MAIN", "/login") + "?next=" + encodeURIComponent(window.location.href);
                      } else {
                        window.location.href = getLink("MAIN", "/?scrollTo=membership");
                      }
                    }}
                  />
                </Flex>
              ) : activeIsLoading ? (
                <JobCardSkeleton count={3} />
              ) : list.length ? (
                list.map(
                  ({
                    job,
                    favoriteCount,
                    isFavorite,
                    isApply,
                    labels,
                    blurEffect,
                    matchScore,
                  }) => (
                    <WorkJobCard
                      key={job?.id}
                      job={job}
                      favoriteCount={favoriteCount}
                      isFavorite={isFavorite}
                      isApply={isApply}
                      labels={labels}
                      blurEffect={blurEffect}
                      score={matchScore}
                      statusLabel={
                        matchScore !== undefined
                          ? matchScore >= 80
                            ? t('veryMatched')
                            : matchScore >= 60
                            ? t('highlyMatched')
                            : t('normalMatch')
                          : undefined
                      }
                      buttonLabel={t('viewAnalysisDetails')}
                      onApplyClick={() => {
                        job &&
                          handleJobApplyClick({
                            job,
                            favoriteCount,
                            isFavorite,
                            isApply,
                            labels,
                            blurEffect,
                          });
                      }}
                      onFavoriteClick={() => {
                        job && handleFavoriteClick(job.id!);
                      }}
                      onRemoveFavoriteClick={() => {
                        job && handleRemoveFavoriteClick(job.id!);
                      }}
                    />
                  ),
                )
              ) : tab === "FAVORITE" ? (
                <Flex justifyContent="center" alignItems="center" py="60px">
                  <EmptyStateNoJobs titleLines={[t('emptyFavorite'), t('emptyFavoriteDesc')]} />
                </Flex>
              ) : tab === "APPLIED" ? (
                <Flex justifyContent="center" alignItems="center" py="60px">
                  <EmptyStateNoJobs titleLines={[t('opportunitiesWaitingForYou'), t('findJobYouLove')]} />
                </Flex>
              ) : tab === "SUBSCRIBED" ? (
                <Flex justifyContent="center" alignItems="center" py="60px">
                  <EmptyStateNoJobs />
                </Flex>
              ) : (
                <Flex justifyContent="center" alignItems="center" h="100px">
                  <Text>{t("noJobsFoundSubscribe")}</Text>
                </Flex>
              )}

              {/* 选择匹配度排序时不显示分页，收藏岗位为空时不显示分页，总页数为1时不显示分页，其他情况显示分页 */}
              {matchScoreFilter !== '100' && !(tab === "SUBSCRIBED" && !isValidMember) && !(tab === "FAVORITE" && list.length === 0) && Math.ceil((activeJobResponse?.total || 0) / 10) > 1 && (
                <Flex justifyContent="center">
                  <SimplePagination
                    justifyContent="center"
                    page={currentPage}
                    total={activeJobResponse?.total || 0}
                    mt={{ base: "40px", md: "40px", lg: "80px" }}
                    mb={{ base: "40px", md: "40px", lg: "80px" }}
                    onChange={(page) => {
                      handlePageChange(page);
                    }}
                  ></SimplePagination>
                </Flex>
              )}
            </Flex>
            {/* 小/中屏时在侧栏下方显示 tabs 和 加入人才库 */}
            <Flex
              mt="0px"
              px={{ base: "0", md: "0", lg: "0" }}
              display={{ base: "flex", md: "flex", lg: "none" }}
              justifyContent="space-between"
              data-work-tabs
            >
              <Flex gap={4} alignItems="center">
                {tabs.map((item) => (
                  <Text
                    key={item.value}
                    fontSize="14px"
                    lineHeight={"22px"}
                    fontWeight={item.value === tab ? "700" : "400"}
                    color={item.value === tab ? "#13172E" : "#9D9EA3"}
                    cursor="pointer"
                    borderBottom={
                      item.value === tab ? "2px solid #000" : "none"
                    }
                    p="8px"
                    onClick={() => {
                      setTab(item.value as "SUBSCRIBED" | "ALL" | "FAVORITE");
                    }}
                  >
                    {item.label}
                  </Text>
                ))}
              </Flex>
              {!isLogin ? (
                <Flex display={{ base: "none", md: "none" }}>
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
                    onClick={() => window.location.href = getLink("MAIN", "/user") + "/resume/create"}
                  >
                    加入人才库
                  </Button>
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <UnlockAllRemoteJobModal
        isOpen={isUnlockAllRemoteJobModalOpen}
        onClose={() => setIsUnlockAllRemoteJobModalOpen(false)}
      />

      {isLogin && shouldShowModal && (
        <UpdateResumeModal
          isOpen={shouldShowModal}
          onUpdate={handleUpdate}
        />
      )}

      {DeliveryModal}
    </Box>
  );
}
