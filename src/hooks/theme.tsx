
interface Theme {
    sky: string,
    containerTitle: string,
    containerBackground: string,
    title: string,
    subTitle: string,
    textRegular: string,
    textHint: string,
    containerText: string,
    boldText: string,
}

const lightTheme: Theme = {
  sky: '#70d4f0',
  containerTitle: '#4B4B4B',
  containerBackground: 'white',
  containerText: '#4B4B4B',
  title: '#000000',
  subTitle: '#4B4B4B',
  textRegular: '#363636',
  textHint: '#A6A6A6',
  boldText: '#4B4B4B'
}

const darkTheme: Theme = {
  sky: '#0A0A0A',
  containerTitle: '#D8D8D8',
  containerText: '#ACACAC',
  containerBackground: '#171717',
  title: '#D8D8D8',
  subTitle: '#B1B0B0',
  textRegular: '#D1D1D1',
  textHint: '#858585',
  boldText: '#D7D7D7'
}

export const isDarkMode = (): boolean => {
  if (typeof window !== 'undefined') return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return undefined
}

const useTheme = (): Theme => {
  const dark = isDarkMode()
  if (dark) return darkTheme
  if (dark === undefined) return darkTheme
  return lightTheme
}

export default useTheme
