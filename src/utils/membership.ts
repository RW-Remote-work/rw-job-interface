import { GetUserProfileResponse } from "@/__generated__/RwInterfaceApi";
import { TFunction } from "i18next";

/**
 * 会员类型枚举
 */
export enum MembershipType {
  /** 基础会员（超级个体） */
  BASIC = "SuperIndividual",
  /** 高级会员（全球游民） */
  PREMIUM = "GlobalNomad",
}

/**
 * 会员权限功能枚举
 */
export enum MembershipFeature {
  /** 远程工作高级筛选功能 */
  ADVANCED_JOB_FILTER = "advanced_job_filter",
  /** 最新岗位信息邮件通知 */
  JOB_EMAIL_NOTIFICATION = "job_email_notification",
  /** 岗位匹配度功能 */
  JOB_MATCH_SCORE = "job_match_score",
  /** 旅居指南（life vacation会员） */
  TRAVEL_GUIDE_PREMIUM = "travel_guide_premium",
  /** 个人IP曝光 */
  PERSONAL_IP_EXPOSURE = "personal_ip_exposure",
  /** 社区周边 */
  COMMUNITY_MERCHANDISE = "community_merchandise",
  /** 参与社区运营共创 */
  COMMUNITY_CO_CREATION = "community_co_creation",
  /** 社区内测产品资格 */
  BETA_PRODUCT_ACCESS = "beta_product_access",
  /** 每月闭门分享会 */
  MONTHLY_EXCLUSIVE_SHARING = "monthly_exclusive_sharing",
  /** RW推广大使特权 */
  RW_AMBASSADOR_PRIVILEGES = "rw_ambassador_privileges",
  /** 合作产品内测资格 */
  PARTNER_PRODUCT_BETA_TESTING = "partner_product_beta_testing",
  /** 旅居指南（免费版） */
  TRAVEL_GUIDE_FREE = "travel_guide_free",
}

/**
 * 会员功能权限映射
 */
const MEMBERSHIP_FEATURES: Record<MembershipType, MembershipFeature[]> = {
  [MembershipType.BASIC]: [
    MembershipFeature.ADVANCED_JOB_FILTER,
    MembershipFeature.JOB_EMAIL_NOTIFICATION,
    MembershipFeature.JOB_MATCH_SCORE,
    MembershipFeature.COMMUNITY_MERCHANDISE,
    MembershipFeature.COMMUNITY_CO_CREATION,
    MembershipFeature.BETA_PRODUCT_ACCESS,
    MembershipFeature.MONTHLY_EXCLUSIVE_SHARING,
    MembershipFeature.RW_AMBASSADOR_PRIVILEGES,
    MembershipFeature.PARTNER_PRODUCT_BETA_TESTING,
    MembershipFeature.TRAVEL_GUIDE_FREE,
  ],
  [MembershipType.PREMIUM]: [
    MembershipFeature.ADVANCED_JOB_FILTER,
    MembershipFeature.JOB_EMAIL_NOTIFICATION,
    MembershipFeature.JOB_MATCH_SCORE,
    MembershipFeature.TRAVEL_GUIDE_PREMIUM,
    MembershipFeature.PERSONAL_IP_EXPOSURE,
    MembershipFeature.COMMUNITY_MERCHANDISE,
    MembershipFeature.COMMUNITY_CO_CREATION,
    MembershipFeature.BETA_PRODUCT_ACCESS,
    MembershipFeature.MONTHLY_EXCLUSIVE_SHARING,
    MembershipFeature.RW_AMBASSADOR_PRIVILEGES,
    MembershipFeature.PARTNER_PRODUCT_BETA_TESTING,
    MembershipFeature.TRAVEL_GUIDE_FREE,
  ],
};

/**
 * 检查会员是否过期
 * @param membershipEndTime 会员结束时间
 * @returns 是否过期
 */
export function isMembershipExpired(membershipEndTime?: string): boolean {
  if (!membershipEndTime) return true;
  
  try {
    const endTime = new Date(membershipEndTime);
    const currentTime = new Date();
    return endTime <= currentTime;
  } catch (error) {
    console.error('解析会员结束时间失败:', error);
    return true;
  }
}

/**
 * 检查用户是否为会员
 * @param userProfile 用户信息
 * @returns 是否为会员
 */
export function isMember(userProfile?: GetUserProfileResponse): boolean {
  return !!userProfile?.membershipType;
}

/**
 * 检查用户是否为有效会员（未过期）
 * @param userProfile 用户信息
 * @returns 是否为有效会员
 */
export function isValidMember(userProfile?: GetUserProfileResponse): boolean {
  if (!isMember(userProfile)) return false;
  return !isMembershipExpired(userProfile?.membershipEndTime);
}

/**
 * 检查用户是否为基础会员
 * @param userProfile 用户信息
 * @returns 是否为基础会员
 */
export function isBasicMember(userProfile?: GetUserProfileResponse): boolean {
  return userProfile?.membershipType === MembershipType.BASIC;
}

