const express = require('express')
const config = require('./config')
const routes = require('./routes')
const moment = require('moment')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const i18nUtils = require('./utils/i18n')
const dotenv = require('dotenv')
const privateKey = config.privateKey

if (privateKey === null || privateKey === undefined) {
  console.log(i18nUtils.translate('none_private_key'))
  process.exit(1)
}

dotenv.config()

const app = express()
const timeStart = moment().format('DD/MM/YYYY HH:mm')
const expressConfig = {
  cors: config.cors,
  baseEndpoint: config.baseEndpoint,
  port: config.server.port
}

app.use('/static', express.static('src/static'))
app.use(cors(expressConfig.cors))
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressConfig.baseEndpoint, routes)

module.exports = {
  app: app,
  config: expressConfig,
  time: timeStart
}
