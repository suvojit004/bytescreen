const { cleanEnv, str, port, url } = require("envalid");

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
  }),
  PORT: port({
    default: 3000,
  }),
  MONGO_URI: str(),
  // FusionM centralised controller (target of the "Controller login" button)
  CONTROLLER_URL: url({
    default: "https://fusionm.bytescreentech.com",
  }),
});

module.exports = env;