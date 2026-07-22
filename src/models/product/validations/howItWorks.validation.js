const { z } = require("zod");

const MediaValidation = require("./media.validation");
const ButtonValidation = require("./button.validation");

const HowItWorksItemValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  description: z
    .string()
    .trim()
    .optional(),

  media: MediaValidation,

  buttons: z
    .array(ButtonValidation)
    .default([])
});

const HowItWorksValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  items: z
    .array(HowItWorksItemValidation)
    .default([])
});

module.exports = HowItWorksValidation;