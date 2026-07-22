const mongoose = require("mongoose");

const { Schema } = mongoose;

const ButtonSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
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

module.exports = ButtonSchema;