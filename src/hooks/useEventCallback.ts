import { useMemo, useRef } from 'react'

interface FnTemplate {
  (...args: unknown[]): unknown
}

export function useEventCallback<T = FnTemplate>(fn: T): T {
  const fnRef = useRef<T>(fn)

  fnRef.current = useMemo(() => fn, [fn])

  const memoizedFn = useRef<T>()

  if (!memoizedFn.current) {
    memoizedFn.current = function (...args: unknown[]): unknown {
      const tempFn = fnRef.current
      return (tempFn as FnTemplate)(...args)
    } as T
  }

  return memoizedFn.current as T
}