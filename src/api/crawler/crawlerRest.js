const express = require('express')
const crawlerRest = express.Router()
const crawlerService = require('./crawlerService')

crawlerRest.get('/hora-do-show', async (req, res) => {
  const times = [1, 2, 3, 4, 5]

  const executions = times.map(async (value) => {
    const result = await crawlerService.execute()
    return result
  })

  await Promise.all(executions).then(response => {
    if (response.length && response.length === times.length) {
      res.json(response)
    }
  }).catch(error => {
    res.send(error)
  })
})

crawlerRest.get('/', async (req, res) => {
  crawlerService.execute().then(response => {
    res.json(response)
  }).catch(error => {
    res.send(error)
  })
})

module.exports = crawlerRest
