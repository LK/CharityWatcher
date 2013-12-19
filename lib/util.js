module.exports = {

    wrapObject: function(name) {
        return function(object) {

            var wrapped = {};

            wrapped[name] = object;

            return wrapped;
        };
    }

};