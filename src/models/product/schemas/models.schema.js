const mongoose = require("mongoose");

const { Schema } = mongoose;


const ButtonSchema = require("./button.schema");
const MediaSchema = require("./media.schema");
const ModelItemSchema = new Schema(
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
      required: true,
    },

    datasheetUrl: {
      type: String,
      trim: true,
      default: "",
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

const ModelsSchema = new Schema(
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
      type: [ModelItemSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

module.exports = ModelsSchema;