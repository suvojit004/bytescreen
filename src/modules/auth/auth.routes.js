const router = require("express").Router();

const { setupAdmin,} = require("./auth.controller");

router.post("/setup", setupAdmin);

module.exports = router;