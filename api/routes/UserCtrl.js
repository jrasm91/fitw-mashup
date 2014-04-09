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

		console.log(JSON.stringify('Body', req.body, null, 4));

		var user_id = '123';
		var foursquare_id = '4ef0e7cf7beb5932d5bdeb4e';
		var firstName = 'Jason';
		var term = 'Brigham Young University';

		API.instagram(foursquare_id, function(insta_err, photos){
			API.wikipedia(term, function(wiki_err, info){
				API.twitter(term, function(twitter_err, tweets){
					User.update({ 
						id: user_id, 
						firstName : firstName,
						checkin : {
							photos : photos,
							wikipedia: info,
							tweets: tweets
						}
					}, function(){});

					console.log('Photos: ', photos);
					console.log('Info: ', info);
					console.log('Tweets: ', tweets);
				});
			});
		});
		res.send(200);
	}
};