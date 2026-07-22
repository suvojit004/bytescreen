const mongoose = require("mongoose");

const { Schema } = mongoose;

const ButtonSchema = require("./button.schema");
const MediaSchema = require("./media.schema");
const OverviewSchema = new Schema(
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

    buttons: {
      type: [ButtonSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

module.exports = OverviewSchema;