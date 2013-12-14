var express = require('express');
var async = require('async');
var cheerio = require('cheerio');
var http = require('http');
var app = express();

//Express and Handlebars middlewear Stack
app.use(express.bodyParser());

app.get('/', function(req, res, next){
//code here :P
});

http.createServer(app).listen(80, function() {
  console.log("Listening on port 80");
});