const mongoose = require("../Db/connect");
const bcrypt = require("bcrypt");
const configDotenv = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv.config();

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamp: true,
  }
);
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.matchPassword = async function (enteredPass) {
  return bcrypt.compare(enteredPass, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password =await bcrypt.hash(this.password, 8);
    console.log("password hashed");
  }
  next();
});

const User = mongoose.model("User",userSchema);

module.exports = User;
