const mongoose = require("mongoose");

const { Schema } = mongoose;


const ButtonSchema = require("./button.schema");
const MediaSchema = require("./media.schema");

// One row of a model's spec table, e.g. { label: "Throughput", value: "10 Gbps" }
const SpecSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

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

    specs: {
      type: [SpecSchema],
      default: [],
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