import { useMemo } from "react";
import { TFunction } from "i18next";
import { GetUserProfileResponse } from "@/__generated__/RwInterfaceApi";
import {
  getMembershipStatus,
  MembershipFeature,
  hasFeatureAccess,
  isMembershipExpired,
  getMembershipRemainingDays,
  formatMembershipEndTime,
} from "@/utils/membership";
import { useUserSelector } from "./useUser";

/**
 * 会员状态 Hook
 * @param userProfile 用户信息，如果不传则使用当前登录用户信息
 * @param t 翻译函数
 * @returns 会员状态和相关工具方法
 */
export function useMembership(userProfile?: GetUserProfileResponse, t?: TFunction) {
  // 如果没有传入用户信息，则使用当前登录用户的信息
  const { userProfile: currentUserProfile } = useUserSelector();
  const profile = userProfile || currentUserProfile;

  // 使用 useMemo 缓存计算结果，避免不必要的重新计算
  const membershipStatus = useMemo(() => {
    return getMembershipStatus(profile || undefined);
  }, [profile]);

  // 计算会员过期警告状态
  const expireWarning = useMemo(() => {
    if (!membershipStatus.isValidMember) return null;

    const remainingDays = membershipStatus.remainingDays;

    if (remainingDays <= 3) {
      const message = t
        ? t('membershipExpiringSoon', { days: remainingDays })
        : `会员将在 ${remainingDays} 天后过期`;
      // Check if translation returned the key itself
      if (t && message === 'membershipExpiringSoon') {
        return {
          level: 'critical' as const,
          message: `会员将在 ${remainingDays} 天后过期`,
          color: '#E53E3E',
        };
      }
      return {
        level: 'critical' as const,
        message,
        color: '#E53E3E',
      };
    } else if (remainingDays <= 7) {
      const message = t
        ? t('membershipExpiringSoon', { days: remainingDays })
        : `会员将在 ${remainingDays} 天后过期`;
      // Check if translation returned the key itself
      if (t && message === 'membershipExpiringSoon') {
        return {
          level: 'warning' as const,
          message: `会员将在 ${remainingDays} 天后过期`,
          color: '#D69E2E',
        };
      }
      return {
        level: 'warning' as const,
        message,
        color: '#D69E2E',
      };
    }

    return null;
  }, [membershipStatus.isValidMember, membershipStatus.remainingDays, t]);

  // 格式化显示文本
  const displayTexts = useMemo(() => {
    return {
      membershipType: membershipStatus.isPremiumMember
        ? '高级会员'
        : membershipStatus.isBasicMember
        ? '基础会员'
        : '非会员',

      endTimeText: formatMembershipEndTime(profile?.membershipEndTime, t),

      statusBadge: membershipStatus.isValidMember
        ? {
            text: membershipStatus.isPremiumMember ? '高级会员' : '基础会员',
            color: membershipStatus.isPremiumMember ? '#38A169' : '#3182CE',
          }
        : null,
    };
  }, [membershipStatus, profile?.membershipEndTime, t]);

  return {
    // 基础状态
    ...membershipStatus,

    // 显示文本
    displayTexts,

    // 过期警告
    expireWarning,

    // 工具方法 - 重新封装以确保使用正确的用户信息
    hasFeature: (feature: MembershipFeature) => hasFeatureAccess(profile || undefined, feature),
    isExpired: () => isMembershipExpired(profile?.membershipEndTime),
    getRemainingDays: () => getMembershipRemainingDays(profile?.membershipEndTime),
    formatEndTime: () => formatMembershipEndTime(profile?.membershipEndTime, t),
  };
}

/**
 * 快速检查功能权限的 Hook
 * @param feature 要检查的功能
 * @param userProfile 用户信息，如果不传则使用当前登录用户信息
 * @returns 是否有权限
 */
export function useFeatureAccess(
  feature: MembershipFeature,
  userProfile?: GetUserProfileResponse
): boolean {
  const { userProfile: currentUserProfile } = useUserSelector();
  const profile = userProfile || currentUserProfile;

  return useMemo(() => {
    return hasFeatureAccess(profile || undefined, feature);
  }, [profile, feature]);
}

/**
 * 会员过期检查 Hook
 * @param userProfile 用户信息，如果不传则使用当前登录用户信息
 * @param t 翻译函数
 * @returns 过期状态和相关信息
 */
export function useMembershipExpiry(userProfile?: GetUserProfileResponse, t?: TFunction) {
  const { userProfile: currentUserProfile } = useUserSelector();
  const profile = userProfile || currentUserProfile;

  return useMemo(() => {
    const isExpired = isMembershipExpired(profile?.membershipEndTime);
    const remainingDays = getMembershipRemainingDays(profile?.membershipEndTime);

    return {
      isExpired,
      remainingDays,
      isExpiringSoon: remainingDays > 0 && remainingDays <= 7,
      isCritical: remainingDays > 0 && remainingDays <= 3,
      endTime: profile?.membershipEndTime,
      formattedEndTime: formatMembershipEndTime(profile?.membershipEndTime, t),
    };
  }, [profile?.membershipEndTime, t]);
}
