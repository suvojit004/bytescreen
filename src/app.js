const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const healthRoutes = require("./routes/health.routes");
const authRoute = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");

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
app.use("/createuser", authRoute);
app.use("/users", userRoutes);
app.use("/leads", leadRoutes);
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