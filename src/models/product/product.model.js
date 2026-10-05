const mongoose = require("mongoose");

const { Schema } = mongoose;
const {PRODUCT_STATUS} = require('../../constants/product')
const BasicInfoSchema = require("./schemas/basicInfo.schema");
const SEOSchema = require("./schemas/seo.schema");
const HeroSchema = require("./schemas/hero.schema");
const OverviewSchema = require("./schemas/overview.schema");
const FeaturesSchema = require("./schemas/features.schema");
const ModelsSchema = require("./schemas/models.schema");
const ResourceSchema = require("./schemas/resource.schema");
const FAQSchema = require("./schemas/faq.schema");
const CTASchema = require("./schemas/cta.schema");

// Page order: Hero → Overview → Features → Benefits → Why choose (shared, not stored)
// → Models → Resources → FAQ → CTA. Empty sections are not shown on the page.
const ProductSchema = new Schema(
  {
    basicInfo:{
      type: BasicInfoSchema,
      required: true
    } ,

    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: "draft",
    },

    seo: {
      type: SEOSchema,
      default: () => ({}),
    },

    hero: HeroSchema,

    overview: OverviewSchema,

    features: FeaturesSchema,

    // Same shape as features: title, description, items
    benefits: FeaturesSchema,

    models: ModelsSchema,

    resources: {
      type: [ResourceSchema],
      default: [],
    },

    faq: {
      type: [FAQSchema],
      default: [],
    },

    cta: CTASchema,
  },
  {
    timestamps: true,
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("Product", ProductSchema);
