/*
* GET users listing.
*/

var User = require('./User');
var request = require('request');

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
		var instagram = function(location_id, callback){
			var url = 'https://api.instagram.com/v1/locations/' + location_id + '/media/recent?client_id=db6619a8d43a4be09d4c7e4fb4e652e4'
			request(url, function(error, response, body) {        
				if (!error && response.statusCode == 200) {
					var obj = JSON.parse(body);
					var links = [];
					for (var i in obj.data){
						links.push(obj.data[i].images.low_resolution.url);
					}
					callback(null, links);
				} else {
					console.log('ERROR: [' + response.statusCode + ']' + url);
					callback(response.statusCode);
				}
			});
		}

		var wikipedia = function(term, callback){
			var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exchars=300&exintro=&titles=' + term
			request(url, function(error, response, body) {        
				if (!error && response.statusCode == 200) {
					var obj = JSON.parse(body);
					var number = Object.keys(obj.query.pages)[0];
					var result = obj.query.pages[number];
					console.log(result);
					callback(null, result);
				} else {
					console.log('ERROR: [' + response.statusCode + ']' + url);
					callback(response.statusCode);
				}
			});
		};

		var user_id = '123';
		var location_id = '1000';
		var firstName = 'Jason';
		var term = 'Brigham Young University';

		instagram(location_id, function(insta_err, photos){
			wikipedia(term, function(wiki_err, info){
				User.update({ 
					id: user_id, 
					checkin : {
						photos : photos,
						wikipedia: info
					},
					firstName : firstName
				}, function(){});
			});
		});

		res.send(200);
	}
};