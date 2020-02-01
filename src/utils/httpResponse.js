const i18nUtils = require('./i18n')

const error = (res, message, status) => {
  console.log(message || {}, status || {})
  res
    .status(status || 500)
    .set('Content-Type', 'application/json')
    .json({
      status: status || 500,
      message: (message || i18nUtils.translate('generic_error'))
    })
}

const json = (res, data) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json(data)
}

module.exports = {
  error,
  json
}
