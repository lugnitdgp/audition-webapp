
const User = require('../src/models/user.model');
const FacebookStrategy = require('passport-facebook')

module.exports = function (passport) {

passport.use(new FacebookStrategy({
    clientID: process.env.FB_OAUTH_CLIENT_ID,
    clientSecret: process.env.FB_OAUTH_CLIENT_SECRET,
    //callbackURL: "/auth/facebook/redirect"
    callbackURL: process.env.FB_CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
      console.log(profile)
    User.findOne({ password: profile.id }).then((currentUser) => {
        if (currentUser) {
            console.log('Existing User: ' + currentUser)
            done(null, currentUser);
        }
        else {
            new User({
                UserName: profile.displayName,
                email: profile.displayName,
                password: profile.id
            }).save().then((newUser) => {
                console.log(newUser)
                done(null, newUser)
            })
        }
    })

}))

}