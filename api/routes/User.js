/*
 * GET users listing.
 */
 var fs = require('fs');
 var FILE_NAME = 'data/users2.json'

 var openFile = function(cb) {
 	fs.readFile(FILE_NAME, 'utf8', function(err, data) {
 		cb(err, JSON.parse(data));
 	});
 };

 var saveFile = function(data, cb) {
 	fs.writeFile(FILE_NAME, JSON.stringify(data, null, 4), cb);
 }

 module.exports = {
 	getById: function(id, cb) {
 		openFile(function(err, users) {
 			if (err) {
 				cb(err);
 			} else if (users[id] != undefined) {
 				cb(null, users[id]);
 			} else {
 				cb(null, {});
 			}
 		});
 	},
 	
 	getAll: function(cb) {
 		openFile(cb);
 	},

 	upsert: function(user, cb) {
 		var new_user = {
 			id : user.id,
 			photo : user.photo || "",
 			firstName : user.firstName || "",
 			lastName : user.lastName || "",
            checkin : user.checkin
 		};
 		openFile(function(err, users) {
 			if (err) {
 				cb(err);
 			} else {
 				users[user.id] = new_user;
 				saveFile(users, function(err) {
 					cb(err, new_user);
 				});
 			}
 		});
 	}
 };