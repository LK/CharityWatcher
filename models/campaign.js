var Q       = require('Q');
var request = Q.denodeify(require('request'));
var _       = require('underscore');

function CampaignModel(name) {
    // @todo Can probably clean this up?
    _.bindAll.apply(_, [this].concat(_.functions(this)));

    this.name     = name;
    this._request = null;
}

CampaignModel.get = function(name) {
    return new CampaignModel(name);
};

_.extend(CampaignModel.prototype, {

    _getRequestUrl: function() {
        return 'http://my.charitywater.org/' + this.name;
    },

    _getRequest: function() {
        if (!this.name || typeof this.name !== 'string') {
            return Q.reject(new Error('Empty campaign name'));
        }

        if (!this._request) {

            var url = this._getRequestUrl();

            this._request = request(url).then(function(arr) {

                if (Math.floor(arr[0].statusCode / 100) !== 2) {
                    throw new Error('Invalid campaign name');
                }

                return arr[0];
            });
        }

        return this._request;
    },

    _getBody: function() {

        if (!this._body) {
            this._body = this._getRequest().then(function(req) {
                return req.body;
            });
        }

        return this._body;
    },

    id: function() {
        return this._getBody().then(function(body) {
            return Number(body.match(/campaign_id\s*=\s*(\d+)/)[1]);
        });
    }

});

module.exports = CampaignModel;