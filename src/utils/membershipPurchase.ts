import api from '@/api';
import { BuyMemberShipRequest, PagingMemberShipPackageResponse } from '@/__generated__/RwInterfaceApi';

/**
 * 会员购买相关的通用工具函数
 */

/**
 * 根据套餐ID获取套餐信息（已废弃，直接通过购买接口验证套餐存在性）
 * @deprecated 不再需要预先查询套餐信息，直接通过购买接口的错误响应判断套餐是否存在
 * @param packageId 套餐ID
 * @returns 套餐信息，如果不存在返回null
 */
export async function getMembershipPackageById(packageId: number): Promise<PagingMemberShipPackageResponse | null> {
  // 此函数已废弃，保留是为了向后兼容
  console.warn('getMembershipPackageById 已废弃，建议直接通过购买接口验证套餐存在性');
  return null;
}

/**
 * 验证输入是否为有效的套餐ID（15位数字）
 * @param input 用户输入
 * @returns 是否为有效套餐ID
 */
export function isValidPackageId(input: string): boolean {
  // 检查是否为15位数字
  return /^\d{15}$/.test(input.trim());
}

/**
 * 验证输入是否为有效的兑换码（18位）
 * @param input 用户输入
 * @returns 是否为有效兑换码
 */
export function isValidRedeemCode(input: string): boolean {
  // 检查是否为18位字符串（可能包含字母和数字）
  return /^.{18}$/.test(input.trim());
}

/**
 * 获取输入类型
 * @param input 用户输入
 * @returns 输入类型：'package' | 'redeem' | 'invalid'
 */
export function getInputType(input: string): 'package' | 'redeem' | 'invalid' {
  const trimmedInput = input.trim();
  
  if (isValidPackageId(trimmedInput)) {
    return 'package';
  }
  
  if (isValidRedeemCode(trimmedInput)) {
    return 'redeem';
  }
  
  return 'invalid';
}

/**
 * 创建会员订单（购买套餐）
 * 直接调用购买接口，如果套餐不存在或不可用，接口会返回相应错误
 * @param packageId 套餐ID
 * @param currencyId 币种ID，默认为1（人民币）
 * @returns 订单信息
 */
export async function createMembershipOrder(packageId: number) {
  try {
    const buyRequest: BuyMemberShipRequest = {
      packageId
    };

    return await api.memberShip.buyMemberShipPackage(buyRequest);
  } catch (error: any) {
    // 根据API错误响应判断具体错误类型
    const errorMessage = error?.response?.data?.message || error?.message || '';
    
    if (errorMessage.includes('套餐不存在') || errorMessage.includes('Package not found') || error?.response?.status === 404) {
      throw new MembershipPurchaseException(
        MembershipPurchaseError.PACKAGE_NOT_FOUND,
        '套餐不存在，请检查套餐ID是否正确',
        error
      );
    }
    
    if (errorMessage.includes('套餐已停用') || errorMessage.includes('Package inactive') || errorMessage.includes('不可用')) {
      throw new MembershipPurchaseException(
        MembershipPurchaseError.PACKAGE_INACTIVE,
        '该套餐已停用，无法购买',
        error
      );
    }
    
    if (error?.code === 'NETWORK_ERROR' || error?.response?.status === 0) {
      throw new MembershipPurchaseException(
        MembershipPurchaseError.NETWORK_ERROR,
        '网络连接失败，请稍后重试',
        error
      );
    }
    
    // 其他未知错误
    throw new MembershipPurchaseException(
      MembershipPurchaseError.UNKNOWN_ERROR,
      errorMessage || '创建订单失败，请稍后重试',
      error
    );
  }
}

/**
 * 兑换会员码
 * @param code 兑换码
 * @returns 兑换结果
 */
export async function redeemMembershipCode(code: string) {
  return await api.memberShip.useMembershipRedeemCode({ code });
}

/**
 * 会员购买错误类型
 */
export enum MembershipPurchaseError {
  PACKAGE_NOT_FOUND = 'PACKAGE_NOT_FOUND',
  PACKAGE_INACTIVE = 'PACKAGE_INACTIVE',
  INVALID_INPUT = 'INVALID_INPUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * 会员购买异常类
 */
export class MembershipPurchaseException extends Error {
  constructor(
    public readonly errorType: MembershipPurchaseError,
    message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'MembershipPurchaseException';
  }
}

/**
 * 获取友好的错误消息
 * @param error 错误对象
 * @returns 用户友好的错误消息
 */
export function getFriendlyErrorMessage(error: any): string {
  if (error instanceof MembershipPurchaseException) {
    switch (error.errorType) {
      case MembershipPurchaseError.PACKAGE_NOT_FOUND:
        return '套餐不存在，请检查套餐ID是否正确';
      case MembershipPurchaseError.PACKAGE_INACTIVE:
        return '该套餐已停用，无法购买';
      case MembershipPurchaseError.INVALID_INPUT:
        return '输入格式无效，请输入15位套餐ID或18位兑换码';
      case MembershipPurchaseError.NETWORK_ERROR:
        return '网络连接失败，请稍后重试';
      default:
        return '操作失败，请稍后重试';
    }
  }

  // 处理API返回的错误消息
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  return '操作失败，请稍后重试';
}
