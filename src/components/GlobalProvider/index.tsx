import { Fragment, type PropsWithChildren, useState } from 'react'
import type { Render } from './context'
import { GlobalProviderContext } from './context'
import { useEventCallback } from '@/hooks/useEventCallback'

let renderId = 1

export function GlobalProvider({ children }: PropsWithChildren) {
  const [nodes, setNodes] = useState<{ node: JSX.Element; id: number }[]>([])

  const clear = (id: number) => {
    setNodes((prev) => {
      return prev.filter(item => item.id !== id)
    })
  }

  const render = useEventCallback<Render>((node: JSX.Element) => {
    const localRenderId = ++renderId

    setNodes((nodes) => {
      return [...nodes, { node, id: localRenderId }]
    })

    return () => {
      clear(localRenderId)
    }
  })

  return (
    <GlobalProviderContext.Provider value={{ render }}>
      {children}
      {nodes.map((item) => {
        return <Fragment key={item.id}>{item.node}</Fragment>
      })}
    </GlobalProviderContext.Provider>
  )
}
