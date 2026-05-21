import React, { useState } from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/api';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { BaseModal } from '@/components/Modal/BaseModal';
import { usePaymentModal, usePaymentMethodModal } from '@/components/Modal';
import { useConfirmModal } from '@/components/Modal/useConfirmModal';
import { useUser } from '@/hooks/useUser';
import {
  getInputType,
  createMembershipOrder,
  redeemMembershipCode,
  getFriendlyErrorMessage,
  MembershipPurchaseError,
  MembershipPurchaseException
} from '@/utils/membershipPurchase';

// 控制是否跳过支付方式选择Modal，直接使用微信支付
const SKIP_PAYMENT_METHOD_SELECTION = true;

export const MembershipRedeem = NiceModal.create(() => {
  const modal = useModal();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const toast = useToast();

  // 获取用户信息
  const [{ userProfile, isLogin }] = useUser();

  // 使用与首页相同的支付Modal Hook
  const paymentModal = usePaymentModal();
  const paymentMethodModal = usePaymentMethodModal();
  const confirmModal = useConfirmModal();

  // 查询待支付订单
  const { data: pendingOrdersData } = useQuery({
    queryKey: ['pendingOrders', userProfile?.id],
    queryFn: () => {
      if (!userProfile?.id) return null;
      console.log('兑换码页面-查询待支付订单，用户ID:', userProfile.id, 'status: NOTPAY');
      return api.memberShip.pagingMemberShipOrders({
        orderQueryRequest: {
          userId: userProfile.id,
          status: 'NOTPAY' as const
        },
        page: 0,
        size: 1
      });
    },
    enabled: isLogin && !!userProfile?.id,
    onSuccess: (data) => {
      if (data?.records && data.records.length > 0) {
        const order = data.records[0];
        console.log('兑换码页面-发现待支付订单:', order);
        setPendingOrder(order);
      } else {
        setPendingOrder(null);
      }
    }
  });

  // 发起支付的函数（复制自首页）
  const initiatePayment = async (orderInfo: { orderSn: string; amount: number; orderId?: number }, paymentPluginId?: string) => {
    try {
      // 根据支付方式设置币种ID：PayPal使用美元(2)，其他使用人民币(1)
      const currencyId = paymentPluginId === 'PayPalPlugin' ? 2 : 1;
      
      const payRequest = {
        sn: orderInfo.orderSn,
        tradeType: 'BUY_MEMBERSHIP' as const,
        clientType: 'PC' as const,
        payMode: 'normal' as const,
        paymentPluginId: paymentPluginId || 'WechatPayPlugin',
        currencyId: currencyId
      };
      
      const payResponse = await api.payment.pay(payRequest);
      console.log('支付发起成功:', payResponse);
      console.log('payResponse中的price字段:', (payResponse as any).price);
      
      // 根据支付方式处理不同的响应
      if (paymentPluginId === 'PayPalPlugin') {
        // PayPal支付：处理跳转逻辑
        const paymentUrl = (payResponse as any).url;
        if (paymentUrl) {
          console.log('PayPal支付URL:', paymentUrl);
          // 简化处理：直接打开支付页面
          window.open(paymentUrl, '_blank');
          // 关闭支付方式选择Modal
          paymentMethodModal.hide();
          // 关闭兑换Modal
          modal.hide();
          toast({
            title: '支付页面已打开',
            description: '请在新标签页完成PayPal支付',
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error('PayPal支付响应中缺少URL字段');
          throw new Error('PayPal支付URL缺失');
        }
      } else {
        // 微信支付等其他方式：显示二维码Modal
        console.log('payResponse.qrCode:', payResponse.qrCode);
        
        // 使用 toPay 接口返回的价格，如果没有则回退到订单金额
        const paymentAmount = (payResponse as any).price || orderInfo.amount;
        console.log('支付金额 - toPay接口返回:', (payResponse as any).price, '订单金额:', orderInfo.amount, '最终使用:', paymentAmount);
        
        // 显示支付Modal
        paymentModal.show({
          qrCodeUrl: payResponse.code_url,
          orderSn: orderInfo.orderSn,
          amount: paymentAmount, // 使用 toPay 接口返回的价格
          expireTime: payResponse.time_expire
        });
        
        // 关闭兑换Modal，让用户专注于支付流程
        modal.hide();
      }
    } catch (error) {
      console.error('发起支付失败:', error);
      toast({
        title: '支付失败',
        description: getFriendlyErrorMessage(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 显示支付方式选择Modal的函数（复制自首页）
  const showPaymentMethodSelection = async (order: any) => {
    if (!order || !order.orderSn || !order.price) {
      console.error('订单信息不完整');
      return;
    }

    // 如果开启了跳过支付方式选择，直接使用微信支付
    if (SKIP_PAYMENT_METHOD_SELECTION) {
      console.log('跳过支付方式选择，直接使用微信支付');
      const orderInfo = {
        orderSn: order.orderSn,
        amount: order.price,
        orderId: order.id
      };
      
      // 直接发起微信支付
      await initiatePayment(orderInfo, 'WechatPayPlugin');
      return;
    }

    // 显示支付方式选择Modal
    paymentMethodModal.show({
      orderSn: order.orderSn,
      amount: order.price,
      orderId: order.id,
      onPaymentMethodSelect: async (paymentMethod: any, orderInfo: any) => {
        console.log('用户选择的支付方式:', paymentMethod);
        console.log('订单信息:', orderInfo);
        
        // 发起支付
        await initiatePayment(orderInfo, paymentMethod.pluginId);
        
        // 对于非PayPal支付，关闭支付方式选择Modal
        if (paymentMethod.pluginId !== 'PayPalPlugin') {
          paymentMethodModal.hide();
        }
      }
    });
  };

  // 套餐购买Mutation
  const packagePurchaseMutation = useMutation({
    mutationFn: async (packageId: number) => {
      // 先检查是否有待支付订单
      if (pendingOrder) {
        // 如果待支付订单的packageId与当前输入的packageId一致，则返回待支付订单
        if (pendingOrder.packageId === packageId) {
          console.log('兑换码页面-发现相同packageId的待支付订单，packageId:', packageId);
          // 显示确认对话框
          const result = await confirmModal.show({
            title: t("homePage.paymentReminder.title"),
            content: t("homePage.paymentReminder.content"),
            description: t("homePage.paymentReminder.description")
          });
          
          if (result) {
            // 用户选择继续支付，返回待支付订单信息
            return pendingOrder;
          } else {
            // 用户取消，抛出异常停止流程
            throw new Error('用户取消支付');
          }
        } else {
          // packageId不一致，创建新订单
          console.log('兑换码页面-待支付订单packageId不一致，创建新订单。待支付订单packageId:', pendingOrder.packageId, '当前packageId:', packageId);
          return await createMembershipOrder(packageId);
        }
      } else {
        // 没有待支付订单，直接创建新订单
        console.log('兑换码页面-没有待支付订单，创建新订单，packageId:', packageId);
        return await createMembershipOrder(packageId);
      }
    },
    onSuccess: async (orderResponse) => {
      toast({
        title: '订单准备完成',
        description: '正在跳转到支付页面...',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // 使用统一的支付方式选择流程
      if (orderResponse.orderSn && orderResponse.price) {
        // 使用新的 showPaymentMethodSelection 函数
        await showPaymentMethodSelection(orderResponse);
      } else {
        toast({
          title: '订单信息不完整',
          description: '无法发起支付',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: '购买失败',
        description: getFriendlyErrorMessage(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsError(true);
      setErrorMessage(getFriendlyErrorMessage(error));
    },
  });

  // 兑换码兑换Mutation
  const redeemMutation = useMutation({
    mutationFn: (code: string) => redeemMembershipCode(code),
    onSuccess: () => {
      toast({
        title: '兑换成功',
        description: '会员兑换码已成功使用！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setInputValue('');
      setIsError(false);
      setErrorMessage('');
      modal.hide();
    },
    onError: (error: any) => {
      const message = getFriendlyErrorMessage(error);
      toast({
        title: '兑换失败',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsError(true);
      setErrorMessage(message);
    },
  });

  const handleSubmit = () => {
    const trimmedInput = inputValue.trim();
    
    if (!trimmedInput) {
      setIsError(true);
      setErrorMessage('请输入兑换码');
      return;
    }

    const inputType = getInputType(trimmedInput);
    
    switch (inputType) {
      case 'package':
        // 15位套餐ID，走购买流程
        const packageId = parseInt(trimmedInput, 10);
        packagePurchaseMutation.mutate(packageId);
        break;
        
      case 'redeem':
        // 18位兑换码，走兑换流程
        redeemMutation.mutate(trimmedInput);
        break;
        
      default:
        setIsError(true);
        setErrorMessage('请输入有效的兑换码');
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (isError) {
      setIsError(false);
      setErrorMessage('');
    }
  };

  const isLoading = packagePurchaseMutation.isLoading || redeemMutation.isLoading;

  return (
    <BaseModal
      isOpen={modal.visible}
      afterClose={() => modal.remove()}
      onCancel={() => modal.hide()}
      bodyProps={{
        p: '0px'
      }}
      footer={null}
      title="会员兑换"
      overlayClosable={false}
    >
      <Flex padding="40px" flexDirection="column" width="100%">
        <FormControl isInvalid={isError} marginBottom="24px">
          <FormLabel fontSize="14px" fontWeight="400" color="gray.700">
            请输入兑换码
          </FormLabel>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="请输入会员兑换码"
            size="lg"
            borderRadius="8px"
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px #3182ce',
            }}
          />
          {isError && (
            <FormErrorMessage>
              {errorMessage || '请输入有效的兑换码'}
            </FormErrorMessage>
          )}
        </FormControl>
        
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="处理中..."
          width="100%"
          height="48px"
          backgroundColor="black"
          color="white"
          borderRadius="8px"
          fontSize="16px"
          fontWeight="500"
          _hover={{
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
          _disabled={{
            backgroundColor: 'gray.400',
            cursor: 'not-allowed',
          }}
        >
          立即兑换
        </Button>
        
        <Text
          marginTop="16px"
          fontSize="12px"
          color="gray.500"
          textAlign="center"
          lineHeight="18px"
        >
          兑换码仅限一次性使用，请确保输入正确
        </Text>
      </Flex>
    </BaseModal>
  );
});
