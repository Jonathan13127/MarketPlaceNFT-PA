var express = require('express');
var router = express.Router();
var userServices = require('../services/user_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login user*/
router.post('/login', async function(req, res, next) {

  try {

    var result = await userServices.login(req, res);
    res.status(result.code).send(result.message);

   }catch (e) {
    console.log(e);
  }

});

/* POST register user*/
router.post('/register',async function(req, res, next) {

  try {

    var result = await userServices.register(req, res);

    res.status(result.code).send(result.message);

  }catch (e) {
    console.log(e);
  }

});

module.exports = router;
