const { z } = require("zod");

const ButtonSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Button label is required"),

  url: z
    .string()
    .trim()
    .min(1, "Button URL is required"),
});

module.exports = ButtonSchema;