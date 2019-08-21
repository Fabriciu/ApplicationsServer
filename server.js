var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

var routes = require('./routes/routes')
routes(app)

app.listen(port)

console.log("appserver started and listening on: " + port)