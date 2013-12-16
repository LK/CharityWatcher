var ajax = require('Q').denodeify(require('request'));

module.exports = function(name) {

    var getSource = (function() {

        var request;

        return function getSource() {
            if (!request) {
                request = ajax('http://my.charitywater.org/' + name).then(function(arr) {

                    if (Math.floor(arr[0].statusCode / 100) !== 2) {
                        throw 'Invalid campaign name';
                    }

                    return arr[0];
                });

                request.body = request.then(function(request) {
                    return request.body;
                }).done();
            }

            return request;
        };

    })();

    return {

        id: function() {
            return getSource().body.then(function(body) {
                return parseInt(body.match(/campaign_id\s*=\s*(\d+)/)[1], 10);
            }).done();
        }

    }

};