import { createContext } from 'react'

type Clear = () => void
export type Render = (node: JSX.Element,) => Clear
export const GlobalProviderContext = createContext<{
    render: Render
}>({
  render: () => () => { },
})
