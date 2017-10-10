
// Node framework dependecies
// -----------------------------------------------------------------------------
var express = require('express');
var session = require('express-session');
var request = require('request');
var http = require('http');
var bodyParser = require('body-parser');
var basicAuth = require('express-basic-auth');

// Initialize ExpressJS app
// -----------------------------------------------------------------------------
var app = express();

request.debug = true

// Local variables
// -----------------------------------------------------------------------------
app.locals.title = 'SPACEBALLS.IO self service portal';

// Session variables
// -----------------------------------------------------------------------------
app.use(session({
    secret:'Sisoej333444osls.x',
    resave: true,
    saveUninitialized: true
}));

// Views & templateing engine setup
// -----------------------------------------------------------------------------
app.set('view engine', 'ejs');

/*app.use(function(req, res, next) {
    next();
    /*if (req.session.system == null) {
        res.redirect('/');
    } else {
        next();
    }
});*/

app.use(basicAuth({
    users: { 'azure': 'test' },
    challenge: true,
    realm: 'jsdfo234S'
}))

app.use('/img',express.static(__dirname + '/public/img'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/fonts',express.static(__dirname + '/public/fonts'));
app.use('/icons-reference',express.static(__dirname + '/public/icons-reference'));

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Routes
// -----------------------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('pages/index', {
        session: req.session
    })
});

app.get('/vm', function(req, res) {
    res.render('pages/virtual_machine')
});

app.get('/development', function(req, res) {
    res.render('pages/development')
});

app.get('/webapp', function(req, res) {
    res.render('pages/webapp')
});

app.get('/prod', function(req, res) {
    res.render('pages/prod')
});

app.post('/webapp/create', jsonParser, function(req, res) {

    var jsonObject = req.body;

    var headersOpt = {  
        "content-type": "application/json",
    };

    request(
        {
            method: 'post',
            url: 'https://s2events.azure-automation.net/webhooks?token=2mn6820HxKbSMYeo6geKj%2bj158N8CL7ynLe10L4OKug%3d',
            body: jsonObject,
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {
            console.log('REQUEST RESULTS:', error, response.statusCode, body);
        }
    )
  
    /*request.post('http://www.greco.at', function(error, response, body) {
        console.log('body:', body);
    })*/
});

app.post('/development/create', jsonParser, function(req, res) {
        var jsonObject = req.body;
   
        var headersOpt = {  
            "content-type": "application/json",
        };
    
        var rgName = jsonObject.team + "-" + jsonObject.environment + "-rg"

        var dataObject = {
            "rgName": rgName,
            "location": jsonObject.location,
            "templateParameters": {
                "team": {"value": jsonObject.team},
                "environment": {"value": jsonObject.environment}
            }
        }

        console.log (dataObject);

        request(
            {
                method: 'post',
                url: 'https://prod-40.westeurope.logic.azure.com:443/workflows/def5e8044c53431f8c83957a7eecf8fc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fCM_uQwYxW3EGfdrwXAMecovsinydoMx4tQoW_TdzAA',
                body: dataObject,
                headers: headersOpt,
                json: true,
            }, function (error, response, body) {
                console.log('REQUEST RESULTS:', error, response.statusCode, body);
            }
        )

        res.send('Done!');
})


// Start server
// -----------------------------------------------------------------------------
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});