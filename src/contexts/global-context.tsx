import type { Component, JSXElement, Accessor } from 'solid-js'

import { createContext, useContext } from 'solid-js'

import type { DialogWindow } from '@/utils'

interface GlobalContextValues {
  dialog: Accessor<DialogWindow | undefined>;
}

const GlobalContext = createContext<GlobalContextValues>({
  dialog: () => undefined
})

interface GlobalProviderProps {
  children: JSXElement;
  value: GlobalContextValues;
}

export const GlobalProvider: Component<GlobalProviderProps> = (props) => {
  return <GlobalContext.Provider {...props} />
}

export const useGlobalContext = (): GlobalContextValues => useContext(GlobalContext)
