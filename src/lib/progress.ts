const toFixed = (num, fixed) => {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  return num.toString().match(re)[0]
}
const getProgressHint = (progress: number) => {
  if (progress === 0) return '🚀 Ready to download'
  if (progress === 1) return '🎉 Completed, enjoy'
  return `(${toFixed(progress * 100, 2)}%) Fetching your beloved music... `
}

export default getProgressHint
