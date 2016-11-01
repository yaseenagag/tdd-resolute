process.env.NODE_ENV = 'test'
process.env.PORT = process.env.PORT || '3123'

global.chai = require('chai')
global.expect = chai.expect
global.chaiHttp = require('chai-http')
global.server = require('../server')

chai.use(chaiHttp)

global.browserInstance

beforeEach(() => {
  global.browserInstance = chai.request.agent(server)
})

// request('GET', '/api/users/12').then(response)
global.request = (method, url, postBody) => {
  method = method.toLowerCase()
  return new Promise((resolve, reject) => {
    var req = browserInstance[method](url)
    if (method === 'post' && postBody) req = req.send(postBody)
    req.end((error, response) => {
      if (error && error.status >= 500) {
        console.warn(chalk.red('Server Error: '+response.body.error.message))
        console.warn(chalk.red(response.body.error.stack))
        reject(error)
      }else{
        resolve(response)
      }
    })
  })
}
