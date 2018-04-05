// server.js
// where your node app starts

// init project
const express = require('express')
const bp = require( 'body-parser' )
const app = express()

var usefulStatuses = "[ 'Succeeded', "

app.use(bp.json())

app.get("/", (request, response) => {
  response.status(200).send( 'This is an API.' )
})

app.post("/", (request, response) => {
  console.log( request.body.data.context.activityLog.caller )
  console.log( request.body.data.context.activityLog.operationName )
  console.log( request.body.data.context.activityLog.resourceId )
  console.log( request.body.data.context.activityLog.status )
  console.log( request.body.data.context.activityLog.level )
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
