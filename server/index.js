const express = require('express')
const bodyParser = require('body-parser')
const db = require('../config/database.js')
const server = express()

server.set('port', process.env.PORT || '3000')

server.use(bodyParser.json())

server.get('/ping', (request, response, next) => {
  response.send('pong')
})

server.post('/api/test/reset-db', (request, response, next) => {
  db.resetDb().then(() => {
    response.status(200).end()
  })
})

server.post('/api/books', (request, response, next) => {
  db.createBook(request.body).then(book => {
    response.status(201).json(book).end
  })
})

if (process.env.NODE_ENV !== 'test'){
  server.listen(server.get('port'))
}

module.exports = server
