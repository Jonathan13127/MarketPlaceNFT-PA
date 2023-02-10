const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {

    // Login an user
    login: async function (req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return {"code":400, "message":"Enter email and password"};
        }

        const user = await User.findOne({$or: [ {username} , {email} ] }).then((user) => {
            return user;
        });


        if(!user){
            return {"code":400, "message":"No user found"};
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return {"code":400, "message":"Invalid credentials"};

        return {"code":200, "message":"Login successfuly"};
    },

    // Register an user
    register: async function (req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return {"code":400, "message":"Enter email and password"};
        }

        const user = await User.findOne({$or: [ {username} , {email} ] }).then((user) => {
            return user;
        });

        console.log(user);
        if(user){
            return {"code":400, "message":"User already exists"};
        }

        // const hashedPassword = await bcrypt.hash(password, 13); !!!!!!!!!!!!  HASHÉ LA PASSWORD COTÉ CLIENT

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        return {"code":200, "message":"User registered successfully"};
    }

};