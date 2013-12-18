var _ = require('underscore');

module.exports = {

    get: function(req, res, next) {

        var sendError = this.error.apply(this, arguments);

        require('../models/campaign')(req.body.campaignName).id()
            .then(function(id) {
                res.json({ status: 'completed', response: id });
            }).fail(sendError).done();
    },

    error: function(req, res) {
        return function(reason) {

            if (reason instanceof Error) {
                reason = reason.message;
            }

            res.json(400, {
                status: 'failed',
                reason: reason
            });
        }
    }

};

// @todo Can probably clean this up?
_.bindAll.apply(_, [module.exports].concat(_.functions(module.exports)));