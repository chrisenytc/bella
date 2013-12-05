
/*
 * GET home page.
 */

var bella = require('../../lib/bella');

exports.index = function(req, res){
   res.json({hello: 'hello world'});
};

exports.create = function(req, res) {
  bella.create('example.com', req.ip, req.body.username, req.body.password, req.body.terminal, function(err, access_token) {
     res.json({msg: 'Auth Key Created: '+ access_token});
  });
};

exports.remove = function(req, res){
   bella.remove(req.body.access_token, function(err, access_token) {
     res.json({msg: 'Auth Key Deleted: '+ access_token});
  });
};
