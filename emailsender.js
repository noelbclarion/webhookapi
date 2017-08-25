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

function sendto(req, res, type){
  var emailob = req.body;
  var emailto;
    switch(type){
      case 'Business':
      emailto = 'nclarion@bmfservices.com';
      break;
      case 'Personal':
      emailto = ' miriam@po.lanex.co.jp';
      break;
    };

    app.mailer.send('email', {
    to: emailto, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Client Alert!', // REQUIRED.
    otherProperty: 'Other Property', // All additional properties are also passed to the template as local variables.
    datatable : emailob
  }, function (err, info) {

    if (err) {
      res.send('There was an error sending the email');
      return;
    }

      res.json(emailob);

  });
}

router.post('/emailsender', function(req, res, next) {

  req.checkBody('companyname', 'Company name is required').notEmpty();
  req.checkBody('fullname', 'Full name is required').notEmpty();
  req.checkBody('emailaddress', 'Email address is required').notEmpty();
  req.checkBody('inquirydesc', 'Inquiry description is required').notEmpty();
  req.checkBody('telno', 'Telephone no. is required').notEmpty();
  req.checkBody('agree', 'You should agree the terms and conditions').notEmpty();
  req.checkBody('inquirytype', 'Inquiry type is required').notEmpty();

   req.getValidationResult().then(function(result) {

    if(result.array().length != 0){
// console.log(result.array().length)
     res.status(301).send(result.array()[0].msg);

    }else if(result.array().length === 0){
      var emailob = req.body;
      sendto(req, res, emailob.inquirytype.label);

    }

  });


});


router.get('/webhook', function(req, res, next) {

  var flightonedetails = {
    firstdate : 'May 30, 2020'
  }

  var flightrounttripdetails = {
    firstdate : 'May 30, 2020',
    secondate : 'September 20, 2020'
  }

  res.json(flightrounttripdetails);

});

module.exports = router;