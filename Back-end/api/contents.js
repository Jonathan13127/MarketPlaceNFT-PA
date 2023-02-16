var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');


/* GET content */
router.get('/',auth, async function(req, res, next) {

    try {

        res.send("Ressources protégées");
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;