/**
 * 检查用户是否为高级会员
 * @param userProfile 用户信息
 * @returns 是否为高级会员
 */
export function isPremiumMember(userProfile?: GetUserProfileResponse): boolean {
  return userProfile?.membershipType === MembershipType.PREMIUM;
}

/**
 * 获取会员剩余天数
 * @param membershipEndTime 会员结束时间
 * @returns 剩余天数，如果已过期返回0
 */
export function getMembershipRemainingDays(membershipEndTime?: string): number {
  if (!membershipEndTime) return 0;
  
  try {
    const endTime = new Date(membershipEndTime);
    const currentTime = new Date();
    const diffTime = endTime.getTime() - currentTime.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  } catch (error) {
    console.error('计算会员剩余天数失败:', error);
    return 0;
  }
}

/**
 * 检查用户是否有特定功能权限
 * @param userProfile 用户信息
 * @param feature 功能特性
 * @returns 是否有权限
 */
export function hasFeatureAccess(
  userProfile?: GetUserProfileResponse,
  feature?: MembershipFeature
): boolean {
  if (!feature) return false;
  
  // 如果不是有效会员，只能访问免费功能
  if (!isValidMember(userProfile)) {
    return feature === MembershipFeature.TRAVEL_GUIDE_FREE;
  }

  const membershipType = userProfile?.membershipType as MembershipType;
  const allowedFeatures = MEMBERSHIP_FEATURES[membershipType] || [];
  return allowedFeatures.includes(feature);
}

/**
 * 获取用户可访问的所有功能
 * @param userProfile 用户信息
 * @returns 可访问的功能列表
 */
export function getUserFeatures(userProfile?: GetUserProfileResponse): MembershipFeature[] {
  if (!isValidMember(userProfile)) {
    return [MembershipFeature.TRAVEL_GUIDE_FREE];
  }

  const membershipType = userProfile?.membershipType as MembershipType;
  return MEMBERSHIP_FEATURES[membershipType] || [];
}

/**
 * 获取会员状态信息
 * @param userProfile 用户信息
 * @returns 会员状态详细信息
 */
export function getMembershipStatus(userProfile?: GetUserProfileResponse) {
  const isUserMember = isMember(userProfile);
  const isUserValidMember = isValidMember(userProfile);
  const isUserBasicMember = isBasicMember(userProfile);
  const isUserPremiumMember = isPremiumMember(userProfile);
  const remainingDays = getMembershipRemainingDays(userProfile?.membershipEndTime);
  const isExpired = isMembershipExpired(userProfile?.membershipEndTime);
  const userFeatures = getUserFeatures(userProfile);

  return {
    // 基础状态
    isMember: isUserMember,
    isValidMember: isUserValidMember,
    isBasicMember: isUserBasicMember,
    isPremiumMember: isUserPremiumMember,
    isExpired,
    
    // 时间信息
    membershipStartTime: userProfile?.membershipStartTime,
    membershipEndTime: userProfile?.membershipEndTime,
    remainingDays,
    
    // 权限信息
    membershipType: userProfile?.membershipType,
    features: userFeatures,
    
    // 工具方法
    hasFeature: (feature: MembershipFeature) => hasFeatureAccess(userProfile, feature),
  };
}

/**
 * 格式化会员到期时间显示
 * @param membershipEndTime 会员结束时间
 * @param t 翻译函数
 * @returns 格式化的时间字符串
 */
export function formatMembershipEndTime(membershipEndTime?: string, t?: TFunction): string {
  if (!membershipEndTime) {
    const result = t ? t('membershipNotActivated') : "未开通会员";
    if (t && result === 'membershipNotActivated') return "未开通会员";
    return result;
  }

  try {
    const endTime = new Date(membershipEndTime);
    const currentTime = new Date();

    if (endTime <= currentTime) {
      const result = t ? t('membershipExpired') : "会员已过期";
      if (t && result === 'membershipExpired') return "会员已过期";
      return result;
    }

    const remainingDays = getMembershipRemainingDays(membershipEndTime);

    if (remainingDays <= 7) {
      const result = t
        ? t('membershipExpiringSoon', { days: remainingDays })
        : `会员还剩 ${remainingDays} 天到期`;
      if (t && result === 'membershipExpiringSoon') return `会员还剩 ${remainingDays} 天到期`;
      return result;
    }

    const formattedDate = `${endTime.getFullYear()}-${String(endTime.getMonth() + 1).padStart(2, '0')}-${String(endTime.getDate()).padStart(2, '0')}`;
    
    // Check if t is available and if the translation key exists
    if (t) {
      const translated = t('membershipEndTime', { date: formattedDate });
      // If translation returns the key itself (not loaded), use fallback
      if (translated === 'membershipEndTime') {
        return `会员到期时间：${formattedDate}`;
      }
      return translated;
    }
    return `会员到期时间：${formattedDate}`;
  } catch (error) {
    console.error('Formatting membership end time failed:', error);
    return t ? t('membershipNotActivated') : "时间格式错误";
  }
}
