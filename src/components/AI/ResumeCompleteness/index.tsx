import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { CircularProgress } from '../CircularProgress';

export interface ResumeItem {
  /** 标签文本 */
  label: string;
  /** 百分比值 0-100 */
  percentage: number;
}

export interface ResumeCompletenessProps {
  /** 简历数据 */
  data?: ResumeItem[];
  /** 匹配度等级提示文本 */
  matchLevel?: string;
}

/**
 * 获取匹配度等级文本
 */
const getMatchLevel = (percentage: number): string => {
  if (percentage >= 90) return '非常匹配';
  if (percentage >= 70) return '高度匹配';
  if (percentage >= 50) return '部分匹配';
  return '潜力匹配';
};

/**
 * 计算平均百分比
 */
const getAveragePercentage = (data: ResumeItem[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, item) => acc + item.percentage, 0);
  return Math.round(sum / data.length);
};

/**
 * 简历完整度展示组件
 * 显示简历各个维度的完整度进度
 */
export const ResumeCompleteness: React.FC<ResumeCompletenessProps> = ({
  data = [
    { label: '强烈推荐', percentage: 90 },
    { label: '项目经历', percentage: 70 },
    { label: '教育背景', percentage: 70 },
    { label: '语言', percentage: 98 },
    { label: '核心技能', percentage: 98 },
    { label: '证书', percentage: 98 },
  ],
  matchLevel,
}) => {
  const averagePercentage = getAveragePercentage(data);
  const displayMatchLevel = matchLevel || getMatchLevel(averagePercentage);

  return (
    <Box
      padding="28px"
      borderRadius="16px"
      border="1px solid"
      borderColor="#EDE8DF"
      background="#FBFAF9"
      width="100%"
      maxWidth="800px"
    >
      <VStack spacing="24px" align="stretch">
        {/* 匹配度等级提示 */}
        <Box textAlign="center">
          <Text fontSize="18px" fontWeight="600" color="#000000">
            {displayMatchLevel}
          </Text>
        </Box>

        {/* 进度指示器网格 */}
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          gap="32px"
          justifyItems="center"
        >
          {data.map((item, index) => (
            <GridItem key={index}>
              <CircularProgress
                percentage={item.percentage}
                label={item.label}
                size={100}
                strokeWidth={3}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default ResumeCompleteness;
