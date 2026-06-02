const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateAccessToken,} = require("../utils/jwt");


const createInitialAdmin = async (payload) => {
  const existingUser = await User.findOne();

  if (existingUser) {
    throw new Error(
      "Initial admin already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    firstName: payload.firstName,
    lastName : payload.lastName,
    email: payload.email,
    password: hashedPassword,
    role: "super_admin",
  });

  return user;
};


const loginUser = async ({ email, password,}) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const accessToken =
    generateAccessToken({
      userId: user._id,
      role: user.role,
    });

  return {
    accessToken,
    user,
  };
};


module.exports = {
  createInitialAdmin,
  loginUser
};