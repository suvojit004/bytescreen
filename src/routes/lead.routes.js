const router = require("express").Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
} = require(
  "../controllers/lead.controller"
);

const validate =
  require("../middlewares/validate.middleware");

const protect =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorize.middleware");

const {
  createLeadSchema,
  updateLeadSchema,
} = require(
  "../utils/lead.validation"
);

const {
  userIdSchema
} = require("../utils/user.validation");
router.post(
  "/",
  validate(
    createLeadSchema
  ),
  createLead
);

router.get(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getLeads
);

router.get("/:id",
    protect,
    authorize("super_admin", "admin"),
    validate(userIdSchema, "params"),
    getLeadById
)

router.patch("/:id",
    protect,
    authorize("super_admin", "admin"),
    validate(userIdSchema, "params"),
    validate(updateLeadSchema),
    updateLead
)

module.exports = router;