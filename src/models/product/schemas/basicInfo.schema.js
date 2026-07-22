const mongoose = require("mongoose");

const { Schema } = mongoose;

const BasicInfoSchema = new Schema({
      productName: {
        type: String,
        required: true,
        trim: true,
      },

      productKey: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      category: {
        type: String,
        trim: true,
      },

      shortDescription: {
        type: String,
        trim: true,
      },
    },{
    _id: false,
  })

module.exports = BasicInfoSchema