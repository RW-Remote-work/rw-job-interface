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

interface PayPalPaymentNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  paymentUrl: string;
}

/**
 * PayPal支付提示模态框组件
 * 提示用户将在新标签页打开PayPal支付页面
 */
export const PayPalPaymentNoticeModal: React.FC<PayPalPaymentNoticeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  paymentUrl,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
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
          PayPal支付提示
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
            {/* PayPal图标或说明 */}
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

            {/* 提示文字 */}
            <Text
              fontSize="16px"
              fontWeight="500"
              color="gray.800"
              textAlign="center"
              fontFamily="Source Han Sans CN, sans-serif"
              lineHeight="1.5"
            >
              即将跳转到PayPal支付页面
            </Text>
            
            <Text
              fontSize="14px"
              fontWeight="400"
              color="gray.600"
              textAlign="center"
              fontFamily="Source Han Sans CN, sans-serif"
              lineHeight="1.5"
            >
              系统将在新标签页打开PayPal官方支付页面，请在新页面中完成支付操作。完成支付后，请返回此页面查看订单状态。
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
          >
            取消
          </Button>
          
          <Button
            onClick={handleConfirm}
            bg="blue.500"
            color="white"
            _hover={{
              bg: "blue.600"
            }}
            height="40px"
            fontSize="14px"
            fontWeight="500"
            fontFamily="Source Han Sans CN, sans-serif"
            flex="1"
          >
            继续支付
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
