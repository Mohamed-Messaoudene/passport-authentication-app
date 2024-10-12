const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./user");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/signWithFacebook/callback",
    profileFields: ['id', 'emails','photos', 'displayName']
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        // Find the user by their Google ID
        let user = await User.findOne({ facebookId: profile.id });
        
        if (!user) {
          // If the user is not found, create a new user record
          user = new User({
            facebookId: profile.id,
            username: profile.displayName.toLowerCase(),          
            email: profile.emails? profile.emails[0].value : undefined,     
            profilePicture: profile.photos ? profile.photos[0].value : undefined,
            provider:"facebook",
        });
          // Save the newly created user to the database
          await user.save();
        }
        // Pass the user to the done callback to complete the authentication process
        done(null, user);
      } catch (error) {
        // If there's an error, pass it to done
        done(error);
      }
    }
));
passport.serializeUser((user,done)=>{
    done(null,user.facebookId);
});
passport.deserializeUser(async (facebookId,done)=>{
    try{
        const user = await User.findOne({facebookId : facebookId})
        done(null,user);
    }
    catch(err){
        done(err);
    }
})