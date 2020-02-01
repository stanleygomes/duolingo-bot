const express = require('express')
const sampleRest = express.Router()
const httpResponseUtils = require('../../utils/httpResponse')
const sampleService = require('./sampleService')
const firebase = require('../../utils/firebase')
const fileUtils = require('../../utils/file')
const loggerUtils = require('../../utils/logger')
const smtpUtils = require('../../utils/smtp')
const httpRequestUtils = require('../../utils/httpRequest')
const databaseUtils = require('../../utils/database')
const mustacheUtils = require('../../utils/mustache')

sampleRest.get('/database/namedQuery', (req, res) => {
  databaseUtils.namedQuery('getUser', { id: 2 }).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicTransation', (req, res) => {
  databaseUtils.basicTransation().then(trx => {
    // TODO: a easy way to manage transactions
    // httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicBatchInsert', (req, res) => {
  const data = [
    { name: 'Fulano de tal 1' },
    { name: 'Fulano de tal 2' },
    { name: 'Fulano de tal 3' }
  ]

  databaseUtils.basicBatchInsert('user', data, ['id', 'name']).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicInsert', (req, res) => {
  databaseUtils.basicInsert('user', { name: 'Fulano de tal' }, ['id', 'name']).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicPaginate', (req, res) => {
  databaseUtils.basicPaginate('user', {}).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicSelect', (req, res) => {
  databaseUtils.basicSelect('user', { id: 1 }, ['id', 'name']).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicUpdate', (req, res) => {
  databaseUtils.basicUpdate('user', { id: 1 }, { name: 'Beltrano' }, ['id', 'name']).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/database/basicDelete', (req, res) => {
  databaseUtils.basicDelete('user', { id: 2 }).then(response => {
    httpResponseUtils.json(res, response)
  }).catch(err => httpResponseUtils.error(res, err))
})

sampleRest.get('/mustache', (req, res) => {
  const params = {
    id: 30
  }

  mustacheUtils.getTemplateSQL('getUser', params).then(response => {
    httpResponseUtils.json(res, response)
  })
})

sampleRest.get('/firebase', (req, res) => {
  firebase.createOrUpdateDocument('myFirstCollection2', { message: 'Hello World 2!!' }, 'messages').then((response) => {
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/firebase/upload', fileUtils.multer.single('file'), (req, res) => {
  console.log('Upload Image')
  //
  const file = req.file
  if (file) {
    firebase.uploadFile(file).then((success) => {
      res.status(200).send({
        status: 'success'
      })
    }).catch((error) => {
      console.error(error)
    })
  }
})

sampleRest.get('/logger', (req, res) => {
  loggerUtils.error('Error!!')
  loggerUtils.info('Info!!')
  httpResponseUtils.json(res, {
    message: 'Written log to a file'
  })
})

sampleRest.get('/helloWorld', (req, res) => {
  sampleService.helloWorld().then((response) => {
    httpResponseUtils.json(res, response)
  })
})

sampleRest.get('/fs', (req, res) => {
  fileUtils.writeFile('./test.txt', 'hello!').then(response => {
    console.log(response)
  })
})

sampleRest.get('/httpRequest', (req, res) => {
  const params = {
    url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'
  }

  httpRequestUtils.get(params).then((response) => {
    console.log('OK')
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log('error')
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/sendMail', (req, res) => {
  const emailData = {
    to: ['stanleygomesdasilva@gmail.com', 'stanleygomess@hotmail.com'],
    subject: 'Hello ✔✔✔',
    template: 'helloWorld',
    templateContainer: 'container',
    params: {
      name: 'Fulano'
    }
  }

  smtpUtils.sendMail(emailData).then((response) => {
    console.log(response)
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log(error)
    loggerUtils.error(error)
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/validateJsonBody', (req, res) => {
  sampleService.validateJsonBody(req).then((response) => {
    console.log(response)
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log(error)
    loggerUtils.error(error)
    httpResponseUtils.error(res, error)
  })
})

module.exports = sampleRest
