const express = require('express')
const crawlerRest = express.Router()
const crawlerService = require('./crawlerService')

crawlerRest.get('/', (req, res) => {
  crawlerService.execute(req, res).then(response => {
    res.json(response)
  }).catch(error => {
    res.send(error)
  })
})

module.exports = crawlerRest
