const router = require("express").Router();

const {
  createLead,
  getLeads,
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
} = require(
  "../utils/lead.validation"
);

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

module.exports = router;