const mongoose = require("mongoose");

const LEAD_STATUS = require("../constants/lead-status");

const INQUIRY_TYPES = require("../constants/inquiry-types");

const leadSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
        },

        company: {
            type: String,
        },

        inquiryType: {
            type: String,
            enum: Object.values(
                INQUIRY_TYPES
            ),
            required: true,
            default: "demo"
        },

        message: {
            type: String,
            required: true,
        },   
       
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);