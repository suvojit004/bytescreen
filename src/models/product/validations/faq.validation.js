const { z } = require("zod");

const FAQValidation = z.object({
  question: z
    .string()
    .trim()
    .min(1),

  answer: z
    .string()
    .trim()
    .min(1)
});

module.exports = FAQValidation;