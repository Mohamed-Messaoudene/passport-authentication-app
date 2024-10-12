const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("./user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/signWithGoogle/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
   try {
        // Find the user by their Google ID
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          // If the user is not found, create a new user record
          user = new User({
            googleId: profile.id,
            username: profile.displayName.toLowerCase(),          
            email: profile.emails[0].value,     
            profilePicture: profile.photos[0].value,
            provider:"google"
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
    done(null,user.googleId);
});
passport.deserializeUser(async (googleId,done)=>{
    try{
        const user = await User.findOne({googleId : googleId})
        done(null,user);
    }
    catch(err){
        done(err);
    }
})