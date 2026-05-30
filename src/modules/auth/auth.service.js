const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");

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

module.exports = {
  createInitialAdmin,
};