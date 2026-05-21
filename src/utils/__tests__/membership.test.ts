/**
 * 会员工具函数测试
 * 用于验证会员判断逻辑的正确性
 */

import {
  isMember,
  isValidMember,
  isBasicMember,
  isPremiumMember,
  isMembershipExpired,
  getMembershipRemainingDays,
  hasFeatureAccess,
  getMembershipStatus,
  formatMembershipEndTime,
  MembershipType,
  MembershipFeature,
} from '../membership';
import { GetUserProfileResponse } from '../../__generated__/RwInterfaceApi';

// 测试数据
const mockCurrentTime = new Date('2025-06-19T00:00:00Z');
const mockFutureTime = new Date('2025-12-31T23:59:59Z');
const mockPastTime = new Date('2025-01-01T00:00:00Z');

// Mock 用户数据
const nonMemberUser: GetUserProfileResponse = {
  id: 1,
  email: 'test@example.com',
  displayName: 'Test User',
};

const basicMemberUser: GetUserProfileResponse = {
  id: 2,
  email: 'basic@example.com',
  displayName: 'Basic Member',
  membershipType: MembershipType.BASIC,
  membershipStartTime: mockPastTime.toISOString(),
  membershipEndTime: mockFutureTime.toISOString(),
};

const premiumMemberUser: GetUserProfileResponse = {
  id: 3,
  email: 'premium@example.com',
  displayName: 'Premium Member',
  membershipType: MembershipType.PREMIUM,
  membershipStartTime: mockPastTime.toISOString(),
  membershipEndTime: mockFutureTime.toISOString(),
};

const expiredMemberUser: GetUserProfileResponse = {
  id: 4,
  email: 'expired@example.com',
  displayName: 'Expired Member',
  membershipType: MembershipType.BASIC,
  membershipStartTime: new Date('2024-01-01T00:00:00Z').toISOString(),
  membershipEndTime: mockPastTime.toISOString(),
};

const expiringSoonMemberUser: GetUserProfileResponse = {
  id: 5,
  email: 'expiring@example.com',
  displayName: 'Expiring Soon Member',
  membershipType: MembershipType.PREMIUM,
  membershipStartTime: mockPastTime.toISOString(),
  membershipEndTime: new Date('2025-06-22T00:00:00Z').toISOString(), // 3天后过期
};

/**
 * 测试基础会员判断函数
 */
export function testBasicMembershipFunctions() {
  console.log('=== 测试基础会员判断函数 ===');

  // 测试 isMember
  console.log('isMember 测试:');
  console.log('非会员:', isMember(nonMemberUser)); // false
  console.log('基础会员:', isMember(basicMemberUser)); // true
  console.log('高级会员:', isMember(premiumMemberUser)); // true
  console.log('过期会员:', isMember(expiredMemberUser)); // true (有会员类型)

  // 测试 isValidMember
  console.log('\nisValidMember 测试:');
  console.log('非会员:', isValidMember(nonMemberUser)); // false
  console.log('基础会员:', isValidMember(basicMemberUser)); // true
  console.log('高级会员:', isValidMember(premiumMemberUser)); // true
  console.log('过期会员:', isValidMember(expiredMemberUser)); // false

  // 测试会员类型判断
  console.log('\n会员类型判断测试:');
  console.log('基础会员 - isBasicMember:', isBasicMember(basicMemberUser)); // true
  console.log('基础会员 - isPremiumMember:', isPremiumMember(basicMemberUser)); // false
  console.log('高级会员 - isBasicMember:', isBasicMember(premiumMemberUser)); // false
  console.log('高级会员 - isPremiumMember:', isPremiumMember(premiumMemberUser)); // true
}

/**
 * 测试会员过期相关函数
 */
export function testMembershipExpiryFunctions() {
  console.log('\n=== 测试会员过期相关函数 ===');

  // 测试 isMembershipExpired
  console.log('isMembershipExpired 测试:');
  console.log('未来时间:', isMembershipExpired(mockFutureTime.toISOString())); // false
  console.log('过去时间:', isMembershipExpired(mockPastTime.toISOString())); // true
  console.log('无结束时间:', isMembershipExpired(undefined)); // true

  // 测试 getMembershipRemainingDays
  console.log('\ngetMembershipRemainingDays 测试:');
  console.log('基础会员剩余天数:', getMembershipRemainingDays(basicMemberUser.membershipEndTime));
  console.log('过期会员剩余天数:', getMembershipRemainingDays(expiredMemberUser.membershipEndTime)); // 0
  console.log('即将过期会员剩余天数:', getMembershipRemainingDays(expiringSoonMemberUser.membershipEndTime)); // 约3天

  // 测试 formatMembershipEndTime
  console.log('\nformatMembershipEndTime 测试:');
  console.log('基础会员:', formatMembershipEndTime(basicMemberUser.membershipEndTime));
  console.log('过期会员:', formatMembershipEndTime(expiredMemberUser.membershipEndTime));
  console.log('无会员:', formatMembershipEndTime(undefined));
}

/**
 * 测试功能权限检查
 */
