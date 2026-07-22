const mongoose = require("mongoose");
const MediaSchema = require("./media.schema");
const ButtonSchema = require("./button.schema");
const { Schema } = mongoose;

const HowItWorksItemSchema = new Schema(
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

    media: {
      type: MediaSchema,
      required: true,
    },
     buttons: {
      type: [ButtonSchema],
      default: [],
    }
  },
  {
    _id: false,
  }
);

const HowItWorksSchema = new Schema(
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

    items: {
      type: [HowItWorksItemSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

module.exports = HowItWorksSchema;