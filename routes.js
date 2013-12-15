var async = require('async');
var cheerio = require('cheerio');
var request = require('request');

exports.getCampaignCode = function(req, res, next){
	if(req.body.campaignName != undefined){
	request('http://my.charitywater.org/'+req.body.campaignName, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var pattern = /campaign_id\s*=\s*(\d+)/;
	    res.send(200,JSON.stringify(status: "completed", response: pattern.exec(body)[0].substring(12)));
	  }else{
      res.send(400,JSON.stringify(status: "failed", reason: "invalid campaign name"));
	  }
	});
  }else{
  res.send(400,JSON.stringify(status: "failed", reason: "empty campaign name"));
  }
}