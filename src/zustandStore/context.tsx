import { createContext } from 'react'
import { createYamStore, SetableValues, YamStore } from './store'

export const YamContext = createContext<YamStore | null>(null);

export const YamProvider = ({ children, initProps }: { children: React.ReactNode, initProps: SetableValues }) => {
    const store = createYamStore(initProps)
    return (
      <YamContext.Provider value={store}>
        {children}
      </YamContext.Provider>
    )
}
