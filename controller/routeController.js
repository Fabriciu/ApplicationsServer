'use strict';

var path = require('path')
var axios = require('axios')
var config = require('./config/config.js')
var querystring = require('querystring')

var MongoClient = require('mongodb').MongoClient
var mongoUrl = config.mongoUrl

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

var url = config.url

exports.loadHome = function (req, res) {
    res.sendFile(path.resolve(__dirname + '../public/index.html'))
};

exports.authorization = function(req, res) {
    axios.post(url, 
        querystring.stringify({
            grant_type: config.grantType,
            client_id: config.clientId,
            client_secret: config.clientSecret
        }), 
        headers)
    .then(function(response) {
        let accessToken = response.data.access_token
        MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if(err) throw err
            let accessTokenInsert = { "_id": 1, "accessToken": accessToken }
            var dbo = db.db("oauth")
            dbo.collection("accessToken").updateOne({_id:1}, {$set:accessTokenInsert}, {upsert:true}, function(err, result) {
                if(err) throw err
                console.log("Access token atualizado com sucesso")
                db.close()
            })
        })
        res.send(accessToken)
    }
    )
    .catch(function(error) {
        console.log(error)
    })
}