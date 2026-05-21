import React from 'react';
import { Box, Badge, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useMembership, useMembershipExpiry } from '@/hooks/useMembership';
import { MembershipFeature } from '@/utils/membership';

/**
 * 会员状态显示组件
 * 展示如何使用新的会员工具函数
 */
export const MembershipStatusCard: React.FC = () => {
  const membership = useMembership();
  const expiry = useMembershipExpiry();

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="white" shadow="sm">
      {/* 会员状态标题 */}
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="lg" fontWeight="bold">
          会员状态
        </Text>
        {membership.displayTexts.statusBadge && (
          <Badge 
            colorScheme={membership.isPremiumMember ? "green" : "blue"}
            variant="solid"
          >
            {membership.displayTexts.statusBadge.text}
          </Badge>
        )}
      </Flex>

      {/* 会员类型和到期时间 */}
      <Box mb={3}>
        <Text fontSize="sm" color="gray.600" mb={1}>
          会员类型: {membership.displayTexts.membershipType}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {membership.displayTexts.endTimeText}
        </Text>
        {membership.isValidMember && (
          <Text fontSize="sm" color="blue.500">
            剩余 {membership.remainingDays} 天
          </Text>
        )}
      </Box>

      {/* 过期警告 */}
      {membership.expireWarning && (
        <Alert status={membership.expireWarning.level === 'critical' ? 'error' : 'warning'} mb={3} size="sm">
          <AlertIcon />
          <AlertDescription fontSize="sm">
            {membership.expireWarning.message}
          </AlertDescription>
        </Alert>
      )}

      {/* 可用功能列表 */}
      <Box>
        <Text fontSize="sm" fontWeight="semibold" mb={2}>
          可用功能:
        </Text>
        <Box pl={2}>
          <Flex align="center" mb={1}>
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={membership.hasFeature(MembershipFeature.ADVANCED_JOB_FILTER) ? "green.400" : "gray.300"}
              mr={2}
            />
            <Text fontSize="xs" color={membership.hasFeature(MembershipFeature.ADVANCED_JOB_FILTER) ? "gray.700" : "gray.400"}>
              远程工作高级筛选
            </Text>
          </Flex>
          
          <Flex align="center" mb={1}>
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={membership.hasFeature(MembershipFeature.JOB_EMAIL_NOTIFICATION) ? "green.400" : "gray.300"}
              mr={2}
            />
            <Text fontSize="xs" color={membership.hasFeature(MembershipFeature.JOB_EMAIL_NOTIFICATION) ? "gray.700" : "gray.400"}>
              岗位邮件通知
            </Text>
          </Flex>
          
          <Flex align="center" mb={1}>
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={membership.hasFeature(MembershipFeature.TRAVEL_GUIDE_PREMIUM) ? "green.400" : "gray.300"}
              mr={2}
            />
            <Text fontSize="xs" color={membership.hasFeature(MembershipFeature.TRAVEL_GUIDE_PREMIUM) ? "gray.700" : "gray.400"}>
              旅居指南高级版
            </Text>
          </Flex>
          
          <Flex align="center">
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={membership.hasFeature(MembershipFeature.PERSONAL_IP_EXPOSURE) ? "green.400" : "gray.300"}
              mr={2}
            />
            <Text fontSize="xs" color={membership.hasFeature(MembershipFeature.PERSONAL_IP_EXPOSURE) ? "gray.700" : "gray.400"}>
              个人IP曝光
            </Text>
          </Flex>
        </Box>
      </Box>

      {/* 调试信息（开发模式下显示） */}
      {process.env.NODE_ENV === 'development' && (
        <Box mt={4} p={2} bg="gray.50" borderRadius="sm">
          <Text fontSize="xs" fontWeight="bold" mb={1}>调试信息:</Text>
          <Text fontSize="xs">isMember: {membership.isMember.toString()}</Text>
          <Text fontSize="xs">isValidMember: {membership.isValidMember.toString()}</Text>
          <Text fontSize="xs">isExpired: {expiry.isExpired.toString()}</Text>
          <Text fontSize="xs">remainingDays: {expiry.remainingDays}</Text>
        </Box>
      )}
    </Box>
  );
};

/**
 * 功能权限检查组件
 * 展示如何检查特定功能权限
 */
interface FeatureGuardProps {
  feature: MembershipFeature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({ 
  feature, 
  children, 
  fallback 
}) => {
  const membership = useMembership();
  
  const hasAccess = membership.hasFeature(feature);
  
  if (!hasAccess) {
    return (
      <>
        {fallback || (
          <Alert status="warning" size="sm">
            <AlertIcon />
            <AlertTitle fontSize="sm">功能权限不足</AlertTitle>
            <AlertDescription fontSize="sm">
              此功能需要会员权限，请升级会员后使用
            </AlertDescription>
          </Alert>
        )}
      </>
    );
  }
  
  return <>{children}</>;
};

export default MembershipStatusCard;
