const mongoose = require("mongoose");

const { Schema } = mongoose;
const { NAV_GROUPS } = require("../../../constants/product");

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
      // Nav dropdown: which group the product is listed under, and its position (lowest first)
      navGroup: {
        type: String,
        enum: NAV_GROUPS,
        default: "products",
      },
      sortOrder: {
        type: Number,
        default: 0,
      },
    },{
    _id: false,
  })

module.exports = BasicInfoSchema