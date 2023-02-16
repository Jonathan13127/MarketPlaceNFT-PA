const jwt = require('jsonwebtoken');

module.exports = {

    sign: async function (user) {
        return jwt.sign({user}, process.env.JWT_SECRET, {algorithm:'RS256',expiresIn: '24h'});
    }

}