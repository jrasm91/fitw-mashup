
var request = require('request');
var util = require('util')
var twitter = require('twitter');

var twit = new twitter({
    consumer_key: '3kFoFUskUOCjp1myuMtktQnmn',
    consumer_secret: 'KMqDjDovEukIOyvpwhLGOy2o1R59SeFymqRWwmXRDyzRJXEPm7',
    access_token_key: '1314980298-4XPgRgVuO5P72pckE5THMM5q8M9cZRMGTfZnL5g',
    access_token_secret: 'QKZuaaGiNgrqcDh34zj8lwmbEutDp7HMfai1RK9sIfAlT'
});


module.exports = {
    instagram: function(foursquare_id, callback){
        var url1 = 'https://api.instagram.com/v1/locations/search?client_id=db6619a8d43a4be09d4c7e4fb4e652e4&foursquare_v2_id=' + foursquare_id;
        request(url1, function(error, response, body) {        
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body).data[0]
                var url2 = 'https://api.instagram.com/v1/locations/' + data.id + '/media/recent?client_id=db6619a8d43a4be09d4c7e4fb4e652e4'
                request(url2, function(error, response, body) {        
                    if (!error && response.statusCode == 200) {
                        var obj = JSON.parse(body);
                        var links = [];
                        for (var i in obj.data){
                            links.push(obj.data[i].images.low_resolution.url);
                        }
                        console.log(links);
                        callback(null, links);
                    } else {
                        console.log('ERROR: [' + response.statusCode + ']' + url2);
                        callback(response.statusCode);
                    }
                });
            } else {
                console.log('ERROR: [' + response.statusCode + ']' + url1);
                callback(response.statusCode);
            }
        });




},

wikipedia: function(term, callback){
    var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exchars=300&exintro=&titles=' + term + '&redirects'
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
},

twitter: function(term, callback){
    twit.search(term, function(data) {
        var tweets = []
        var data = data.statuses
        for (var i in data){
            if(i >= 8){
                break;
            }
            var tweet = data[i]
            tweets.push({
                text: tweet.text,
                user: {
                    name: tweet.user.name,
                    screen_name: tweet.user.screen_name,
                    profile_image_url: tweet.user.profile_image_url
                }
            });
        }
        callback(null, tweets)
    });
}
}