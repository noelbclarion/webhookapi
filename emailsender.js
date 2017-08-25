var express			  = require('express');
var async         = require('async');
var crypto        = require('crypto');
var nodemailer    = require('nodemailer');
var router        = express.Router();
var mailer        = require('express-mailer');
var expressValidator  = require('express-validator');

// Xpress Validator
router.use(expressValidator({

  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }

}));

mailer.extend(app, {
  from: 'no-reply@po.lanex.co.jp',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'noelbclarion@gmail.com',
    pass: 'Clarion2191@'
  }
});

router.get('/webhook', function(req, res, next) {

  var flightonedetails = {
    firstdate : 'May 30, 2020'
  }

  var flightrounttripdetails = {
    startdate : 'May 30, 2020',
    returndate : 'September 20, 2020'
  }

  res.json(flightrounttripdetails);

});

module.exports = router;