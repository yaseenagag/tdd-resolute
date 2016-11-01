describe('HTTP Server', () => {

  describe('GET /ping', () => {
    it('should respond with "pong"', () => {
      return request('get', '/ping').then(response => {
        expect(response).to.have.status(200)
        expect(response.text).to.eql('pong')
      })
    })
  })


  // GET /api/books
  // GET /api/books?page=2
  // GET /api/books/:bookId
  // POST /api/books/:bookId
  // POST /api/books/:bookId/delete
  // GET /api/books/search?title&author&genre

})
