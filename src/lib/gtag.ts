const gtag = (...params: any[]) => {
  if (!process.env.GATSBY_PROD) return

  if (typeof window !== 'undefined') {
    ;(window as any).gtag(...params)
  }
}

export default gtag
