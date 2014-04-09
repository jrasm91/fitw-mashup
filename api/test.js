
var request = require('request');

var instagram = function(location_id){
    var url = 'https://api.instagram.com/v1/' + location_id + '/media/recent?client_id=db6619a8d43a4be09d4c7e4fb4e652e4'
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

var update = function(callback){
    instagram(function(err, photos){
        if (err) return;

        
    })

};


update();
