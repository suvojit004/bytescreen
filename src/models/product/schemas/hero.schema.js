const mongoose = require("mongoose");

const { Schema } = mongoose;


const ButtonSchema = require("./button.schema");
const MediaSchema = require("./media.schema");
const HeroSchema = new Schema(
  {
    backgroundImage: {
      type: MediaSchema,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
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

module.exports = HeroSchema;