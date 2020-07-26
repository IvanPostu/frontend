import log from 'fancy-log'
import path from 'path'
import dotenv from 'dotenv'
import { fgcyan, fgblack, bgcyan, reset } from './colors'

function resolve() {
  let dotEnvFilename

  if (!process.env.DOTENV_FILE) {
    log.info('.env file is not defined explicitly, by default using .env.development')
    dotEnvFilename = '.env.development'
  } else {
    dotEnvFilename = process.env.DOTENV_FILE
    log.info(`Using ${dotEnvFilename} file.`)
  }

  const dotenvConfigPath = path.join(__dirname, '..', dotEnvFilename)
  const dotenvConfig = dotenv.config({ path: dotenvConfigPath })

  if (dotenvConfig.error) {
    throw dotenvConfig.error
  }

  const nodeEnvMode =
    fgcyan + `NODE_ENV=` + `${bgcyan + fgblack}${process.env.NODE_ENV}${reset + fgcyan}` + reset
  log.info(nodeEnvMode)
}

module.exports = {
  resolve
}
