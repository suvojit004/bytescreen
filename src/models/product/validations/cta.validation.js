const { z } = require("zod");

const ButtonValidation = require("./button.validation");

const CTAValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  button: ButtonValidation.optional()
});

module.exports = CTAValidation;
