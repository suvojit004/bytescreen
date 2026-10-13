const mongoose = require("mongoose");
const env = require("./env");


const connectDB = async () => {
  const conn = await mongoose.connect(env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

module.exports = connectDB;
