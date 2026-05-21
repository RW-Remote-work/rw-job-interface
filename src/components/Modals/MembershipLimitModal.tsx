import React from 'react';
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
  Box,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface MembershipLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingJobsCount?: number;
}

/**
 * 会员限制弹窗组件
 * 当非会员用户尝试查看第三页及以后的岗位时显示
 */
export const MembershipLimitModal: React.FC<MembershipLimitModalProps> = ({
  isOpen,
  onClose,
  remainingJobsCount = 800,
}) => {
  const router = useRouter();

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
              探索更多精选岗位！
            </Text>
            
            <Text
              fontSize="14px"
              lineHeight="1.5714285714285714em"
              fontWeight="400"
              color="#84858B"
              fontFamily="Source Han Sans CN"
            >
              为保障社区资源公平分配，免费会员每日可浏览前2页精选岗位
            </Text>
            
            <Text
              fontSize="14px"
              lineHeight="1.5714285714285714em"
              fontWeight="400"
              color="#5A6CD8"
              fontFamily="Source Han Sans CN"
            >
              还剩余{remainingJobsCount}个远程岗位待查看
            </Text>
          </Flex>
        </ModalBody>

        {/* 按钮区域 */}
        <ModalFooter
          p="8px 64px 20px"
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Button
            variant="outline"
            borderColor="#13172E"
            borderRadius="29px"
            height="40px"
            px="20px"
            fontSize="14px"
            fontWeight="500"
            color="#13172E"
            lineHeight="1.1428571428571428em"
            fontFamily="Source Han Sans CN"
            flex="1"
            onClick={handleLater}
          >
            稍后再说
          </Button>
          
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

export default MembershipLimitModal;
