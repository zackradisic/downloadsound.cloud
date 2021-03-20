import React, { createContext, ReactChild, useContext } from 'react'

import { DownloadTypes } from '../types/downloadTypes'

type TabContextValue = {
  activeTab: DownloadTypes
}

const TabContext = createContext<TabContextValue>({
  activeTab: DownloadTypes.Likes
})

export const TabContextProvider = ({
  activeTab,
  children
}: TabContextValue & { children: ReactChild[] | ReactChild }) => {
  return (
    <TabContext.Provider value={{ activeTab }}>{children}</TabContext.Provider>
  )
}

export const useTabContext = () => useContext(TabContext)
