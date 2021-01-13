
const urlRegexp = /(^https?:\/\/((m\.)?soundcloud\.com)\/(.*)$)|(^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$)/
const mobileUrlRegex = /^https?:\/\/(m\.soundcloud\.com)\/(.*)$/
const firebaseUrlRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/

const playlistRegexp = /^https?:\/\/(soundcloud\.com)\/sets\/(.*)$/

const testRegex = (reg: RegExp) => (str: string): boolean => !!(str.match(reg) && (str.match(reg) as RegExpMatchArray)[2])

export const isURL = testRegex(urlRegexp)
export const isMobileURL = testRegex(mobileUrlRegex)
export const isFirebaseURL = testRegex(firebaseUrlRegex)
export const isPlaylistURL = testRegex(playlistRegexp)
