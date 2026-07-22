const mongoose = require("mongoose");
const {MEDIA_TYPES} = require('../../../constants/product')

const { Schema } = mongoose;

const MediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: MEDIA_TYPES,
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },

    alt: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

module.exports = MediaSchema