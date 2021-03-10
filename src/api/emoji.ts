const emojis: { [key: number]: string[] } = {
  // 1xx
  100: [],
  101: [],
  102: [],
  // 2xx
  200: ['🙌', '👌'],
  201: ['✨', '🌟'],
  202: ['👍', '👌'],
  203: [],
  204: [],
  205: [],
  206: [],
  207: [],
  208: [],
  226: [],
  // 3xx
  300: [],
  301: ['🚚', '🚛'],
  302: [],
  303: ['👀'],
  304: [],
  305: [],
  307: ['🔂'],
  308: ['🔁'],
  // 4xx
  400: ['😬'],
  401: ['🤐', '🤫', '🔐'],
  402: ['💵'],
  403: ['🚫'],
  404: ['🤷‍♀️'],
  405: ['🙅‍♀️'],
  406: ['👎'],
  407: [],
  408: ['⌛', '⏱️'],
  409: ['😖'],
  410: ['💨'],
  411: ['📏'],
  412: [],
  413: [],
  414: [],
  415: [],
  416: [],
  417: [],
  418: ['🫖'],
  421: [],
  422: ['❓'],
  423: ['🔒'],
  424: [],
  426: [],
  428: [],
  429: [],
  431: [],
  444: [],
  451: ['👩‍⚖️'],
  499: [],
  // 5XX
  500: ['😱', '🤯'],
  501: [],
  502: [],
  503: ['✋'],
  504: [],
  505: [],
  506: [],
  507: [],
  508: [],
  510: [],
  511: [],
  599: []
}

// Returns the emoji that matches the given status code, or an empty one if not found
const emoji = (statusCode: number, emojiCount = 1) => {
  const arr = [...emojis[statusCode]]
  if (!arr.length) return ''

  const i = 0
  let str = ''
  // eslint-disable-next-line prettier/prettier
  while (emojiCount-- > 0 && arr.length) str += arr.splice(~~(Math.random() * arr.length), 1)[0]

  return str
}

export default emoji
