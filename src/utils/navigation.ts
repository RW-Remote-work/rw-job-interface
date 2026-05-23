import { isClient } from "./common";

export type SiteTarget = 'MAIN' | 'JOB';

/**
 * 获取不同子站点的基础 URL
 * @param target 目标站点
 * @returns 基础 URL (带协议)
 */
export const getBaseUrl = (target: SiteTarget) => {
  // 核心修正：优先使用显式定义的环境变量 APP_ENV
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  const isProd = appEnv === 'prod';
  const isTest = appEnv === 'test';
  
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

  // 这里的优先级确保了在 Docker 中设置了 APP_ENV=test 时，能正确返回 test 域名
  let env: 'prod' | 'test' | 'dev' = 'dev';
  if (isProd) env = 'prod';
  else if (isTest) env = 'test';
  else if (process.env.NODE_ENV === 'production') env = 'prod'; // 兜底逻辑
  
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
  const currentSite = (process.env.NEXT_PUBLIC_SITE_TYPE as SiteTarget) || 'MAIN';
  
  if (target === currentSite) {
    return path;
  }
  
  return getCrossSiteLink(target, path);
};
