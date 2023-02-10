module.exports = {
    // Get all users
    getAllUsers: function (req, res) {
        // Get all users from database
        // Return all users
    },

    // Login an user
    login: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return 400;
        }

        return 200;
    },

    // Register an user
    register: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return 400;
        }

        return "Register"
    }

};