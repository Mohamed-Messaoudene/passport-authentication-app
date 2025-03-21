const GitHubStrategy = require("passport-github2").Strategy;
const passport = require('passport');
const User = require(".//user"); 

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/signWithGithub/callback",
      scope: ["user:email"], // Request access to user's email
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let email = null;
        // If the email is available in profile, use it
        if (profile.emails && profile.emails.length>0) {
          email = profile.emails[0].value;
        } else {
          // If email is not present in profile, make an API call to get it
          const response = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${accessToken}`,
              'User-Agent': 'authentication app',
            },
          });
          const emails = await response.json();
          const primaryEmail = emails.find((email) => email.primary && email.verified);
          if (primaryEmail) {
            email = primaryEmail.email;
          }
        }

        // Find the user by GitHub ID
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            githubId: profile.id,
            email: email || null,  // Use fetched email if available
            username: profile.displayName,
            provider: "github",
            profilePicture: profile.photos? profile.photos[0].value : undefined,
          });
        } else if (!user.email && email) {
          // If the user exists but doesn't have an email, update the email field
          user.email = email;
        }

        // Save the user (whether new or updated)
        await user.save();
        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user,done)=>{
  done(null,user.githubId);
});
passport.deserializeUser(async (githubId,done)=>{
  try{
      const user = await User.findOne({githubId : githubId})
      done(null,user);
  }
  catch(err){
      done(err);
  }
})