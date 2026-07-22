const { z } = require("zod");

const MediaValidation = require("./media.validation");
const ButtonValidation = require("./button.validation");

const FeatureItemValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  image: MediaValidation.optional(),

  buttons: z
    .array(ButtonValidation)
    .default([])
});

const FeaturesValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  items: z
    .array(FeatureItemValidation)
    .default([])
});

module.exports = FeaturesValidation;