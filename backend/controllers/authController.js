const bcrypt = require("bcryptjs");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { signToken } = require("../utils/jwt");

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email: email.toLowerCase(), password: hashed });
  const token = signToken(user._id.toString());

  res.status(201).json({
    token,
    user: { id: user._id, email: user.email }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id.toString());
  res.json({
    token,
    user: { id: user._id, email: user.email }
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("email");
  res.json({ user: { id: user._id, email: user.email } });
});

module.exports = { register, login, me };
