const mongoose = require("mongoose");

const { Schema } = mongoose;

const FAQSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

module.exports = FAQSchema;