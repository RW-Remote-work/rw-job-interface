import { useState, useCallback, useEffect } from 'react';

export type OptimizeStatus = 'idle' | 'loading' | 'success' | 'error';

export type OptimizeState = {
  status: OptimizeStatus;
  resumeUrl?: string;
  error?: string;
};

// 全局状态存储（按 jobId 区分）
const globalOptimizeState = new Map<number, OptimizeState>();

// 监听器集合（按 jobId 分组）
const listeners = new Map<number, Set<(state: OptimizeState) => void>>();

// 通知指定 jobId 的所有监听器
const notifyListeners = (jobId: number, state: OptimizeState) => {
  const jobListeners = listeners.get(jobId);
  if (jobListeners) {
    jobListeners.forEach((callback) => callback(state));
  }
};

// 更新指定 jobId 的状态
export const setOptimizeState = (jobId: number, state: Partial<OptimizeState>) => {
  const currentState = globalOptimizeState.get(jobId) || { status: 'idle' };
  const newState = { ...currentState, ...state };
  globalOptimizeState.set(jobId, newState);
  notifyListeners(jobId, newState);
};

// 获取指定 jobId 的状态
export const getOptimizeState = (jobId: number): OptimizeState => {
  return globalOptimizeState.get(jobId) || { status: 'idle' };
};

// Hook for components to subscribe to optimize state
export const useResumeOptimize = (jobId?: number) => {
  const [state, setState] = useState<OptimizeState>(() => 
    jobId ? getOptimizeState(jobId) : { status: 'idle' }
  );

  useEffect(() => {
    if (!jobId) return;

    // 立即获取最新状态
    setState(getOptimizeState(jobId));

    // 注册监听器
    const callback = (newState: OptimizeState) => {
      setState(newState);
    };

    if (!listeners.has(jobId)) {
      listeners.set(jobId, new Set());
    }
    listeners.get(jobId)?.add(callback);

    // 清理函数
    return () => {
      listeners.get(jobId)?.delete(callback);
    };
  }, [jobId]);

  // 开始优化（设置为 loading 状态）
  const startOptimize = useCallback(() => {
    if (jobId) {
      setOptimizeState(jobId, { status: 'loading' });
    }
  }, [jobId]);

  // 设置优化成功状态
  const setSuccess = useCallback((resumeUrl: string) => {
    if (jobId) {
      setOptimizeState(jobId, { status: 'success', resumeUrl });
    }
  }, [jobId]);

  // 设置优化失败状态
  const setError = useCallback((error: string) => {
    if (jobId) {
      setOptimizeState(jobId, { status: 'error', error });
    }
  }, [jobId]);

  return {
    ...state,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    startOptimize,
    setSuccess,
    setError,
  };
};

export default useResumeOptimize;
