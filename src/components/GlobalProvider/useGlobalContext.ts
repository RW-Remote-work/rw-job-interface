import { useContext } from 'react'
import { GlobalProviderContext } from './context'

export function useGlobalContext() {
  const context = useContext(GlobalProviderContext)

  return context
}
