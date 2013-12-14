var async = require('async');
var cheerio = require('cheerio');
var request = require('request');

exports.getCampaignCode = function(req, res, next){
	if(req.body.campaignName != undefined){
	request('http://my.charitywater.org/'+req.body.campaignName, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var pattern = /campaign_id\s*=\s*(\d+)/;
	    res.send(200,'{"status": "completed", "response": "'+pattern.exec(body)[0].substring(12)+'"}');
	  }else{
      res.send(400,'{"status": "failed", "reason": "invalid campaignName"}');
	  }
	});
  }else{
  res.send(400,'{"status": "failed", "reason": "empty campaignName"}');
  }
}