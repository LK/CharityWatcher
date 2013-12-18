var express  = require('express');
var app      = express();
var campaign = require('./controllers/campaign');

// Express and Handlebars middlewear Stack
app.use(express.bodyParser());

app.get('/', function(req, res, next) {
	// code here :P
});

app.post('/getCampaignID', campaign.get);

app.listen(80, function() {
	console.log('Listening on port 80');
});