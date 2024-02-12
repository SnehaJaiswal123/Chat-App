const User = require("../Model/User");
const expressAsyncHandler = require("express-async-handler");
const { search } = require("../Routes/user");

const signup = expressAsyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (userName == "" || email == "" || password == "") {
    console.log("Enter all the fields");
    return res
      .status(400)
      .json({ Success: false, message: "Enter all the fields" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    console.log("User already exist");
    res.status(409).send("User already exist");
  }

  const userNameExist = await User.findOne({ userName });
  if (userNameExist) {
    console.log("Username already taken");
    throw Error("Username already taken");
  }

  const user = await User(req.body);
  await user.save();
  const token = await user.generateToken();
  const newuser = await User.findById(user._id).select("-password ");

  if (!newuser) {
    throw Error("error in signing up");
  }
  console.log({ user, token });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", token, options)
    .json({ Success: true, message: "User signed up successfully", newuser,token});
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res
      .status(400)
      .json({ Success: false, message: "Enter all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({ Success: false, message: "Invalid email" });
  }

  const passMatched = await user.matchPassword(password);

  if (!passMatched) {
    return res
      .status(401)
      .send({ Success: false, message: "Invalid password" });
  }

  const token = await user.generateToken();
  const loggedInUser = await User.findById(user._id).select("-password");

  console.log({ loggedInUser, token });

  const options = {
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      Success: true,
      message: "User Logged In Successfully",
      loggedInUser,
      token
    });
});

const fetchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
    return res
    .status(200)
    .json({
      Success: true,
      message: "Available Users",
      users
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { signup, login, fetchUsers };
