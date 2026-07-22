const { z } = require("zod");

const MediaValidation = require("./media.validation");
const ButtonValidation = require("./button.validation");

const ModelItemValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  image: MediaValidation,

  datasheetUrl: z
    .string()
    .trim()
    .optional(),

  buttons: z
    .array(ButtonValidation)
    .default([])
});

const ModelsValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .optional(),

  items: z
    .array(ModelItemValidation)
    .default([])
});

module.exports = ModelsValidation;