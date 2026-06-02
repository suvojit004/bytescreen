const router = require("express").Router();

const { setupAdmin,login} = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")

router.post("/setup", setupAdmin);
router.post("/login", login)
router.get(
  "/me",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);
router.get(
  "/admin-only",
  protect,
  authorize("super_admin"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Super Admin"
    });
  }
);
module.exports = router;