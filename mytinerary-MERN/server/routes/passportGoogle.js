const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require("../model/userModel");



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => {
    done(null, user.id);
  })
  
});



passport.use(new GoogleStrategy({
    clientID: '487141576641-u8seg4dh19n2hos9kim38td5m9f8lreg.apps.googleusercontent.com',
    clientSecret: 'KZNGztTWr5_W2dAXdF42Po1c',
     callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    console.log(profile)

    

    userModel.findOne({googleID: profile.id})
    .then(
      (currentUser) => {
        if (currentUser) {
          //already exists
          console.log ('I remember you,', currentUser.first_name);
          console.log (currentUser)
          return done (null, currentUser)
          
          
        }else {
          //if not, create a new user based on the data from Google account
          new userModel ({
            first_name: profile.name.givenName,
            googleID: profile.id,
            picture: profile.photos[0].value,
            mail: profile._json.email
          }).save().then((newUser) => {
            console.log('welcome, ' + newUser);
            return done(null, newUser)
          })
          
        }
        
      }

      )
     
      
  }
  ));





   