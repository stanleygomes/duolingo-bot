const express = require('express')
const router = express.Router()
const crawlerRest = require('../api/crawler/crawlerRest')
const i18nUtils = require('../utils/i18n')
const loggerUtils = require('../utils/logger')

router.use('/crawler', crawlerRest)

router.use((req, res, next) => {
  return res
    .status(404)
    .send({ message: i18nUtils.translate('route_not_found %s', req.url) })
})

router.use((err, req, res, next) => {
  if (err) {
    loggerUtils.error(err)
    return res
      .status(500)
      .send({ message: i18nUtils.translate('system_error') })
  }
})

module.exports = router
