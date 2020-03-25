const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/user.model');
const config = require('./database');
const GoogleStrategy = require('passport-google-oauth20')

//------------------------adddition-------------------


//---------------------------------------addition------------------------
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
}))


passport.serializeUser((user, done)=>{
   done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);

    })
 })
 
passport.use( new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: '756288555577-sekelm1hj5up8it9f9r383luvfeg0auj.apps.googleusercontent.com',
    clientSecret:'Ew54i7RRnHb6bwE1VIaIxjSk'
    },(accessToken, refreshToken, profile, done)=>{
        User.findOne({password:profile.id}).then((currentUser)=>{
                    if(currentUser){
                        console.log('Existing User: ' + currentUser)
                        done(null, currentUser);
                    }
                    else{
                        new User({
                            UserName: profile.displayName,
                            email: profile.displayName,
                            password: profile.id
                        }).save().then((newUser)=>{
                            console.log(newUser)
                            done(null, newUser)
                        })
                    }
        })
            
    }))
}
