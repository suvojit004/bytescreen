const { z } = require("zod");

const SEOValidation = z.object({
  title: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  keywords: z
    .array(z.string().trim())
    .default([]),

  canonical: z
    .string()
    .trim()
    .optional()
});

module.exports = SEOValidation;