# TDD Bookstore

Your goal is to get to this:

```
$ yarn test
> mocha ./test/setup.js --recursive test/

  HTTP Server
    GET /ping
      ✓ should respond with "pong"
    POST /api/books
      ✓ should create a book
      when missing title
        ✓ should render 400 bad request
    with fixture data
      GET /api/books
        ✓ should render 10 books
      GET /api/books?page=2
        ✓ should render the next 10 books
      GET /api/books?author=phILip
        ✓ should render books with authors named "Philip" (case insensitive)
      GET /api/books?title=wORld
        ✓ should render books with a title including "world" (case insensitive)
      GET /api/books?year=1953
        ✓ should render books published in 1953
      GET /api/books?year=1953&title=th
        ✓ should render books published in 1953 and with a title that includes the string "th"
      GET /api/authors
        ✓ should render 10 authors
      GET /api/authors?page=2
        ✓ should render the next 10 authors
      GET /api/books/12
        when the book exists
          ✓ should render book 12
        when the book doesn't exist
          ✓ should render nothing with status 404
      GET /api/genres
        ✓ should render up to 10 genres
      POST /api/book/12
        ✓ should update the book
      POST /api/book/12/delete
        ✓ should delete the book


  16 passing (4s)
```

**Get All The Tests To Pass! :D**

Your task is to make [all these tests](https://github.com/GuildCrafts/tdd-bookstore/blob/master/test/server_test.js) pass by designing a database schema and writing code within `/server`.

## Setup

```sh
npm i -g yarn
yarn
```

## Red... Green... Refactor

```sh
npm test
# I dentify one broken test
# Change the code in /server to make the test pass
# Refactory your code (clean it up)
# rise and repeat until all tests pass
```

**WARNING: DO NOT EDIT ANY FILES WITHIN /test**

## Pro Tips

- You must use an express server
- Feel free to `npm install` any packaged you might need
- You should use a database of some kind
- You need to make the HTTP endpoint for resetting your database
- The tests only interact with your code via HTTP requests to your express app
- `npm test -- --watch` to run your tests after any change


## Error? Questions?

![](https://lh3.googleusercontent.com/-r7k2j4tHMF4/U8Uxk0ttZGI/AAAAAAAAD2s/o-VioN21Jpo/w506-h380/when-all-tests-pass-fs8.png)

Jared wrote this :P
