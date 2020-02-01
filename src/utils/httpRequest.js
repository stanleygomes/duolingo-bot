const axios = require('axios')
const joi = require('@hapi/joi')

const schema = joi.object().keys({
  method: joi.string(),
  url: joi.string().required(),
  responseType: joi.string().required()
})

const post = (params) => {
  return new Promise((resolve, reject) => {
    const postParams = {
      method: 'post'
    }

    request({ ...params, ...postParams }).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const get = (params) => {
  return new Promise((resolve, reject) => {
    const getParams = {
      method: 'get'
    }

    request({ ...params, ...getParams }).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const request = (params) => {
  return new Promise((resolve, reject) => {
    const result = joi.validate(params, schema)

    if (!result) {
      const error = new Error('Invalid parameters')
      reject(error)
    }

    const defaultParams = {
      baseURL: '',
      method: 'post',
      url: '',
      headers: {},
      params: {},
      data: {},
      timeout: 1000,
      responseType: 'json'
    }

    axios({ ...defaultParams, ...params }).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

module.exports = {
  post,
  get
}
