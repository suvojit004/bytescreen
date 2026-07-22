const mongoose = require("mongoose");

const { Schema } = mongoose;

const ResourceSchema = new Schema(
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

    type: {
      type: String,
      enum: [
        "pdf",
        "brochure",
        "whitepaper",
        "video",
        "firmware",
        "guide",
        "other",
      ],
      default: "pdf",
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

module.exports = ResourceSchema;