/**
 * Module dependencies.
 */

var express = require('express');
var UserCtrl = require('./routes/UserCtrl');
var oauth = require('./routes/oauth');
var passport = require('passport')
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require("fs")
var app = express();

// all environments
app.set('port', process.env.PORT || 443);
// app.set('ssl_port', process.env.SSL_PORT || 5001);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/api/user', UserCtrl.getAll);
app.get('/api/user/:id', UserCtrl.getById);
app.post('/api/push', UserCtrl.push);

app.get('/api/logout', UserCtrl.logout);
app.get('/api/login', passport.authenticate('foursquare'));
app.get('/api/login/callback', passport.authenticate('foursquare', {
    failureRedirect: '/#/login'
}), function(req, res) {
    res.redirect('/');
});

https.createServer({
    cert: fs.readFileSync('./ssl/certificate.pem'),
    key: fs.readFileSync('./ssl/server.key'),
    passphrase: 'serverpass'
}, app).listen(app.get('port'), function() {
    console.log('HTTPS server listening on port ' + app.get('port'));
});