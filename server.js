// server.js
// where your node app starts

// init project
const express = require('express')
const bp = require( 'body-parser' )
const req = require('request');

const app = express()

var interestingStatuses = [ 'Succeeded', 'Failed' ]

app.use(bp.json())

app.get("/", (request, response) => {
  response.status(200).send( 'This is an API.' )
})

app.post("/", (request, response) => {
  
  try {
    var activityLog = request.body.data.context.activityLog

    var addtnlInfo = ''
    if( activityLog.properties && activityLog.properties.statusMessage ) {
      addtnlInfo = `(additional information: ${activityLog.properties.statusMessage})`
    }

    var message = `${activityLog.caller} requested ${getUsefulIdentifier( activityLog.operationName )} on ${getUsefulIdentifier( activityLog.resourceId )} with result ${activityLog.status} ${addtnlInfo}. This is a(n) ${activityLog.level} message.`
    console.log(message);
    if ( interestingStatuses.includes( activityLog.status ) ) {

      req.post({'url': process.env.SLACK_WEBHOOK_URI, 'body': {'text': message}, json: true}, function( err, response, body ) {
        if( err ) {
          console.log( err )
        }
      })

    } else {

      console.log( activityLog.status )
      // console.log( activityLog.body )

    }
    
    response.status( 200 ).send()
    
  } catch( err ) {
    console.log( err )
    // console.log( request.body )
    response.status( 500 ).send()
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