const express = require('express')
const router = express.Router()
const sampleRest = require('../api/sample/sampleRest')
const authRest = require('../api/auth/authRest')
const protectedRoutesRest = require('../api/auth/protectedRoutesRest')
const authMiddleware = require('../middlewares/authMiddleware')
const i18nUtils = require('../utils/i18n')
const loggerUtils = require('../utils/logger')

/* non auth routes */
router.use('/auth', authRest)
router.use('/sample', sampleRest)

/* auth routes */
router.use(authMiddleware)
router.use('/protected', protectedRoutesRest)

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
