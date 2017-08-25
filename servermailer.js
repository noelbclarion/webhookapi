var express           = require('express');
var bodyParser        = require('body-parser');
    app               = express(),
    cors              = require('cors');
var expressValidator  = require('express-validator');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(expressValidator());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var nodemailer = require('./emailsender');

app
.use('/sendinquiry', nodemailer); 

app.listen(4004, function(){

  console.log('Express server listening on port ' + 4004);

});