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

	getAll: function(req, res, next) {
		User.getAll(function(err, users) {
			if (err) {
				next(err);
			} else {
				res.send(200, users);
			}
		});
	},

	logout: function(req, res, next) {
		req.logOut();
    	res.clearCookie('user_id');
		res.redirect("/");
	},

	push: function(req, res, next) {
		var obj = JSON.parse(req.body.checkin);
		var foursquare_id = obj.venue.id;
		var term =  obj.venue.name;

		API.instagram(foursquare_id, function(insta_err, photos){
			API.wikipedia(term, function(wiki_err, info){
				API.twitter(term, function(twitter_err, tweets){
					User.upsert({ 
						id: obj.user.id, 
						firstName : obj.user.firstName,
						lastName : obj.user.lastName,
						checkin : {
							photos : photos,
							wikipedia: info,
							tweets: tweets,
							name: obj.venue.name,
							shout: obj.shout,
							createdAt: obj.createdAt
						}
					}, function(err){
						if (err) {
							console.log(err);
						}
					});
					console.log('Push: ', term);
				});
			});
		});
		res.send(200);
	}
};