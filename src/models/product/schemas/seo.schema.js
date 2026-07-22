const mongoose = require("mongoose");

const { Schema } = mongoose;

const SEOSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },

    canonical: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

module.exports = SEOSchema;