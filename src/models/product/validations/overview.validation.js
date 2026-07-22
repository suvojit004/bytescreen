const { z } = require("zod");

const MediaValidation = require("./media.validation");
const ButtonValidation = require("./button.validation");

const OverviewValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  image: MediaValidation,

  buttons: z
    .array(ButtonValidation)
    .default([])
});

module.exports = OverviewValidation;