const { z } = require("zod");

const ResourceValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  type: z.enum([
    "pdf",
    "brochure",
    "whitepaper",
    "video",
    "firmware",
    "guide",
    "other"
  ]),

  url: z
    .string()
    .trim()
    .min(1)
});

module.exports = ResourceValidation;