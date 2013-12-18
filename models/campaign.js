var Q    = require('Q');

var ajax = Q.denodeify(require('request'));

module.exports = function(name) {

    var getRequest = (function() {

        var request;

        return function getRequest() {

            if (!name || typeof name !== 'string') {
                // Unfortunately we're not in promise-context here
                // so we have to manually construct a rejected promise.
                // @todo Clean this up
                return Q.reject(new Error('Empty campaign name'));
            }

            if (!request) {
                request = ajax('http://my.charitywater.org/' + name).then(function(arr) {

                    if (Math.floor(arr[0].statusCode / 100) !== 2) {
                        throw new Error('Invalid campaign name');
                    }

                    return arr[0];
                });
            }

            return request;
        };

    })();

    var getBody = function() {
        return getRequest().then(function(request) {
            return request.body;
        });
    };

    return {

        id: function() {
            return getBody().then(function(body) {
                return parseInt(body.match(/campaign_id\s*=\s*(\d+)/)[1], 10);
            });
        }

    }

};