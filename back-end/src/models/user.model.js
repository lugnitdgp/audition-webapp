var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var UserSchema = new Schema({
    email: {
        type : String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    password:{
        type : String,
        required: true
    }
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById= function(id,cb){
    User.findById(id,cb);
}

module.exports.getUserByEmail= function(email,cb){
    User.findOne({email : email},cb);
}

module.exports.createUser = function(newUser,cb){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err){
            if(err) throw err;
            newUser.password =hash;
            newUser.save(cb);
        })
    })
}

module.exports.comparePassword= function(myPassword,hash, cb){
    bcrypt.compare(myPassword, hash, function(err, isMatch){
        if(err) throw err;
        cb(null, isMatch)
    })

})