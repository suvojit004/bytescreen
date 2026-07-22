const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const healthRoutes = require("./routes/health.routes");
const authRoute = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");
const eventRoute = require("./routes/event.route")
const partnerInquiryRoutes = require("./routes/partnerInquiry.route")
const productRoutes = require("./routes/product.routes")
const productPublicRoutes = require("./routes/product.public.routes")

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
app.use ("/api-events",eventRoute)
app.use("/api-partner-inquiry", partnerInquiryRoutes)
app.use("/api/products", productRoutes);
app.use("/products", productPublicRoutes);



app.use(notFound);
app.use(errorHandler);

module.exports = app;