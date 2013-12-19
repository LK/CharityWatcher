var _    = require('underscore');
var util = require('../lib/util');
var Q    = require('Q');

function CampaignController(Model) {
    // @todo Can probably clean this up?
    _.bindAll.apply(_, [this].concat(_.functions(this)));

    this.Model = Model;
};


CampaignController.get = function(Model) {
    return new CampaignController(Model);
};

_.extend(CampaignController.prototype, {

    get: function(req, res, next) {

        var sendError   = this.error.apply(this, arguments);
        var sendSuccess = this.success.apply(this, arguments);
        var model       = this.Model.get(req.params.name);

        Q.all([model.id()])
            .spread(this.getCamaignObject)
            .then(util.wrapObject('campaign'))
            .then(sendSuccess)
            .fail(sendError)
            .done();
    },

    getCamaignObject: function(id) {
        return { id: id };
    },

    success: function(req, res) {
        return function(response) {
            res.json({
                status: 'completed',
                response: response
            });
        }
    },

    error: function(req, res) {
        return function(reason) {

            if (reason instanceof Error) {
                // @todo Might want to differentiate between response
                // errors and code errors somehow.
                console.error(reason.stack);

                reason = reason.message;
            }

            res.json(400, {
                status: 'failed',
                reason: reason
            });
        }
    }

});

module.exports = CampaignController;