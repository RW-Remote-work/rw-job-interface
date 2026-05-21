import React, { useState, useEffect } from 'react';
import { BaseModal, BaseModalProps } from './BaseModal';
import { 
    Box, 
    Text, 
    VStack, 
    HStack, 
    Flex, 
    Image, 
    Radio, 
    RadioGroup,
    useToast,
    Spinner,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import api from '@/api';
import { PagingPaymentMethodResponse } from '@/__generated__/RwInterfaceApi';

export interface PaymentMethodModalProps extends Omit<BaseModalProps, 'title' | 'onOk'> {
    /** 订单信息 */
    orderSn?: string;
    /** 支付金额 */
    amount?: number;
    /** 订单ID */
    orderId?: number;
    /** 选择支付方式后的回调 */
    onPaymentMethodSelect?: (paymentMethod: PagingPaymentMethodResponse, orderInfo: { orderSn: string; amount: number; orderId?: number }) => Promise<void>;
    /** 重置支付处理状态的回调 */
    onResetPaymentState?: () => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
    orderSn,
    amount,
    orderId,
    onPaymentMethodSelect,
    onCancel,
    ...otherProps
}) => {
    const [paymentMethods, setPaymentMethods] = useState<PagingPaymentMethodResponse[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [error, setError] = useState<string>('');
    const toast = useToast();

    // 重置支付处理状态
    const resetPaymentState = () => {
        setIsProcessingPayment(false);
    };

    // 暴露重置方法到父组件
    useEffect(() => {
        if (otherProps.isOpen) {
            // Modal打开时重置状态
            setIsProcessingPayment(false);
        }
    }, [otherProps.isOpen]);

    // 获取支付方式列表
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            if (!otherProps.isOpen) return;
            
            setIsLoading(true);
            setError('');
            
            try {
                const methods = await api.payment.methods({
                    methodName: undefined // 查询所有支付方式
                });
                
                console.log('获取到的支付方式:', methods);
                
                if (methods && methods.length > 0) {
                    setPaymentMethods(methods);
                    // 默认选中第一个支付方式
                    setSelectedMethod(methods[0].pluginId || '');
                } else {
                    setError('暂无可用的支付方式');
                }
            } catch (err) {
                console.error('获取支付方式失败:', err);
                setError('获取支付方式失败，请稍后重试');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentMethods();
    }, [otherProps.isOpen]);

    // 处理支付方式选择
    const handleConfirm = async () => {
        if (!selectedMethod) {
            toast({
                title: "请选择支付方式",
                status: "warning",
                duration: 2000,
            });
            return;
        }

        if (!orderSn || !amount) {
            toast({
                title: "订单信息不完整",
                status: "error",
                duration: 2000,
            });
            return;
        }

        const selectedPaymentMethod = paymentMethods.find(method => method.pluginId === selectedMethod);
        
        if (selectedPaymentMethod) {
            setIsProcessingPayment(true);
            try {
                await onPaymentMethodSelect?.(selectedPaymentMethod, {
                    orderSn,
                    amount,
                    orderId
                });
            } catch (error) {
                console.error('支付处理失败:', error);
                setIsProcessingPayment(false);
            }
        }
    };

    // 渲染支付方式选项
    const renderPaymentMethodItem = (method: PagingPaymentMethodResponse) => {
        const isSelected = selectedMethod === method.pluginId;
        
        return (
            <Box
                key={method.pluginId}
                p={4}
                border="1px solid"
                borderColor={isSelected ? "blue.500" : "gray.200"}
                borderRadius="8px"
                cursor="pointer"
                bg={isSelected ? "blue.50" : "white"}
                _hover={{ borderColor: "blue.300" }}
                onClick={() => setSelectedMethod(method.pluginId || '')}
            >
                <HStack spacing={3}>
                    <Radio
                        value={method.pluginId || ''}
                        isChecked={isSelected}
                        colorScheme="blue"
                    />
                    
                    {/* 支付方式图标 */}
                    {method.image && (
                        <Image
                            src={method.image}
                            alt={method.methodName}
                            width="32px"
                            height="32px"
                            objectFit="contain"
                        />
                    )}
                    
                    {/* 支付方式名称 */}
                    <Text
                        fontSize="16px"
                        fontWeight={isSelected ? "600" : "400"}
                        color={isSelected ? "blue.600" : "gray.800"}
                    >
                        {method.methodName || method.pluginId}
                    </Text>
                </HStack>
            </Box>
        );
    };

    return (
        <BaseModal
            title="选择支付方式"
            onOk={handleConfirm}
            onCancel={onCancel}
            okText="确认支付"
            cancelText="取消"
            isOkLoading={isLoading || isProcessingPayment}
            {...otherProps}
        >
            <VStack spacing={4} align="stretch">
                {/* 订单信息 - 已隐藏 */}
                {/* 
                {orderSn && amount && (
                    <Box p={4} bg="gray.50" borderRadius="8px">
                        <VStack spacing={2} align="start">
                            <Text fontSize="sm" color="gray.600">
                                订单号：{orderSn}
                            </Text>
                            <Text fontSize="lg" fontWeight="bold" color="blue.600">
                                支付金额：¥{amount}
                            </Text>
                        </VStack>
                    </Box>
                )}
                */}

                {/* 加载状态 */}
                {isLoading && (
                    <Flex justify="center" align="center" py={8}>
                        <Spinner size="lg" color="blue.500" />
                        <Text ml={3} color="gray.600">加载支付方式中...</Text>
                    </Flex>
                )}

                {/* 错误状态 */}
                {error && (
                    <Alert status="error" borderRadius="8px">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {/* 支付方式列表 */}
                {!isLoading && !error && paymentMethods.length > 0 && (
                    <Box>
                        <Text fontSize="16px" fontWeight="600" mb={3} color="gray.800">
                            请选择支付方式：
                        </Text>
                        
                        <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                            <VStack spacing={3} align="stretch">
                                {paymentMethods.map(renderPaymentMethodItem)}
                            </VStack>
                        </RadioGroup>
                    </Box>
                )}

                {/* 无支付方式时的提示 */}
                {!isLoading && !error && paymentMethods.length === 0 && (
                    <Box textAlign="center" py={8}>
                        <Text color="gray.500">暂无可用的支付方式</Text>
                    </Box>
                )}
            </VStack>
        </BaseModal>
    );
};
