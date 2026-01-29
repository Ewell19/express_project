const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// Hash password before saving
userSchema.pre("save", async function hashPassword() {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

// Custom method to find user by credentials
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    return Promise.reject(error);
  }

  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((isPasswordMatch) => {
        if (!isPasswordMatch) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);
