import React, { useState, useEffect, useRef } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import api from '@/api';

interface PayPalPaymentResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
  orderSn: string;
  tradeType?: "ORDER" | "BUY_SHELL" | "BUY_MEMBERSHIP" | "BUY_RECOMMEND_JOB" | "debugger";
}

/**
 * PayPal支付结果确认模态框组件
 * 用户在新标签页完成PayPal支付后，通过此Modal确认支付结果
 */
export const PayPalPaymentResultModal: React.FC<PayPalPaymentResultModalProps> = ({
  isOpen,
  onClose,
  paymentUrl,
  orderSn,
  tradeType = "BUY_MEMBERSHIP",
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'NOTPAY' | 'SUCCESS' | 'CLOSED' | 'REFUND' | null>(null);
  const toast = useToast();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef<boolean>(false);

  // 轮询查询支付状态
  useEffect(() => {
    const queryPaymentStatus = async () => {
      if (!orderSn || !tradeType) {
        return;
      }

      try {
        console.log('PayPal轮询查询支付状态:', { tradeType, orderSn });
        const result = await api.payment.query(tradeType, orderSn);
        console.log('PayPal支付状态查询结果:', result);

        setPaymentStatus(result);

        if (result === 'SUCCESS') {
          // 支付成功，停止轮询，关闭弹窗，刷新页面
          console.log('PayPal支付成功，准备关闭弹窗并刷新页面');
          stopPolling();
          onClose(); // 关闭弹窗
          // 延迟一下再刷新，确保弹窗先关闭
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else if (result === 'CLOSED') {
          // 支付已关闭或超时，停止轮询
          console.log('PayPal支付已关闭或超时');
          stopPolling();
          setPaymentStatus('CLOSED');
        }
        // 对于 'NOTPAY' 状态，继续轮询
      } catch (error) {
        console.error('PayPal查询支付状态失败:', error);
        // 查询失败不停止轮询，继续尝试
      }
    };

    const startPolling = () => {
      if (!orderSn || !tradeType) {
        console.log('PayPal缺少订单号或交易类型，无法开始轮询');
        return;
      }

      console.log('PayPal开始轮询支付状态');
      isPollingRef.current = true;
      
      // 立即执行一次查询
      queryPaymentStatus();
      
      // 每3秒轮询一次
      pollingIntervalRef.current = setInterval(queryPaymentStatus, 3000);
    };

    const stopPolling = () => {
      console.log('PayPal停止轮询支付状态');
      isPollingRef.current = false;
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };

    // 当Modal打开且有订单号时开始轮询
    if (isOpen && orderSn && tradeType) {
      startPolling();
    } else {
      // Modal关闭时停止轮询
      stopPolling();
    }

    // 清理函数
    return () => {
      stopPolling();
    };
  }, [isOpen, orderSn, tradeType, onClose]);

  // 组件卸载时清理轮询
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handlePaymentSuccess = async () => {
    // 如果支付状态已经是成功，直接返回
    if (paymentStatus === 'SUCCESS') {
      return;
    }

    setIsChecking(true);
    try {
      console.log('手动检查PayPal支付状态:', { tradeType, orderSn });
      const result = await api.payment.query(tradeType, orderSn);
      console.log('PayPal支付状态查询结果:', result);

      if (result === 'SUCCESS') {
        // 支付成功，关闭Modal并刷新页面
        console.log('PayPal支付成功，准备刷新页面');
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        // 支付未完成，询问用户是否取消
        setIsChecking(false);
        const shouldRetry = window.confirm('支付未完成，是否取消支付？\n\n点击"确定"取消支付\n点击"取消"重新打开PayPal支付页面');
        
        if (shouldRetry) {
          // 用户选择取消支付
          onClose();
        } else {
          // 用户选择重新支付，再次打开PayPal URL
          window.open(paymentUrl, '_blank');
        }
      }
    } catch (error) {
      console.error('查询PayPal支付状态失败:', error);
      setIsChecking(false);
      toast({
        title: "查询支付状态失败",
        description: "您还没有完成支付，请完成支付后重试，或点击 取消 结束支付",
        status: "error",
        duration: 8000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" closeOnOverlayClick={false}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.25)" />
      <ModalContent
        borderRadius="16px"
        bg="white"
        maxWidth="480px"
        mx="auto"
      >
        <ModalHeader
          borderBottom="1px solid"
          borderColor="gray.100"
          p="24px"
          fontSize="18px"
          fontWeight="600"
          color="gray.800"
          fontFamily="Source Han Sans CN, sans-serif"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          PayPal支付确认
          <IconButton
            aria-label="关闭"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={onClose}
            _hover={{ bg: "gray.100" }}
          />
        </ModalHeader>

        <ModalBody p="24px">
          <Flex direction="column" gap="16px" align="center">
            {/* PayPal图标 */}
            <Box
              w="60px"
              h="60px"
              borderRadius="12px"
              bg="blue.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="24px" fontWeight="bold" color="blue.500">
                PP
              </Text>
            </Box>

            {/* 支付完成提示 */}
            <Text
              fontSize="16px"
              fontWeight="500"
              color="gray.800"
              textAlign="center"
              fontFamily="Source Han Sans CN, sans-serif"
              lineHeight="1.5"
            >
              PayPal支付页面已打开
            </Text>
            
            <Text
              fontSize="14px"
              fontWeight="400"
              color="gray.600"
              textAlign="center"
              fontFamily="Source Han Sans CN, sans-serif"
              lineHeight="1.5"
            >
              如果您已在新标签页中完成PayPal支付，请点击下方&ldquo;支付成功&rdquo;按钮。点击后页面将自动刷新。
            </Text>

            <Text
              fontSize="12px"
              fontWeight="400"
              color="gray.500"
              textAlign="center"
              fontFamily="Source Han Sans CN, sans-serif"
              lineHeight="1.4"
            >
              如果PayPal支付页面没有打开，请点击&ldquo;取消&rdquo;按钮重新尝试。
            </Text>
          </Flex>
        </ModalBody>

        {/* 按钮区域 */}
        <ModalFooter
          borderTop="1px solid"
          borderColor="gray.100"
          p="24px"
          gap="12px"
        >
          <Button
            onClick={onClose}
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            _hover={{
              borderColor: "gray.400",
              bg: "gray.50"
            }}
            height="40px"
            fontSize="14px"
            fontWeight="500"
            fontFamily="Source Han Sans CN, sans-serif"
            flex="1"
            isDisabled={isChecking}
          >
            取消
          </Button>
          
          <Button
            onClick={handlePaymentSuccess}
            bg={paymentStatus === 'SUCCESS' ? "green.500" : "green.500"}
            color="white"
            _hover={{
              bg: paymentStatus === 'SUCCESS' ? "green.600" : "green.600"
            }}
            _disabled={{
              bg: paymentStatus === 'SUCCESS' ? "green.500" : "gray.400",
              color: paymentStatus === 'SUCCESS' ? "white" : "gray.600",
              opacity: paymentStatus === 'SUCCESS' ? 1 : 0.6,
              cursor: paymentStatus === 'SUCCESS' ? "default" : "not-allowed"
            }}
            height="40px"
            fontSize="14px"
            fontWeight="500"
            fontFamily="Source Han Sans CN, sans-serif"
            flex="1"
            isLoading={isChecking}
            loadingText="检查中..."
            isDisabled={paymentStatus === 'SUCCESS'}
          >
            {paymentStatus === 'SUCCESS' ? '支付已完成' : '支付成功'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
