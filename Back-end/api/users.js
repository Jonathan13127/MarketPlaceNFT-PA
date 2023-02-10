var express = require('express');
var router = express.Router();
var userServices = require('../services/user_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login user*/
router.post('/login', function(req, res, next) {

  try {

    var result = userServices.login(req, res);
    switch (result) {
      case 400:
        res.send("Enter email and password");
        break;
      case 200:
        res.send("Login successfuly");
    }

  }catch (e) {
    console.log(e);
  }

});

/* POST register user*/
router.post('/register', function(req, res, next) {

  try {

    var result = userServices.register(req, res);

    switch (result) {
      case 400:
        res.send("Enter email and password");
        break;
      case 200:
        res.send("Login successfuly");
    }

  }catch (e) {
    console.log(e);
  }

});

module.exports = router;
