var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var UserSchema = new Schema({
    UserName: String,
    email: {
        type : String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true
    },
    role:{
        type: String,
        required: false,
        default: 's'
    },
    flag:{
        type: Boolean,
        default: false
    },
    clearance:{
        type: Number,
        required: false
    }
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById= function(id,cb){
    var a = mongoose.Types.ObjectId(id);
    User.findOne({_id: a},cb);
}

module.exports.getUserByEmail= function(email,cb){
    User.findOne({email : email},cb);
}

module.exports.createUser = function(newUser,cb){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(hash){
            newUser.password =hash;
            newUser.save(cb);}
        })
    })
}

module.exports.comparePassword= function(myPassword,hash, cb){
    bcrypt.compare(myPassword, hash, function(err, isMatch){
        if(err) throw err;
        cb(null, isMatch)
    })

}