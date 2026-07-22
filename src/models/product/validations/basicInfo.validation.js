const { z } = require("zod");

const BasicInfoValidation = z.object({
  productName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  productKey: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Invalid product key"),

  category: z
    .string()
    .trim()
    .optional(),

  shortDescription: z
    .string()
    .trim()
    .max(250)
    .optional()
});

module.exports = BasicInfoValidation;