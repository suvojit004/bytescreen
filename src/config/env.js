const { cleanEnv, str, port, url, bool } = require("envalid");

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
  }),
  PORT: port({
    default: 3000,
  }),
  BEHIND_NGINX: bool({ default: false }),
  MONGO_URI: str(),
  // FusionM centralised controller (target of the "Controller login" button)
  CONTROLLER_URL: url({
    default: "https://fusionm.bytescreentech.com",
  }),
});

module.exports = env;
