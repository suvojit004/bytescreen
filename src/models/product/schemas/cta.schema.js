const mongoose = require("mongoose");

const { Schema } = mongoose;

const ButtonSchema = require("./button.schema");

// Optional per-product override; the product page shows a default demo CTA when empty
const CTASchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    button: {
      type: ButtonSchema,
    },
  },
  {
    _id: false,
  }
);

module.exports = CTASchema;
