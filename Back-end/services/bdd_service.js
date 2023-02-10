var mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = {

    conn : function (){
        var url = "mongodb://"+process.env.USERBDD+":"+process.env.PASSWORD+"@"+process.env.IP+":"+process.env.PORTBDD+"/"+process.env.DB;
        mongoose.set("strictQuery", false);
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("Connexion à la base de données réussie");
        });
    },
};