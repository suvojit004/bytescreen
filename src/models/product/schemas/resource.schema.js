const mongoose = require("mongoose");

const { Schema } = mongoose;
const { RESOURCE_TYPES } = require("../../../constants/product");

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
      enum: RESOURCE_TYPES,
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional: the model this file belongs to (e.g. a model's datasheet)
    model: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

module.exports = ResourceSchema;