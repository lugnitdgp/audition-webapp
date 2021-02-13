const User = require("../src/models/user.model");
const GitHubStrategy = require("passport-github2");

module.exports = function (passport) {
  const fetch = require('node-fetch');
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
        scope: ['user:email'],
      },
      (accessToken, refreshToken, profile, done) => {
        var options = {
          headers: {
            'User-Agent': 'JavaScript.en',
            'Authorization': 'token ' + accessToken
          },
          json: true,
          url: 'https://api.github.com/user/emails'
        };
        fetch('https://api.github.com/user/emails', {
          json: true,
          headers: {
            'User-Agent': 'JavaScript.en',
            'Authorization': 'token ' + accessToken
          },
        })
          .then(res => res.json())
          .then(json => {
            console.log(json)
            var emails = json.filter(function (email) {
              return email.verified;
            });

            if (!emails.length) {
              return done(null, false);
            }
            profile.emails = emails;

            console.log(profile)
            User.findOne({ email: profile.emails[0].email }).then((currentUser) => {
              if (currentUser) {
                console.log("Existing User: " + currentUser);
                done(null, currentUser);
              } else {
                new User({
                  UserName: profile.displayName,
                  email: profile.emails[0].email,
                  password: profile.id,
                  mode: 'github'
                })
                  .save()
                  .then((newUser) => {
                    done(null, newUser);
                  });
              }
            });
          }).catch(err => {
            console.error(err)
            done(null, false)
          });
        // get emails using oauth toke

      }
    )
  );
};
