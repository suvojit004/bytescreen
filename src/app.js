const path = require("path");
const env = require("./config/env");
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
const webRoutes = require("./routes/web.routes");
const { getNavProducts } = require("./services/navigation.service");

const notFound = require(
  "./middlewares/notFound.middleware"
);

const errorHandler = require(
  "./middlewares/error.middleware"
);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Compose exposes only NGINX; it replaces forwarded headers before proxying.
if (env.BEHIND_NGINX) app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Client logos on the home page are loaded from the main website
        "img-src": ["'self'", "data:", "https://www.bytescreentech.com"],
        // The standalone NGINX entry point uses HTTP until TLS is configured.
        "upgrade-insecure-requests": env.BEHIND_NGINX ? null : [],
      },
    },
  })
);
app.use(morgan("dev"));
// NGINX serves assets in Compose. Keep direct Node development self-contained.
if (!env.BEHIND_NGINX) {
  app.use(express.static(path.join(__dirname, "public"), { redirect: false }));
}

// Defaults shared by every rendered page; routes can override title/description
app.use((req, res, next) => {
  res.locals.title = "Bytescreen | Network security that moves with your business";
  res.locals.description =
    "Bytescreen helps Indian businesses secure, connect and manage their networks with next-generation firewall, SD-WAN and Network-as-a-Service.";
  res.locals.path = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.controllerUrl = env.CONTROLLER_URL;
  // Optional SEO extras (set by product pages)
  res.locals.canonical = "";
  res.locals.ogImage = "";
  res.locals.noIndex = false;
  res.locals.jsonLd = [];
  next();
});

// Products for the nav dropdown (published products, cached; see navigation.service)
app.use(async (req, res, next) => {
  if (req.method !== "GET") return next();
  res.locals.navMenu = await getNavProducts();
  next();
});

app.use("/", webRoutes);

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
