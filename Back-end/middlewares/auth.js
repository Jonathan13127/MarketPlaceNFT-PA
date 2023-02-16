const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);;
        const user = await User.findOne({ _id: decoded.user.id, 'authTokens.token': token });
        
        if (!user) {
            res.status(401).json({ msg: 'Merci de vous connecter.' });
            res.end();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;