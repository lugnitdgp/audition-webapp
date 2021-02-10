const User = require("../src/models/user.model");
const GitHubStrategy = require("passport-github2");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GitHubStrategy(
      {
        callbackURL: process.env.GITHUB_CALLBACK,
        clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
          if (currentUser) {
            console.log("Existing User: " + currentUser);
            done(null, currentUser);
          } else {
            new User({
              UserName: profile.displayName,
              email: profile.emails[0].value,
              password: profile.id,
              mode:'github'
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );
};
