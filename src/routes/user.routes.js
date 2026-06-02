const router =
  require("express").Router();

const {
  createUser,getUsers,getUserById
} = require("../controllers/user.controller");

const protect =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorize.middleware");

const validate =
  require("../middlewares/validate.middleware");

const {
  createUserSchema, userIdSchema
} = require("../utils/user.validation");

router.post(
  "/",
  protect,
  authorize(
    "super_admin"
  ),
  validate(
    createUserSchema
  ),
  createUser
);

router.get(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getUsers
);
router.get(
  "/:id",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(
    userIdSchema,
    "params"
  ),
  getUserById
);

router.get("/", protect,authorize("super_admin", "admin"),getUsers);

module.exports = router;