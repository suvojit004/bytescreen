const router = require("express").Router();

const { setupAdmin,login} = require("../controllers/auth.controller");

router.post("/setup", setupAdmin);
router.post("/login", login)
module.exports = router;