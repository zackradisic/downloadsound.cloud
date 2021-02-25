import { isClientSide } from './util'

export const downloadCountKey = 'downloadCount'
export const disableKey = 'disable'

interface ActiveUserData {
  downloads: number
  disables: number
}

const getLocalStorageItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value))

export const isActive = (data: ActiveUserData) =>
  data.downloads >= 3 && data.disables < 3

export const getActiveUserData: () => ActiveUserData | undefined = () =>
  isClientSide(() => {
    let downloads = getLocalStorageItem(downloadCountKey)
    let disables = getLocalStorageItem(disableKey)
    console.log(downloads, disables)
    if (downloads === null || disables === null) {
      console.log('resetting')
      downloads = 0
      disables = 0
      localStorage.setItem(downloadCountKey, '0')
      localStorage.setItem(disableKey, '0')
    }

    const data = {
      downloads,
      disables
    }
    return data
  })