export function testFeatureAccessFunctions() {
  console.log('\n=== 测试功能权限检查 ===');

  const features = [
    MembershipFeature.ADVANCED_JOB_FILTER,
    MembershipFeature.JOB_EMAIL_NOTIFICATION,
    MembershipFeature.TRAVEL_GUIDE_PREMIUM,
    MembershipFeature.PERSONAL_IP_EXPOSURE,
    MembershipFeature.TRAVEL_GUIDE_FREE,
  ];

  const users = [
    { name: '非会员', user: nonMemberUser },
    { name: '基础会员', user: basicMemberUser },
    { name: '高级会员', user: premiumMemberUser },
    { name: '过期会员', user: expiredMemberUser },
  ];

  users.forEach(({ name, user }) => {
    console.log(`\n${name} 功能权限:`);
    features.forEach(feature => {
      const hasAccess = hasFeatureAccess(user, feature);
      console.log(`  ${feature}: ${hasAccess ? '✓' : '✗'}`);
    });
  });
}

/**
 * 测试综合会员状态函数
 */
export function testComprehensiveMembershipStatus() {
  console.log('\n=== 测试综合会员状态函数 ===');

  const users = [
    { name: '非会员', user: nonMemberUser },
    { name: '基础会员', user: basicMemberUser },
    { name: '高级会员', user: premiumMemberUser },
    { name: '过期会员', user: expiredMemberUser },
    { name: '即将过期会员', user: expiringSoonMemberUser },
  ];

  users.forEach(({ name, user }) => {
    console.log(`\n${name} 状态:`);
    const status = getMembershipStatus(user);
    
    console.log(`  isMember: ${status.isMember}`);
    console.log(`  isValidMember: ${status.isValidMember}`);
    console.log(`  isBasicMember: ${status.isBasicMember}`);
    console.log(`  isPremiumMember: ${status.isPremiumMember}`);
    console.log(`  isExpired: ${status.isExpired}`);
    console.log(`  remainingDays: ${status.remainingDays}`);
    console.log(`  membershipType: ${status.membershipType || 'null'}`);
    console.log(`  features count: ${status.features.length}`);
    
    // 测试特定功能权限
    const hasAdvancedFilter = status.hasFeature(MembershipFeature.ADVANCED_JOB_FILTER);
    const hasPremiumGuide = status.hasFeature(MembershipFeature.TRAVEL_GUIDE_PREMIUM);
    console.log(`  高级筛选权限: ${hasAdvancedFilter ? '✓' : '✗'}`);
    console.log(`  高级旅居指南权限: ${hasPremiumGuide ? '✓' : '✗'}`);
  });
}

/**
 * 测试边界情况
 */
export function testEdgeCases() {
  console.log('\n=== 测试边界情况 ===');

  // 测试 null/undefined 输入
  console.log('null/undefined 输入测试:');
  console.log('isMember(null):', isMember(null as any)); // false
  console.log('isMember(undefined):', isMember(undefined)); // false
  console.log('isValidMember(null):', isValidMember(null as any)); // false
  console.log('hasFeatureAccess(null, feature):', hasFeatureAccess(null as any, MembershipFeature.ADVANCED_JOB_FILTER)); // false

  // 测试无效时间格式
  console.log('\n无效时间格式测试:');
  const invalidTimeUser: GetUserProfileResponse = {
    id: 999,
    email: 'invalid@example.com',
    displayName: 'Invalid Time User',
    membershipType: MembershipType.BASIC,
    membershipStartTime: 'invalid-date',
    membershipEndTime: 'invalid-date',
  };
  
  console.log('isMembershipExpired(invalid-date):', isMembershipExpired('invalid-date')); // true
  console.log('getMembershipRemainingDays(invalid-date):', getMembershipRemainingDays('invalid-date')); // 0
  console.log('isValidMember(invalidTimeUser):', isValidMember(invalidTimeUser)); // false

  // 测试空字符串
  console.log('\n空字符串测试:');
  console.log('isMembershipExpired(""):', isMembershipExpired('')); // true
  console.log('getMembershipRemainingDays(""):', getMembershipRemainingDays('')); // 0
}

/**
 * 性能测试
 */
export function testPerformance() {
  console.log('\n=== 性能测试 ===');

  const iterations = 10000;
  const testUser = basicMemberUser;

  // 测试基础函数性能
  console.time('isMember performance');
  for (let i = 0; i < iterations; i++) {
    isMember(testUser);
  }
  console.timeEnd('isMember performance');

  console.time('isValidMember performance');
  for (let i = 0; i < iterations; i++) {
    isValidMember(testUser);
  }
  console.timeEnd('isValidMember performance');

  console.time('hasFeatureAccess performance');
  for (let i = 0; i < iterations; i++) {
    hasFeatureAccess(testUser, MembershipFeature.ADVANCED_JOB_FILTER);
  }
  console.timeEnd('hasFeatureAccess performance');

  console.time('getMembershipStatus performance');
  for (let i = 0; i < iterations; i++) {
    getMembershipStatus(testUser);
  }
  console.timeEnd('getMembershipStatus performance');
}

/**
 * 运行所有测试
 */
export function runAllTests() {
  console.log('开始运行会员工具函数测试...\n');

  try {
    testBasicMembershipFunctions();
    testMembershipExpiryFunctions();
    testFeatureAccessFunctions();
    testComprehensiveMembershipStatus();
    testEdgeCases();
    testPerformance();

    console.log('\n✅ 所有测试完成！');
  } catch (error) {
    console.error('\n❌ 测试过程中出现错误:', error);
  }
}

// 如果直接运行此文件，执行所有测试
if (typeof window === 'undefined' && require.main === module) {
  runAllTests();
}
