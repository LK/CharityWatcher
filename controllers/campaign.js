var _ = require('underscore');

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

        var sendError = this.error.apply(this, arguments);
        var model     = this.Model.get(req.body.campaignName);

        model.id().then(function(id) {
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

});

module.exports = CampaignController;