
interface Theme {
    sky: string,
    containerTitle: string,
    containerBackground: string,
    title: string,
    subTitle: string,
    textRegular: string
}

const lightTheme: Theme = {
  sky: '#70d4f0',
  containerTitle: '#4B4B4B',
  containerBackground: 'white',
  title: '#000000',
  subTitle: '#4B4B4B',
  textRegular: '#363636'
}

const darkTheme: Theme = {
  sky: '#0A0A0A',
  containerTitle: '#A0A0A0',
  containerBackground: '#171717',
  title: '#D8D8D8',
  subTitle: '#B1B0B0',
  textRegular: '#D1D1D1'
}

export const isDarkMode = () => {
  if (typeof window !== 'undefined') return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return false
}

const useTheme = (): Theme => {
  const dark = isDarkMode()
  if (dark) return darkTheme
  return lightTheme
}

export default useTheme
