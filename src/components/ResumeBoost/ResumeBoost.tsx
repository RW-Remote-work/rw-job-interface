import React, { useCallback, useRef, useState } from 'react';
import { Box, BoxProps, Button, Flex, Text, Spinner } from '@chakra-ui/react';
import { useGlobalContext } from '@/components/GlobalProvider/useGlobalContext';
import SidebarModal from '@/components/SidebarModal';
import AIProfileMatch from '@/components/AIProfileMatch';
import { useResumeOptimize, setOptimizeState } from '@/hooks/useResumeOptimize';

export type ResumeBoostProps = BoxProps & {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  resumeUrl?: string;
  onClick?: () => void;
  /** 岗位 ID，用于打开 AI 匹配侧边栏 */
  jobId?: number;
  /** 岗位名称 */
  jobName?: string;
};

const ResumeBoost: React.FC<ResumeBoostProps> = ({
  title = '最大限度提高你的简历通过率',
  subtitle = '',
  buttonLabel = '生成定制化简历',
  resumeUrl: initialResumeUrl,
  onClick,
  jobId,
  jobName,
}) => {
  // 使用全局状态管理优化状态
  const optimizeState = useResumeOptimize(jobId);
  
  // 初始简历 URL 优先，如果全局状态中有则使用全局状态的
  const resumeUrl = optimizeState.resumeUrl || initialResumeUrl;
  const isGenerated = !!resumeUrl;
  const isOptimizing = optimizeState.isLoading;
  
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
      // 成功状态会在获取到简历 URL 后更新
      setOptimizeState(jobId, { status: 'success' });
    } else if (status === 'error') {
      setOptimizeState(jobId, { status: 'error' });
    }
  }, [jobId]);

  // 渲染 AI 匹配侧边栏
  const renderSidebar = useCallback(() => {
    const sidebar = render(
      <SidebarModal
        key={sidebarKey}
        isOpen={true}
        onClose={() => clearRef.current?.()}
        title="AI 匹配分析详情"
        width="939px"
        showMask={true}
        showFooter={false}
      >
        <div style={{ padding: '0 24px' }}>
          <AIProfileMatch
            jobId={jobId}
            position={jobName}
            onOptimizeStatusChange={handleOptimizeStatusChange}
          />
        </div>
      </SidebarModal>
    );
    return sidebar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, jobId, jobName, sidebarKey, handleOptimizeStatusChange]);

  const handleClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else if (jobId) {
      // 打开 AI 匹配侧边栏
      clearRef.current = renderSidebar();
    } else if (onClick) {
      onClick();
    }
  };

  // 根据状态确定按钮文案和样式
  const getButtonContent = () => {
    if (isOptimizing) {
      return (
        <>
          <Spinner size="xs" mr="6px" />
          简历优化中...
        </>
      );
    }
    if (isGenerated) {
      return '查看定制化简历';
    }
    return buttonLabel;
  };

  return (
    <Box
      mx="0"
      my="35px"
      alignItems="center"
      justifyContent="space-between"
      backgroundImage={'linear-gradient(90deg, rgba(207,243,225,1) 0%, rgba(160,232,195,1) 100%)'}
      borderRadius="48px"
      padding="8px 8px 8px 24px"
      gap="302px"
      width="100%"
      display="flex"
      cursor={isGenerated ? 'pointer' : 'default'}
      onClick={handleClick}
    >
      <Flex gap="8px" align="center">
        <Text
          fontSize="18px"
          fontWeight={700}
          lineHeight="1.4444"
          color="#13172E"
        >
          🚀
        </Text>
        <Flex direction="column">
          <Text fontSize="14px" fontWeight={500} color="#13172E">
            {isOptimizing ? '正在为您生成定制化简历，请稍候...' : 
             isGenerated ? '已生成定制化简历，快去投递吧！' : title}
          </Text>
          {isOptimizing ? (
            <Text fontSize="12px" color="rgba(0,0,0,0.6)">优化完成后会自动更新</Text>
          ) : isGenerated ? (
            <Text fontSize="12px" color="rgba(0,0,0,0.6)">准备好你的定制化简历</Text>
          ) : (
            subtitle ? <Text fontSize="12px" color="rgba(0,0,0,0.6)">{subtitle}</Text> : null
          )}
        </Flex>
      </Flex>

      <Button
        height="32px"
        borderRadius="29px"
        paddingX="16px"
        bg="#FFFFFF"
        color="#13172E"
        _hover={{ bg: '#f3f3f3' }}
        fontSize="12px"
        fontWeight={500}
      >
        {/* leading icon approximation */}
        <Box as="span" display="inline-flex" width="16px" height="16px" mr="8px">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.47436 4.88184C7.80726 4.03782 9.00163 4.03799 9.33471 4.88184L9.48803 5.26954C9.89461 6.30043 10.711 7.11687 11.7419 7.52344L12.1296 7.67579C12.9738 8.00871 12.9737 9.20416 12.1296 9.53712L11.7419 9.68946C10.711 10.096 9.89461 10.9125 9.48803 11.9434L9.33471 12.3311C9.00171 13.1751 7.80727 13.1752 7.47436 12.3311L7.32201 11.9434C6.91544 10.9125 6.099 10.096 5.06811 9.68946L4.68041 9.53712C3.83627 9.20419 3.83627 8.00871 4.68041 7.67579L5.06811 7.52344C6.099 7.11687 6.91544 6.30043 7.32201 5.26954L7.47436 4.88184ZM3.78197 0.738288C3.88185 0.485044 4.24069 0.485044 4.34057 0.738288L4.59643 1.3877C4.62693 1.46493 4.68813 1.52616 4.76537 1.55665L5.41479 1.81251C5.66803 1.91238 5.66803 2.27122 5.41479 2.3711L4.76537 2.62696C4.68812 2.65747 4.62691 2.71863 4.59643 2.79591L4.34057 3.44532C4.24069 3.69856 3.88185 3.69856 3.78197 3.44532L3.52611 2.79591C3.49563 2.71863 3.43443 2.65746 3.35717 2.62696L2.70776 2.3711C2.45451 2.27122 2.45451 1.91238 2.70776 1.81251L3.35717 1.55665C3.43442 1.52617 3.49561 1.46494 3.52611 1.3877L3.78197 0.738288Z" fill="#152124"/>
          </svg>
        </Box>
        {getButtonContent()}
      </Button>
    </Box>
  );
};

export default ResumeBoost;
