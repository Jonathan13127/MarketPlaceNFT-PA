var express = require('express');
var router = express.Router();
var userServices = require('../services/user_service');
var auth = require('../middlewares/auth');

/* POST register user*/
router.post('/register', async function (req, res, next) {

  try {

    var result = await userServices.register(req, res);
    
    res.header('Access-Control-Allow-Credentials', 'true');

    res.cookie('access_token', result.message.token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(result.code).send({ response: result.message });

  } catch (e) {
    console.log(e);
  }

});

/* POST delete an user account*/
router.delete('/deleteAccount',auth, async function (req, res, next) {

  try {

    var result = await userServices.deleteAccount(req, res);

    res.status(result.code).send({ response: result.message });

  } catch (e) {
    console.log(e);
  }

});

/* POST login user*/
router.post('/login', async function (req, res, next) {

  try {

    if(req.cookies["token"]){
      console.log("on est ici");

    }

    var result = await userServices.login(req, res);
    console.log(result);

    res.cookie("token",result.message.token)

    res.status(result.code).send({ response: result.message });

  } catch (e) {
    console.log(e);
  }

});

/* PUT update informations user*/
router.put('/update',auth,async function (req,res,next){

});

/* POST logout user*/
router.post('/logout', auth, async function (req, res, next) {
  try {

    var result = await userServices.logout(req, res);

    res.status(result.code).send({ response: result.message });

  } catch (error) {
    res.status(500);
  }

});

router.get('/me', auth, async function (req, res, next) {
  try {
    res.send(req.user);
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/validateToken', auth, async function (req, res, next) {
  try {
    res.send({ valid: true });
  } catch (e) {
    res.status(500);
  }
});

/* GET Info user*/
router.get('/getUser/:username', auth, async function (req, res, next) {
  try {

    var username = req.params.username;

    var result = await userServices.getUser(username);

    res.status(result.code).send({ response: result.message });
  } catch (e) {
    res.status(500);
  }

});

module.exports = router;
