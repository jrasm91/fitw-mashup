var passport = require('passport')
var FoursquareStrategy = require('passport-foursquare').Strategy

var FOURSQUARE_CLIENT_ID = 'M2LRRAD3323NU1GABHSYIQCE40UYRMADV5QTTGZPAZRUZZKU';
var FOURSQUARE_CLIENT_SECRET = 'CQ3EX1J3TUAK1WIZ4JFUCSPEJX4J5NH4CY5QE14EX3ZV0ZHN'

var User = require('./User');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getById(id, done);
});

var machine_address = 'http://ec2-107-20-86-23.compute-1.amazonaws.com/'
passport.use(new FoursquareStrategy({
		clientID: FOURSQUARE_CLIENT_ID,
		clientSecret: FOURSQUARE_CLIENT_SECRET,
		callbackURL: "http://" + machine_address + "/api/login/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		var https = require("https");
		var getJSON = function(options, onResult) {
			var prot = https;
			var req = prot.request(options, function(res) {
				var output = '';
				console.log(options.host + ':' + res.statusCode);
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					output += chunk;
				});
				res.on('end', function() {
					var obj = JSON.parse(output);
					onResult(res.statusCode, obj);
				});
			});
			req.on('error', function(err) {
				//res.send('error: ' + err.message);
			});
			req.end();
		};

		var options = {
			host: 'api.foursquare.com',
			port: 443,
			path: '/v2/users/self/checkins?oauth_token=' + accessToken + '&v=20130205',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		getJSON(options, function(err, json) {
			console.log(json);
			User.findOrCreate(profile._json.response.user, done);
		})


	}
));