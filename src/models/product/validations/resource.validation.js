const { z } = require("zod");
const { RESOURCE_TYPES } = require("../../../constants/product");

const ResourceValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  type: z.enum(RESOURCE_TYPES),

  url: z
    .string()
    .trim()
    .min(1),

  model: z
    .string()
    .trim()
    .optional()
});

module.exports = ResourceValidation;