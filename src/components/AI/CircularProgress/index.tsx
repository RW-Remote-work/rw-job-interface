import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export interface CircularProgressProps {
  /** 百分比值 0-100 */
  percentage: number;
  /** 标签文本 */
  label: string;
  /** 圆圈大小 */
  size?: number;
  /** 进度条宽度 */
  strokeWidth?: number;
  /** 进度条颜色 */
  strokeColor?: string;
  /** 背景圆圈颜色 */
  bgStrokeColor?: string;
}

/**
 * 圆形进度组件
 * 显示百分比进度和标签文本
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  label,
  size = 100,
  strokeWidth = 3,
  strokeColor = '#000000',
  bgStrokeColor = '#E5E5E5',
}) => {
  // 计算 SVG 相关参数
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <VStack spacing="12px" align="center">
      <Box position="relative" width={`${size}px`} height={`${size}px`}>
        <Box
          as="svg"
          width={size}
          height={size}
          transform="rotate(-90deg)"
        >
          {/* 背景圆圈 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgStrokeColor}
            strokeWidth={strokeWidth}
          />
          {/* 进度圆圈 */}
          <Box
            as="circle"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transition="stroke-dashoffset 0.5s ease"
          />
        </Box>
        {/* 百分比文本 */}
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="20px"
          fontWeight="600"
          color="#000000"
        >
          {percentage}%
        </Text>
      </Box>
      {/* 标签文本 */}
      <Text fontSize="14px" fontWeight="400" color="#000000" textAlign="center">
        {label}
      </Text>
    </VStack>
  );
};

export default CircularProgress;
