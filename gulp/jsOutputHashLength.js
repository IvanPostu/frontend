import log from 'fancy-log'

let cachedHashLength = null

export function hashLength() {
  if (cachedHashLength) {
    return cachedHashLength
  }

  let res = 10
  let fromDotEnvFile = false

  if (process.env.OUT_JS_HASH_LENGTH) {
    const n = Number(process.env.OUT_JS_HASH_LENGTH)

    if (n >= 10 && n <= 20) {
      res = n
      fromDotEnvFile = true
    }
  }

  log(`Js output hash => ${res}, ${fromDotEnvFile ? 'from .env file.' : ''}`)

  cachedHashLength = res
  return res
}
