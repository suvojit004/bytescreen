const { z } = require("zod");
const {MEDIA_TYPES} =require('../../../constants/product')
const MediaSchema = z.object({
  type: z.enum(MEDIA_TYPES),

  url: z
    .string()
    .trim()
    .min(1, "Media URL is required"),

  thumbnail: z
    .string()
    .trim()
    .optional(),

  alt: z
    .string()
    .trim()
    .optional(),
});

module.exports = MediaSchema;