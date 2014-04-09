/*
* GET users listing.
*/

var User = require('./User');
var API = require('./API');

module.exports = {

	getById: function(req, res, next) {
		User.getById(req.params.id, function(err, user) {
			if (err)
				next(err);
			else
				res.send(200, user);
		})
	},

	create: function(req, res, next) {
		User.create(req.body.user, function(err, result) {
			if (err)
				next(err);
			else
				res.send(200, result);
		})
	},

	getAll: function(req, res, next) {
		User.getAll(function(err, users) {
			if (err) {
				next(err);
			} else {
				res.send(200, users);
			}
		})
	},

	logout: function(req, res, next) {
		req.logOut();
		res.redirect("/");
	},

	push: function(req, res, next) {

		var obj = JSON.parse(req.body.checkin);
		var user_id = obj.user.id;
		var foursquare_id = obj.venue.id;
		var firstName = obj.user.firstName;
		var lastName = obj.user.lastName
		var term =  obj.venue.name;

		API.instagram(foursquare_id, function(insta_err, photos){
			API.wikipedia(term, function(wiki_err, info){
				API.twitter(term, function(twitter_err, tweets){
					User.findOrCreate({ 
						id: user_id, 
						firstName : firstName,
						lastName : lastName,
						checkin : {
							photos : photos,
							wikipedia: info,
							tweets: tweets
						}
					}, function(){});
					console.log('Push: ', term);
				});
			});
		});
		res.send(200);
	}
};