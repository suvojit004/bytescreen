const { z } = require("zod");

const MediaValidation = require("./media.validation");
const ButtonValidation = require("./button.validation");

const HeroValidation = z.object({
  backgroundImage: MediaValidation,

  title: z
    .string()
    .trim()
    .min(1),

  subtitle: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  buttons: z
    .array(ButtonValidation)
    .default([])
});

module.exports = HeroValidation;