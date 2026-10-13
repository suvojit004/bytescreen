require("dotenv").config();
const env = require("./src/config/env");

const app = require("./src/app");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

const start = async () => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received; shutting down`);
      server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
      });
    };

    process.once("SIGTERM", shutdown);
    process.once("SIGINT", shutdown);
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
};

start();
