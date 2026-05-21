import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useJobList } from '@/pages/data';

interface UnlockAllRemoteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 解锁所有远程岗位弹窗组件
 */
export const UnlockAllRemoteJobModal: React.FC<UnlockAllRemoteJobModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const { data: workListResponse, refetch: refetchWorkList } = useJobList({
    page: 1,
    size: 1,
  }, 'unlock-modal', {}, {
    refetchOnWindowFocus: true, // 启用窗口焦点时自动刷新，解决跨窗口数据同步问题
    refetchOnMount: false,
    keepPreviousData: false,
  })

  const total = workListResponse?.total || 0

  useEffect(() => {
    refetchWorkList()
  }, [refetchWorkList, isOpen])
  
  const handleUnlockMembership = () => {
    onClose();
    // 跳转到会员介绍组件，与Header的Be pro按钮逻辑保持一致
    if (router.pathname === '/') {
      // 如果在首页，直接滚动到会员介绍组件
      if (typeof document !== 'undefined') {
        const membershipSection = document.getElementById('membership-section');
        if (membershipSection) {
          membershipSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    } else {
      // 如果不在首页，跳转到首页并携带滚动参数
      if (typeof window !== 'undefined') {
        window.location.href = '/?scrollTo=membership';
      }
    }
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay bg="rgba(0, 0, 0, 0.25)" />
      <ModalContent
        borderRadius="16px"
        bg="white"
        maxWidth="640px"
        mx="auto"
        boxShadow="0px 4px 16px 0px rgba(0, 0, 0, 0.25)"
      >
        {/* 头部 */}
        <ModalHeader
          p="4px 20px"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          borderRadius="16px 16px 0px 0px"
          minHeight="62px"
        >
          <IconButton
            aria-label="关闭弹窗"
            icon={<CloseIcon />}
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </ModalHeader>



        {/* 内容区域 */}
        <ModalBody p="4px 36px" textAlign="center">
          <Flex direction="column" align="center" gap="2px" mb="16px">
            <Text
              fontSize="20px"
              lineHeight="1.4em"
              fontWeight="700"
              color="#000000"
              fontFamily="Source Han Sans CN"
            >
              解锁全部远程岗位
            </Text>
            
            <Text
              fontSize="14px"
              lineHeight="1.5714285714285714em"
              fontWeight="400"
              color="#84858B"
              fontFamily="Source Han Sans CN"
            >
              - 为保障社区资源公平分配，当前岗位详情和投递方式需要升级会员解锁
            </Text>
            
            <Text
              fontSize="14px"
              lineHeight="1.5714285714285714em"
              fontWeight="400"
              color="#5A6CD8"
              fontFamily="Source Han Sans CN"
            >
              升级后可查看{total}个远程岗位信息
            </Text>
          </Flex>
        </ModalBody>

        {/* 按钮区域 */}
        <ModalFooter
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Button
            bg="#13172E"
            borderRadius="29px"
            height="40px"
            px="20px"
            fontSize="14px"
            fontWeight="500"
            color="white"
            lineHeight="1.1428571428571428em"
            fontFamily="Source Han Sans CN"
            flex="1"
            _hover={{ bg: "#2A2F45" }}
            _active={{ bg: "#1A1E35" }}
            onClick={handleUnlockMembership}
          >
            立即解锁无限机会
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnlockAllRemoteJobModal;
