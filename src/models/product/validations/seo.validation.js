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

  ogImage: z
    .string()
    .trim()
    .optional(),

  noIndex: z
    .boolean()
    .default(false)
});

module.exports = SEOValidation;