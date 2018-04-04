// server.js
// where your node app starts

// init project
const express = require('express')
const bp = require( 'body-parser' )
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(bp.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.status(200).send( 'This is an API.' )
})

app.post("/", (request, response) => {
  console.log( request.body )
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
