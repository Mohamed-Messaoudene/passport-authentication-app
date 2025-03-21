const express = require("express");
const router = express.Router();
const User = require("../config/user");
const passport = require("passport");
require("dotenv").config();
const path = require("path");
const verifyIfAuthenticated = require("../middlwares/verifyIfAuthenticated");
const CLIENT_URL = process.env.CLIENT_URL;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Handle unexpected error during authentication
      return res
        .status(500)
        .json({ message: "An unexpected error occurred.please try again" });
    }
    if (!user) {
      // User was not found or password did not match
      return res.status(401).json({
        message:
          "Login failed. Please check your username and password and try again.",
      });
    }
    // Successful authentication
    req.logIn(user, (err) => {
      if (err) {
        console.log("this login error :",err);
        return res
          .status(500)
          .json({ message: "An unexpected error occurred.please try again" });
      }
      console.log("this is the user returned ", user);
      return res.status(200).json({ user: user });
    });
  })(req, res, next);
});
// register route
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await new User({
      username,
      password,
      email,
      provider:"local"
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "The registration process was completed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error for unique fields (e.g., username)
      return res.status(409).json({
        message:
          "Username or email already exists. Please use a different one.",
      });
    }
    return res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
});
router.get("/logout", async (req, res) => {
    await req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed!", error: err });
      }
      res.status(200).json({ message: "Logout successfully" });
    });
});

// register or login  with google -------------------------------------------------
router.get(
  "/signWithGoogle",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/signWithGoogle/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/profile`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

//register or login with facebook-----------------------------------------------------
router.get(
  "/signWithFacebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/signWithFacebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${CLIENT_URL}/profile`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

//register or login with github-----------------------------------------------------
router.get(
  "/signWithGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/signWithGithub/callback",
  passport.authenticate("github", {
    successRedirect: `${CLIENT_URL}/profile`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

router.get("/profile", verifyIfAuthenticated, (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});
module.exports = router;
