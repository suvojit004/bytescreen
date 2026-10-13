const { cleanEnv, str, port, url, bool, num } = require("envalid");

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
  }),
  PORT: port({
    default: 3000,
  }),
  BEHIND_NGINX: bool({ default: false }),
  TRUST_PROXY_HOPS: num({ default: 1 }),
  MONGO_URI: str(),
  CORS_ALLOW_ORIGINS: str({ default: "" }),
  // FusionM centralised controller (target of the "Controller login" button)
  CONTROLLER_URL: url({
    default: "https://fusionm.bytescreentech.com",
  }),
});

module.exports = env;
