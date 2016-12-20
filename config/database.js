const pgp = require('pg-promise')()
const pgpdb = pgp({ database: 'resolute'})

const resetDb = () => {
  return Promise.all([
    pgpdb.query('delete from books'),
    pgpdb.query('delete from authors'),
    pgpdb.query('delete from genres'),
    pgpdb.query('delete from book_authors'),
    pgpdb.query('delete from book_genres'),
  ])
}

const createBook = (title, year) => {
  return pgpdb.query('insert into books( title, year ) values($1, $2) returning id', [title, year]).then(result => result[0].id)
}

const createAuthor = author => {
  return pgpdb.query('insert into authors( name ) values( $1 ) returning id', [author]).then(result => result[0].id)
}

const createGenre = genre => {
  return pgpdb.query('insert into genres( name ) values( $1 ) returning id', [genre]).then(result => result[0].id)
}

const joinBookAuthor = (bookId, authorId) => {
  return pgpdb.query('insert into book_authors( book_id, author_id ) values( $1, $2 )', [ bookId, authorId ])
}

const joinBookGenre = (bookId, genreId) => {
  return pgpdb.query('insert into book_genres( book_id, genre_id ) values( $1, $2 )', [ bookId, genreId ])
}

const createWholeBook = book => {
  return Promise.all([
    createBook(book.title, book.year),
    createAuthor(book.author),
    Promise.all(
      book.genres.sort().map(genre => {
        return createGenre(genre)
      })
    )
  ]).then(results => {
    const bookId = results[0]
    const authorId = results[1]
    const genreIds = results[2]

    joinBookAuthor(bookId, authorId)

    genreIds.forEach(genreId => {
      joinBookGenre(bookId, genreId)
    })

    book.id = bookId

    return book
  })
}

const BOOKS_QUERY =
  `SELECT books.*,
    (SELECT authors.name FROM authors, book_authors WHERE book_authors.book_id=books.id AND book_authors.author_id=authors.id LIMIT 1) AS author,
    array(SELECT genres.name FROM genres, book_genres WHERE book_genres.book_id=books.id AND book_genres.genre_id=genres.id ORDER BY genres.name ASC) AS genres
  FROM books`

const getBook = (id) => {
  return pgpdb.one(`SELECT * FROM books LIMIT 1 OFFSET ${id}`)
}

const getBooks = ({page, title, author, year, count}) => {
  page = parseInt( page || 1 )
  const offset = ( page - 1 ) * 10

  let params = [ offset ]
  let index = 1
  let clauses = []

  if(count !== undefined ) {
  clauses.push( `SELECT books.id FROM books LIMIT 1 OFFSET $1` , [count])
  params.push( count )
}

if( title !== undefined ) {
  clauses.push( `books.title ILIKE '%\$${++index}^%' ` )
  params.push( title )
}

if( author !== undefined ) {
  clauses.push( `(SELECT authors.name FROM authors, book_authors WHERE book_authors.book_id=books.id AND book_authors.author_id=authors.id LIMIT 1)  ILIKE '%\$${++index}^%' ` )
  params.push( author )
}

if( year !== undefined ) {
  clauses.push( `books.year=\$${++index} ` )
  params.push( year )
}


query = `${BOOKS_QUERY} ${clauses.length > 0 ? `WHERE ${clauses.join( ' AND ' )}` : ''} LIMIT 10 OFFSET $1`

return pgpdb.query( query, params )
}




module.exports = { resetDb, createWholeBook, getBooks }
