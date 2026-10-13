const appUser = process.env.MONGO_APP_USER;
const appPassword = process.env.MONGO_APP_PASSWORD;

if (!appUser || !appPassword) {
  throw new Error("MONGO_APP_USER and MONGO_APP_PASSWORD must be set");
}

db.getSiblingDB("bytescreen").createUser({
  user: appUser,
  pwd: appPassword,
  roles: [{ role: "readWrite", db: "bytescreen" }],
});
