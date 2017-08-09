var express = require('express')
var request = require('request');
var http = require('http')
var app = express()

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'ejs');
});

//app.set('views', '/views')

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/test', function(req, res) {
    request.post('https://s2events.azure-automation.net/webhooks?token=BnQu8dNfv4kSr0DRvuBL88OBelOdTd3qCe%2bFT4O5Ofc%3d', function(error, response, body) {
        console.log('body:', body);
    })
})

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});