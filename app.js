var express = require('express');
var routes  = require('./routes');
var app     = express();

// Express and Handlebars middlewear Stack
app.use(express.bodyParser());

app.get('/', function(req, res, next) {
	// code here :P
});

app.post('/getCampaignID', function(req, res, next) {
	routes.getCampaignCode(req, res, next);
});

app.listen(80, function() {
	console.log('Listening on port 80');
});