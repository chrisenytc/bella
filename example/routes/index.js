/*
 * GET home page.
 */

var bella = require('../../lib/bella');

exports.index = function(req, res) {
    res.jsonp({
        hello: 'hello world'
    });
};

exports.create = function(req, res) {
    bella.create('userObjectID', req.body.permissions, req.body.ip, req.body.domain, function(err, access_token) {
        res.jsonp({
            msg: 'Auth Key Created: ' + access_token
        });
    });
};

exports.remove = function(req, res) {
    bella.remove(req.query.access_token, function(err, access_token) {
        res.jsonp({
            msg: 'Auth Key Deleted: ' + access_token
        });
    });
};
