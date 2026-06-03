const { z } = require("zod");
const INQUIRY_TYPES = require("../constants/inquiry-types");
const LEAD_STATUS = require("../constants/lead-status")

const createLeadSchema =
  z.object({
    firstName:
      z.string().min(2),

    lastName:
      z.string().optional(),

    email:
      z.string().email(),

    phone:
      z.string().optional(),

    company:
      z.string().optional(),

    inquiryType:
      z.enum(Object.values(INQUIRY_TYPES)),

    message:
      z.string().min(10),
  });

const updateLeadSchema = z.object({
  status: z.enum(Object.values(LEAD_STATUS)),
});

module.exports = {
  createLeadSchema,
  updateLeadSchema
};