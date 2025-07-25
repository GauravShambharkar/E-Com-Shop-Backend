const { User } = require("../Models/Models");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/userjwtgenerator");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = await generateJWT(user);
    res
      .status(201)
      .json({ message: "Registration successful! Welcome aboard.", token });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Oops! Something went wrong during registration.",
        error: err.message,
      });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with this email." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }
    const token = await generateJWT(user);
    res.status(200).json({ message: "Login successful! Welcome back.", token });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Sorry, we could not log you in at this time.",
        error: err.message,
      });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not retrieve profile.", error: err.message });
  }
};
