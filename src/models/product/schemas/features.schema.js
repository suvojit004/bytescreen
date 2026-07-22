const mongoose = require("mongoose");

const { Schema } = mongoose;


const ButtonSchema = require("./button.schema");
const MediaSchema = require("./media.schema");
const FeatureItemSchema = new Schema(
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

    image: {
      type: MediaSchema,
    },

    buttons: {
      type: [ButtonSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const FeaturesSchema = new Schema(
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
      type: [FeatureItemSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

module.exports = FeaturesSchema;