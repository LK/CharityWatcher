exports.getCampaignCode = function(req, res, next) {

	if (typeof req.body.campaignName === 'undefined') {
		res.send(400, {
			status: 'failed',
			reason: 'Empty campaign name'
		});
	} else {
		require('./lib/campaign')(req.body.campaignName).id()
			.then(function(id) {
				res.send(200, { status: 'completed', response: id });
			}, function(reason) {
				res.send(400, { status: 'failed', reason: reason.toString() })
			}).done();
	}
}