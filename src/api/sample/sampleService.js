const i18nUtils = require('../../utils/i18n')
const message = i18nUtils.translate('Hello')
const joi = require('@hapi/joi')

const schema = joi.object().keys({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  repeat_password: joi.ref('password')
})

const helloWorld = () => {
  return new Promise((resolve, reject) => {
    resolve({
      message: message
    })
  })
}

const validateJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    const result = joi.validate(req.body, schema)
    if (result.error) {
      reject(result.error)
    }

    resolve(result)
  })
}

module.exports = {
  helloWorld,
  validateJsonBody
}
