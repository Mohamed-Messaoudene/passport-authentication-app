const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./user");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }
      console.log(password);
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      if (err) {
        console.log("this error is from passport local login",err);
        return done(err);
      }
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const myuser = await User.findById(id);
    done(null, myuser);
  } catch (err) {
    done(err);
  }
});
