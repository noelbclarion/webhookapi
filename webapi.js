var express			  = require('express');
var async         = require('async');
var crypto        = require('crypto');
var nodemailer    = require('nodemailer');
var router        = express.Router();
var mailer        = require('express-mailer');
var expressValidator  = require('express-validator');

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