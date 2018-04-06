// server.js
// where your node app starts

// init project
const express = require('express')
const bp = require( 'body-parser' )
const req = require('request');

const app = express()

var interestingStatuses = [ 'Succeeded' ]

app.use(bp.json())

app.get("/", (request, response) => {
  response.status(200).send( 'This is an API.' )
})

app.post("/", (request, response) => {
  
  var activityLog = request.body.data.context.activityLog
  // console.log( activityLog.caller )
  // console.log( activityLog.operationName )
  // console.log( activityLog.resourceId )
  // console.log( activityLog.status )
  // console.log( activityLog.level )
  var message = `${activityLog.caller} requested ${getUsefulIdentifier( activityLog.operationName )} on ${getUsefulIdentifier( activityLog.resourceId )} with result ${activityLog.status}. This is a(n) ${activityLog.level} message.`
  console.log(message);
  if ( interestingStatuses.includes( activityLog.status ) ) {

    req.post({'url': process.env.SLACK_WEBHOOK_URI, 'body': {'text': message}, json: true}, function( err, response, body ) {
      if( err ) {
        console.log( err )
      }
     // console.log( response )
     // console.log( body )
    })
    
  } else {
    
    console.log( activityLog.status )
    
  }    
  
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

function getUsefulIdentifier( longId ) {
  var idChunksArray = longId.split( '/' )
  return idChunksArray.slice(-2).join( "/" )
}