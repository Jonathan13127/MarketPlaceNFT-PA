const User = require('../models/user');
const bcrypt = require('bcryptjs');
var tokenServices = require('./token_services');
var validator = require('validator');

module.exports = {

    // Login an user
    login: async function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return {"code":400, "message":"Enter email and password"};
        }

        const user = await User.findOne({ email }).then((user) => {
            return user;
        });


        if(!user){
            return {"code":400, "message":"No user found"};
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return {"code":400, "message":"Invalid credentials"};

        const data = {
            id : user._id, 
            username : user.username
        };

        var token = await tokenServices.sign(data);

        user.authTokens.push({token:token});
        await user.save();

        const message = {
            "message":"Login successfuly",
            "token":token
        };

        return {"code":200, "message":message};
    },

    // Logout an user
    logout: async function (req, res) {

        const message = {
            "message":"Logout successfuly"
        };
        return {"code":200, "message":message};
    },

    // Register an user
    register: async function (req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password || !username){
            return {"code":400, "message":"Enter email, username and password"};
        }

        const user = await User.findOne({$or: [ {username} , {email} ] }).then((user) => {
            return user;
        });

        if(user){
            return {"code":400, "message":"User already exists"};
        }

        if(!validator.isEmail(email)){
            return {"code":400, "message":"Email is not valid"};
        }

        const options = { minLength: 12, // Minimum 1é caractères
            minLowercase: 1,    // Minimum 1 minuscule
            minUppercase: 1,    // Minimum 1 majuscules
            minNumbers: 1,    // Minimum 1 chiffre
            minSymbols: 1,  // Minimum 1 symbole
            returnScore: false,     // Retourne le score, si false retourne true ou false sinon retourne un score 
            pointsPerUnique: 1, 
            pointsPerRepeat: 0.5, 
            pointsForContainingLower: 10, 
            pointsForContainingUpper: 10, 
            pointsForContainingNumber: 10, 
            pointsForContainingSymbol: 10 
        };

        var points = validator.isStrongPassword(password, options);

        if(!points){
            return {"code":400, "message":`Password is not strong enough.\n
            Minimum 12 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character`};
        }

        // const hashedPassword = await bcrypt.hash(password, 13); // !!!!!!!!!!!!  HASHÉ LA PASSWORD COTÉ CLIENT

        const newUser = new User({username, email, password: hashedPassword });

        const data = { id : newUser._id, username : newUser.username };

        var token = await tokenServices.sign(data);

        newUser.authTokens.push({token:token});
        await newUser.save();

        const message = { "message":"User registered successfully", "token":token };

        return {"code":200, "message":message};
    },

    // Get an user
    getUser: async function (username) {

        const user = await User.findOne({username: username}).then((user) => {
            return user;
        });

        if(!user){
            return {"code":400, "message":"User not found"};
        }

        return {"code":200, "message":user};
    }

};