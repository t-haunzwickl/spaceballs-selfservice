var express = require('express')
var request = require('request');
var app = express()

//app.set('views', '/views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/test', function(req, res) {
    request.post('https://s2events.azure-automation.net/webhooks?token=BnQu8dNfv4kSr0DRvuBL88OBelOdTd3qCe%2bFT4O5Ofc%3d', function(error, response, body) {
        console.log('body:', body);
    })
})

app.listen(8082)