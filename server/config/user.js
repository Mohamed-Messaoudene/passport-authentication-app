const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: function (value) {
        return this.googleId || (value && value.length > 0);
      },
      message: "Username is required ",
    },
    unique:false
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: `{VALUE} is not a valid email address`,
    },
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  googleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },

  profilePicture: { type: String },
});

// Hash password before saving (only if password is present)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
// Create a compound index on email and provider
userSchema.index({ email: 1, provider: 1 }, { unique: true });

// Password comparison method for local users
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(this.password);
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
