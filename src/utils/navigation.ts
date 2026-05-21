import { isClient } from "./common";

export type SiteTarget = 'MAIN' | 'JOB';

/**
 * 获取不同子站点的基础 URL
 * @param target 目标站点
 * @returns 基础 URL (带协议)
 */
export const getBaseUrl = (target: SiteTarget) => {
  const isProd = process.env.NODE_ENV === 'production';
  // 阿里云环境通常通过 NEXT_PUBLIC_APP_ENV 或 NODE_ENV 区分
  const isTest = process.env.NEXT_PUBLIC_APP_ENV === 'test' || process.env.NEXT_PUBLIC_NODE_ENV === 'test';
  
  const config = {
    MAIN: {
      prod: 'https://www.rwnomad.com',
      test: 'https://test.rwnomad.com',
      dev: 'http://localhost:3000'
    },
    JOB: {
      prod: 'https://job.rwnomad.com',
      test: 'https://jobtest.rwnomad.com',
      dev: 'http://localhost:3002'
    }
  };

  const env = isProd ? 'prod' : (isTest ? 'test' : 'dev');
  
  return config[target][env];
};

/**
 * 构建跨站点的绝对链接
 * @param target 目标站点
 * @param path 路径 (必须以 / 开头)
 */
export const getCrossSiteLink = (target: SiteTarget, path: string) => {
  const baseUrl = getBaseUrl(target);
  return `${baseUrl}${path}`;
};

/**
 * 获取跳转链接 (如果是当前站点则返回相对路径，否则返回绝对路径)
 * @param target 目标站点
 * @param path 路径
 */
export const getLink = (target: SiteTarget, path: string) => {
  // 移除 !isClient() 检查，确保服务端和客户端渲染结果一致
  const currentSite = (process.env.NEXT_PUBLIC_SITE_TYPE as SiteTarget) || 'MAIN';
  
  if (target === currentSite) {
    return path;
  }
  
  return getCrossSiteLink(target, path);
};
