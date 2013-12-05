
/*
 * GET users listing.
 */

exports.list = function(req, res){
  return res.json({token: 'Access Token: ' + req.query.access_token});
};
