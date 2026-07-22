const mongoose = require("mongoose");

const { Schema } = mongoose;
const {PRODUCT_STATUS} = require('../../constants/product')
const HeroSchema = require("./schemas/hero.schema");
const OverviewSchema = require("./schemas/overview.schema");
const FeaturesSchema = require("./schemas/features.schema");
const HowItWorksSchema = require("./schemas/howItWorks.schema");
const ModelsSchema = require("./schemas/models.schema");
const ResourceSchema = require("./schemas/resource.schema");
const FAQSchema = require("./schemas/faq.schema");
const SEOSchema = require("./schemas/seo.schema");
const BasicInfoSchema = require("./schemas/basicInfo.schema");

const ProductSchema = new Schema(
  {
    basicInfo:{
      type: BasicInfoSchema,
      required: true
    } ,

    hero: HeroSchema,

    overview: OverviewSchema,

    features: FeaturesSchema,

    howItWorks: HowItWorksSchema,

    models: ModelsSchema,

    resources: {
      type: [ResourceSchema],
      default: [],
    },

    faq: {
      type: [FAQSchema],
      default: [],
    },

    seo: SEOSchema,

    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: "draft",
    },
  },
  {
    timestamps: true,
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("Product", ProductSchema);