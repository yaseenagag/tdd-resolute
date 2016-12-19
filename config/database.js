const pgp = require('pg-promise')()
const pgpdb = pgp({ database: 'resolute'})

const resetDb = () => {
  return Promise.all([
    pgpdb.query('delete from books'),
    pgpdb.query('delete from authors'),
    pgpdb.query('delete from genres'),
    pgpdb.query('delete from book_authors'),
    pgpdb.query('delete from book_genres')
  ])
}

const getBook = (title, year) => {
  return pgpdb.query('insert into books( title, year) values ($1, $2) returning id', [title, year]).then(result => result[0].id)
}

const createAuthor = author => {
  return pgpdb.query('insert into authors( name ) values ( $1 ) returning id', [author]).then(result => result[0].id)
}

const createGenre = genre => {
  return pgpdb.query('insert into genres( name ) values ( $1 ) returning id', [genre]).then(result => result[0].id)
}

const joinBookAuthor = (bookId, authorId) => {
  return pgpdb.query('insert into book_authors( book_id, author_id ) values( $1, $2 )')
}





module.exports = { resetDb, createBook }
