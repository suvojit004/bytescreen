const { z } = require("zod");
const INQUIRY_TYPES = require("../constants/inquiry-types");

const mongoose = require("mongoose");

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
      z.enum(Object.values(INQUIRY_TYPES)).default("demo"),

    message:
      z.string().min(10),
  });

const updateLeadSchema = createLeadSchema.partial();


module.exports = {
  createLeadSchema,
  updateLeadSchema,
 
};