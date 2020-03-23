const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/user.model');
const config = require('./database');
module.exports = function(passport){
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
User.getUserById(jwt_payload.id, (err, User) => {
if(err){
return done(err, false);
}
if(User){
return done(null, User);
} else {
return done(null, false);
}
});
}));
}
