const config = require('../config')
const nodemailer = require('nodemailer')
const mustacheUtils = require('./mustache')
const loggerUtils = require('./logger')

const validateParameters = (emailData) => {
  let errorMessage = null

  if (emailData) {
    if (emailData.to && emailData.to.length > 0) {
      emailData.to = emailData.to.join()
    }
    if (!emailData.subject) {
      errorMessage = 'Invalid mail subject'
    }
    if (!emailData.template) {
      errorMessage = 'Invalid mail template'
    }
  } else {
    errorMessage = 'Invalid mail parameters'
  }

  if (errorMessage) {
    return {
      error: true,
      message: errorMessage
    }
  } else {
    return emailData
  }
}

const transpile = (emailData, transporter) => {
  return new Promise((resolve, reject) => {
    mustacheUtils.getTemplateSMTP(emailData.templateContainer, emailData.params).then(template => {
      mustacheUtils.getTemplateSMTP(emailData.template, emailData.params).then(templateChild => {
        const templateContainerRendered = template.rendered.replace('@childTemplate', templateChild.rendered)
        emailData.html = templateContainerRendered
        send(emailData, transporter).then(response => resolve(response))
      }).catch(error => reject(error))
      send(emailData, transporter).then(response => resolve(response))
    }).catch(error => reject(error))
  })
}

const send = (emailData, transporter) => {
  return new Promise((resolve, reject) => {
    emailData = Object.assign(emailData, config.smtp.send)

    transporter.sendMail(emailData).then((info) => {
      const response = {
        response: info,
        messageUrl: nodemailer.getTestMessageUrl(info)
      }
      resolve(response)
    }).catch(error => reject(error))
  })
}

const sendMail = (emailData) => {
  return new Promise((resolve, reject) => {
    const params = validateParameters(emailData)

    if (params && params.error) {
      const errorMessage = new Error(params.error)
      reject(errorMessage)
    }

    emailData = Object.assign(emailData, params)
    const transporter = nodemailer.createTransport(config.smtp)

    transpile(emailData, transporter).then((resolved) => {
      const response = {
        emailData: emailData,
        response: resolved
      }

      resolve(response)
    }).catch((error) => {
      loggerUtils.error(error.stack)
      reject(error)
    })
  })
}

module.exports = {
  sendMail
}
