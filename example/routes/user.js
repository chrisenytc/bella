/*
 * GET users listing.
 */

exports.list = function(req, res) {

    return res.json({
        user: req.user,
        profile: req.profile,
        token: 'Access Token: ' + req.query.access_token
    });
};
