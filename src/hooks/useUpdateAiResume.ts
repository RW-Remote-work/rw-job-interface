import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBreakpointValue } from '@chakra-ui/react';
import { ResumeResponse } from '@/api';

interface UseUpdateAiResumeReturn {
  shouldShowModal: boolean;
  handleUpdate: () => void;
  isInitialized: boolean;
}

interface UseUpdateAiResumeProps {
  resume?: ResumeResponse | null | undefined;
}

export const useUpdateAiResume = ({
  resume,
}: UseUpdateAiResumeProps): UseUpdateAiResumeReturn => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // 只在大屏(lg)模式显示弹窗
  const isLg = useBreakpointValue({ lg: true, base: false }) ?? false;

  // 检查是否需要显示 Modal
  useEffect(() => {
    // 非大屏模式不显示弹窗
    if (!isLg) {
      setShouldShowModal(false);
      return;
    }

    // 等待简历数据加载完成（undefined 表示数据还在加载中）
    if (resume === undefined) {
      return;
    }

    // 数据已加载，标记为已初始化
    setIsInitialized(true);
    
    // 简化逻辑：有简历不弹窗，无简历弹窗
    if (resume?.id) {
      // 有简历，不显示弹窗
      setShouldShowModal(false);
    } else {
      // 无简历，显示弹窗
      setShouldShowModal(true);
    }
  }, [resume, isLg]);

  // 点击"立即更新"：关闭 Modal，根据是否有简历跳转到对应页面
  const handleUpdate = useCallback(() => {
    setShouldShowModal(false);
    // 如果有简历，进入更新页面；否则进入创建页面
    if (resume?.id) {
      router.push('/user/resume/edit');
    } else {
      router.push('/user/resume/create');
    }
  }, [resume, router]);

  return {
    shouldShowModal,
    handleUpdate,
    isInitialized,
  };
};
