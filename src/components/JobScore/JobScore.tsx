import { Box, Flex, Text, Button } from "@chakra-ui/react";
import React, { useRef, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/components/GlobalProvider/useGlobalContext";
import SidebarModal from "@/components/SidebarModal";
import AIProfileMatch from "@/components/AIProfileMatch";
import { setOptimizeState } from "@/hooks/useResumeOptimize";
import styles from "./JobScore.module.css";

export type JobScoreProps = {
  /** 按钮文案，若不传则不显示 */
  buttonLabel?: string;
  score?: number; // 0 - 100
  max?: number;
  isLoading?: boolean;
  disabled?: boolean;
  /** 用户是否已登录 */
  isLoggedIn?: boolean;
  /** 解锁按钮点击事件 */
  onUnlock?: () => void;
  fullWidth?: boolean;
  /** 查看分析按钮点击事件 */
  onViewAnalysis?: () => void;
  /** 岗位 ID，用于获取匹配详情 */
  jobId?: number;
  /** 岗位名称 */
  position?: string;
};

const JobScore: React.FC<JobScoreProps> = ({
  buttonLabel = "",
  score,
  max = 100,
  isLoading = false,
  disabled = false,
  isLoggedIn = true,
  onUnlock,
  fullWidth = false,
  onViewAnalysis,
  jobId,
  position,
}) => {
  const { t } = useTranslation();
  const isScoreNull = score === null || score === undefined;
  const percent = isScoreNull ? 0 : Math.max(0, Math.min(100, Math.round((score / max) * 100)));

  const computedStatusLabel = (() => {
    if (isScoreNull) {
      return t('notMatched');
    }
    if (percent >= 80) {
      return t('perfectMatch');
    } else if (percent >= 60) {
      return t('highlyMatched');
    } else if (percent >= 40) {
      return t('partialMatch');
    } else if (percent >= 20) {
      return t('potentialMatch');
    } else {
      return t('noMatch');
    }
  })();

  const { render } = useGlobalContext();
  const clearRef = useRef<(() => void) | null>(null);
  // 用于强制重新渲染侧边栏的 key
  const [sidebarKey, setSidebarKey] = useState(0);

  // 处理来自 AIProfileMatch 的优化状态变化
  const handleOptimizeStatusChange = useCallback((status: 'idle' | 'loading' | 'success' | 'error') => {
    if (!jobId) return;
    
    if (status === 'loading') {
      setOptimizeState(jobId, { status: 'loading' });
    } else if (status === 'success') {
      setOptimizeState(jobId, { status: 'success' });
    } else if (status === 'error') {
      setOptimizeState(jobId, { status: 'error' });
    }
  }, [jobId]);

  const renderSidebar = useCallback(() => {
    const sidebar = render(
      <SidebarModal
        key={sidebarKey}
        isOpen={true}
        onClose={() => clearRef.current?.()}
        title={t('aiMatchAnalysisDetails')}
        width="939px"
        showMask={true}
        showFooter={false}
      >
        <div className={styles.sidebarContent}>
          <div className={styles.matchDetailsContainer}>
            <AIProfileMatch
              jobId={jobId}
              position={position}
              matchScore={`${percent}%`}
              matchStatus={computedStatusLabel}
              onOptimizeStatusChange={handleOptimizeStatusChange}
            />
          </div>
        </div>
      </SidebarModal>
    );
    return sidebar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, jobId, position, percent, sidebarKey, handleOptimizeStatusChange]);

  const handleViewAnalysis = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewAnalysis) {
      onViewAnalysis();
      return;
    }
    clearRef.current = renderSidebar();
  }, [onViewAnalysis, renderSidebar]);

  const getBackgroundColor = () => {
    if (isScoreNull) {
      return "var(--color-beige-1000, rgba(237, 232, 223, 1))";
    }
    if (percent >= 80) {
      return "var(--color-purple-600, rgba(162, 174, 246, 1))";
    } else if (percent >= 60) {
      return "var(--color-green-600, rgba(184, 238, 210, 1))";
    } else {
      return "var(--color-beige-1000, rgba(237, 232, 223, 1))";
    }
  };

  // 未登录状态（显示 DO YOU MATCH?）
  if (!isLoggedIn) {
    return (
      <Flex
        direction="column"
        background="#F8F6F2"
        borderRadius="12px"
        padding="24px"
        gap="56px"
        opacity={disabled ? 0.5 : 1}
        height="100%"
        width={fullWidth ? "100%" : "280px"}
        justifyContent="space-between"
        alignSelf="stretch"
      >
        {/* 顶部内容 */}
        <Flex direction="column" gap="12px" alignSelf="stretch">
          {/* AI 图标和标题 */}
          <Flex align="center" gap="12px">
            <Flex direction="column" gap="2px">
              <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "4px" }}>
                  <path d="M14.9266 4.25177C15.3151 3.26693 16.7091 3.26693 17.0975 4.25177L19.5702 10.5203C20.0445 11.723 20.9964 12.6759 22.1991 13.1502L28.4686 15.6219C29.4534 16.0103 29.4532 17.4042 28.4686 17.7928L22.1991 20.2654C20.9965 20.7397 20.0446 21.6918 19.5702 22.8943L17.0975 29.1639C16.7091 30.1487 15.3151 30.1487 14.9266 29.1639L12.454 22.8943C11.9796 21.6918 11.0277 20.7397 9.82507 20.2654L3.55554 17.7928C2.57096 17.4042 2.5708 16.0103 3.55554 15.6219L9.82507 13.1502C11.0278 12.6759 11.9796 11.723 12.454 10.5203L14.9266 4.25177ZM4.82703 0.825989C4.94355 0.530538 5.36187 0.530538 5.47839 0.825989L6.55457 3.5545C6.59018 3.64457 6.66172 3.71623 6.75183 3.75177L9.48035 4.82697C9.7758 4.94349 9.7758 5.36181 9.48035 5.47833L6.75183 6.5545C6.66165 6.59007 6.59015 6.6616 6.55457 6.75177L5.47839 9.48029C5.36187 9.77574 4.94355 9.77574 4.82703 9.48029L3.75085 6.75177C3.71528 6.6618 3.64452 6.59009 3.55457 6.5545L0.825073 5.47833C0.530179 5.36158 0.530014 4.94355 0.825073 4.82697L3.55457 3.75177C3.64449 3.71623 3.71524 3.6444 3.75085 3.5545L4.82703 0.825989Z" fill="#6478F0"/>
                </svg>
              <Text
                fontFamily="Montserrat, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
                fontWeight={700}
                fontSize="20px"
                lineHeight="1.2"
                color="#13172E"
              >
                DO YOU MATCH?
              </Text>
              <Text
                fontFamily="Source Han Sans CN, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
                fontWeight={500}
                fontSize="14px"
                lineHeight="1.57"
                color="#13172E"
              >
                {t('uploadResumeToViewMatch')}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* 底部按钮 */}
        <Button
          height="32px"
          borderRadius="29px"
          fontWeight={500}
          fontSize="12px"
          px="16px"
          py="4px"
          bg="#13172E"
          color="#FFFFFF"
          border="1px solid #13172E"
          _hover={{ bg: "#2A2D45" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
          alignSelf="stretch"
          fontFamily="Source Han Sans CN, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
          onClick={onUnlock}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6777 5.84039C12.0108 4.99649 13.2051 4.9964 13.5381 5.84039L14.5508 8.40972C14.9573 9.44054 15.7739 10.2561 16.8047 10.6627L19.374 11.6763C20.2179 12.0093 20.2179 13.2037 19.374 13.5367L16.8047 14.5503C15.7739 14.9569 14.9573 15.7725 14.5508 16.8033L13.5381 19.3726C13.2052 20.2167 12.0107 20.2166 11.6777 19.3726L10.6641 16.8033C10.2575 15.7727 9.44172 14.9569 8.41113 14.5503L5.8418 13.5367C4.99764 13.2038 4.99764 12.0092 5.8418 11.6763L8.41113 10.6627C9.44173 10.256 10.2575 9.44036 10.6641 8.40972L11.6777 5.84039ZM5.81348 3.70757C5.9134 3.45447 6.27116 3.45448 6.37109 3.70757L6.91895 5.09624C6.94945 5.17347 7.01065 5.23471 7.08789 5.26519L8.47656 5.81304C8.72959 5.91301 8.72963 6.27074 8.47656 6.37066L7.08789 6.91851C7.01064 6.94902 6.94942 7.01019 6.91895 7.08746L6.37109 8.47613C6.27109 8.72897 5.91347 8.72898 5.81348 8.47613L5.26562 7.08746C5.23514 7.01017 5.17395 6.94902 5.09668 6.91851L3.70801 6.37066C3.45499 6.27073 3.45503 5.91302 3.70801 5.81304L5.09668 5.26519C5.17393 5.23471 5.23511 5.17348 5.26562 5.09624L5.81348 3.70757Z" fill="#FFFFFF"/>
          </svg>
          {t('unlockAIAnalysis')}
        </Button>
      </Flex>
    );
  }

  // 已登录状态组件
  return (
    <Flex
      direction="column"
      background={getBackgroundColor()}
      borderRadius="12px"
      padding="12px 24px 8px"
      gap="56px"
      opacity={disabled ? 0.5 : 1}
      height="100%"
      width={fullWidth ? "100%" : "260px"}
      justifyContent="space-between" // Follow Figma's layout spec
      alignSelf="stretch" // Follow Figma's layout spec
    >
      {/* Top row: status label + optional button */}
      <Flex align="center" justify="space-between">
        <Text
          fontFamily="Alibaba PuHuiTi 2.0, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
          fontWeight={700}
          fontSize="20px"
          lineHeight="1.4"
          color="#13172E"
        >
          {computedStatusLabel}
        </Text>

            {!isScoreNull && (
              <Button
                height="32px"
                borderRadius="29px"
                fontWeight={500}
                fontSize="12px"
                px="12px"
                py="4px"
                bg="transparent"
                color="#13172E"
                _hover={{ bg: "rgba(0,0,0,0.04)" }}
                display="flex"
                alignItems="center"
                gap="2px"
                minW="0"
                mr="-18px"
                fontFamily="Source Han Sans CN, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
                onClick={handleViewAnalysis}
              >
                <Flex
                  py="5px"
                  alignItems="center"
                  gap="2px"
                >
                  {t('viewAnalysisDetails')}
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.4905 4.90236C11.5138 5.02002 11.4946 5.14437 11.4326 5.25098L11.4322 5.25151C11.4171 5.27751 11.3996 5.30202 11.3802 5.32477L11.3799 5.3252L8.37988 8.8252C8.20024 9.03478 7.88447 9.05937 7.6748 8.87988C7.46522 8.70024 7.44063 8.38447 7.62012 8.17481L9.91315 5.50001H1.5C1.22386 5.50001 1 5.27615 1 5.00001C1 4.72387 1.22386 4.50001 1.5 4.50001H9.91317L7.62012 1.8252C7.44063 1.61553 7.46522 1.29976 7.6748 1.12012C7.88447 0.940631 8.20024 0.965222 8.37988 1.17481L11.3799 4.6748C11.4177 4.71893 11.4465 4.76799 11.4665 4.81967C11.4768 4.84621 11.4848 4.87385 11.4905 4.90236Z" fill="#13172E"/>
                  </svg>
                </Flex>
              </Button>
            )}
      </Flex>

      {/* Large score - fixed width to prevent layout shift */}
      <Flex flex="1" alignItems="flex-end">
        <Text
          fontFamily="Montserrat, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
          fontWeight={700}
          fontSize="64px"
          lineHeight="1.125"
          letterSpacing="6.25%"
          color="#13172E"
          textAlign="left"
          mb="0"
          minW="145px" // Fixed width to accommodate "100%" or loading state
        >
          {isLoading ? "—" : (isScoreNull ? "?%" : `${percent}%`)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default JobScore;
