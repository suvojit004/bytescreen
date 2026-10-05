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

    // Image shown when the page is shared on social media
    ogImage: {
      type: String,
      trim: true,
      default: "",
    },

    // Keep the page out of search results
    noIndex: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

module.exports = SEOSchema;