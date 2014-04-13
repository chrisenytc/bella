/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var Bella = require('../lib/bella');

var app = express();

//

function isDev() {
    if ('development' === app.get('env')) {
        return true;
    } else {
        return false;
    }
}

var db = mongoose.connect('mongodb://localhost/belladb', function(err) {
    if (err) {
        throw err;
    }
    if (isDev()) {
        console.log('Connected successfully with MongoDB.');
    }
});

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    access_token: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: Array,
        default: ['user']
    },
    status: {
        type: Boolean,
        required: true
    },
});

mongoose.model('User', userSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(Bella.init(mongoose, {
    connection: mongoose.connection,
    status: true
}));
app.use(app.router);

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/create', routes.create);
app.del('/remove', routes.remove);
app.get('/users', Bella.authenticate('user'), user.list);

var server = http.createServer(app).listen(app.get('port'), function() {
    if (isDev()) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});

exports = module.exports = server;
