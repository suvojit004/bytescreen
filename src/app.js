const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const healthRoutes = require("./routes/health.routes");
const app = express();
const authRoute = require("./modules/auth/auth.routes");
const notFound = require(
  "./middlewares/notFound.middleware"
);

const errorHandler = require(
  "./middlewares/error.middleware"
);


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/createuser", authRoute)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bytescreen API Running"
  });
});

app.get("/error", (req, res) => {
  throw new Error("Test Error");
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;