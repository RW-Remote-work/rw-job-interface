import React, { useState, useEffect, useRef } from 'react';
import { BaseModal, BaseModalProps } from './BaseModal';
import { Box, Text, Image, VStack, HStack } from '@chakra-ui/react';
import QRCode from 'qrcode';
import api from '@/api';

export interface PaymentModalProps extends Omit<BaseModalProps, 'title' | 'onOk'> {
    /** 二维码URL */
    qrCodeUrl?: any; // 支付接口返回的二维码，类型为object
    /** 订单过期时间 */
    expireTime?: any; // 支付接口返回的过期时间，类型为object
    /** 订单号 */
    orderSn?: string;
    /** 支付金额 */
    amount?: number;
    /** 交易类型 */
    tradeType?: "ORDER" | "BUY_SHELL" | "BUY_MEMBERSHIP" | "BUY_RECOMMEND_JOB" | "debugger";
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    qrCodeUrl,
    expireTime,
    orderSn,
    amount,
    tradeType = "BUY_MEMBERSHIP",
    onCancel,
    ...otherProps
}) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const [qrCodeError, setQrCodeError] = useState<string>('');
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isPollingRef = useRef<boolean>(false);

    // 生成二维码
    useEffect(() => {
        const generateQRCode = async () => {
            console.log('PaymentModal useEffect 触发，qrCodeUrl:', qrCodeUrl);
            if (!qrCodeUrl) {
                console.log('qrCodeUrl为空或undefined');
                setQrCodeError('二维码数据为空');
                return;
            }

            try {
                // 提取二维码URL字符串
                let codeUrl = '';
                console.log('qrCodeUrl原始数据:', qrCodeUrl);
                
                if (typeof qrCodeUrl === 'string') {
                    codeUrl = qrCodeUrl;
                } else if (qrCodeUrl && typeof qrCodeUrl === 'object') {
                    // 如果是对象，尝试获取code_url字段
                    codeUrl = qrCodeUrl.code_url || qrCodeUrl.codeUrl || qrCodeUrl.url || qrCodeUrl.qrCode || '';
                    console.log('提取的codeUrl:', codeUrl);
                }
                
                // 如果还是没有找到，尝试解析JSON字符串
                if (!codeUrl && typeof qrCodeUrl === 'string') {
                    try {
                        const parsed = JSON.parse(qrCodeUrl);
                        codeUrl = parsed.code_url || parsed.codeUrl || parsed.url || parsed.qrCode || '';
                    } catch (e) {
                        // 如果解析失败，直接使用原字符串
                        codeUrl = qrCodeUrl;
                    }
                }

                if (!codeUrl) {
                    setQrCodeError('无法提取二维码URL');
                    return;
                }

                // 生成二维码
                const dataUrl = await QRCode.toDataURL(codeUrl, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                setQrCodeDataUrl(dataUrl);
                setQrCodeError('');
            } catch (error) {
                console.error('生成二维码失败:', error);
                setQrCodeError('生成二维码失败');
            }
        };

        generateQRCode();
    }, [qrCodeUrl]);

    // 轮询查询支付状态
    useEffect(() => {
        const queryPaymentStatus = async () => {
            if (!orderSn || !tradeType) {
                return;
            }

            try {
                console.log('查询支付状态:', { tradeType, orderSn });
                const result = await api.payment.query(tradeType, orderSn);
                console.log('支付状态查询结果:', result);

                if (result === 'SUCCESS') {
                    // 支付成功，停止轮询，关闭弹窗，刷新页面
                    console.log('支付成功，准备关闭弹窗并刷新页面');
                    stopPolling();
                    onCancel?.(); // 关闭弹窗
                    // 延迟一下再刷新，确保弹窗先关闭
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else if (result === 'CLOSED') {
                    // 支付已关闭或超时，停止轮询
                    console.log('支付已关闭或超时');
                    stopPolling();
                    setQrCodeError('支付已取消或超时');
                }
                // 对于 'NOTPAY' 状态，继续轮询
            } catch (error) {
                console.error('查询支付状态失败:', error);
                // 查询失败不停止轮询，继续尝试
            }
        };

        const startPolling = () => {
            if (!orderSn || !tradeType) {
                console.log('缺少订单号或交易类型，无法开始轮询');
                return;
            }

            console.log('开始轮询支付状态');
            isPollingRef.current = true;
            
            // 立即执行一次查询
            queryPaymentStatus();
            
            // 每3秒轮询一次
            pollingIntervalRef.current = setInterval(queryPaymentStatus, 3000);
        };

        const stopPolling = () => {
            console.log('停止轮询支付状态');
            isPollingRef.current = false;
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };

        // 当Modal打开、二维码生成成功且有订单号时开始轮询
        if (otherProps.isOpen && qrCodeDataUrl && orderSn && tradeType && !qrCodeError) {
            startPolling();
        } else {
            // Modal关闭时停止轮询
            stopPolling();
        }

        // 清理函数
        return () => {
            stopPolling();
        };
    }, [otherProps.isOpen, qrCodeDataUrl, orderSn, tradeType, qrCodeError, onCancel]);

    // 组件卸载时清理轮询
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);
    return (
        <BaseModal
            title="扫码支付"
            onCancel={onCancel}
            footer={null}
            {...otherProps}
        >
            <VStack spacing={4} align="center" py={4}>
                {/* 支付信息 */}
                <VStack spacing={2}>
                    {orderSn && (
                        <Text fontSize="sm" color="gray.600">
                            订单号：{orderSn}
                        </Text>
                    )}
                    {amount && (
                        <Text fontSize="lg" fontWeight="bold" color="blue.600">
                            支付金额：¥{amount}
                        </Text>
                    )}
                </VStack>



                {/* 二维码区域 */}
                <Box textAlign="center" mb={6}>
                    {qrCodeError ? (
                        <Box
                            width="200px"
                            height="200px"
                            mx="auto"
                            border="1px solid"
                            borderColor="red.200"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="red.50"
                        >
                            <Text color="red.500" fontSize="xs" textAlign="center">
                                {qrCodeError}
                            </Text>
                        </Box>
                    ) : qrCodeDataUrl ? (
                        <Box>
                            <Text mb={2} fontSize="sm" color="gray.600">
                                请使用微信扫描二维码完成支付
                            </Text>
                            <Image
                                src={qrCodeDataUrl}
                                alt="支付二维码"
                                width="200px"
                                height="200px"
                                mx="auto"
                                border="1px solid"
                                borderColor="gray.200"
                            />
                            {/* 购买提醒 */}
                            <Text 
                                mt={3} 
                                fontSize="xs" 
                                color="red.500" 
                                textAlign="center"
                                lineHeight="1.4"
                                fontWeight="500"
                            >
                                *该商品为虚拟服务，购买成功后概不退款，敬请谅解<br />
                                *如果其他疑问，可与小助手Dora咨询后再购买
                            </Text>
                        </Box>
                    ) : (
                        <Box
                            width="200px"
                            height="200px"
                            mx="auto"
                            border="1px solid"
                            borderColor="gray.200"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="gray.50"
                        >
                            <Text color="gray.500">二维码生成中...</Text>
                        </Box>
                    )}
                </Box>

                {/* 支付提示 */}
                <Text fontSize="sm" color="gray.500" textAlign="center">
                    支付完成后，窗口将自动关闭，页面将自动刷新，若未刷新请手动刷新
                </Text>
            </VStack>
        </BaseModal>
    );
};
