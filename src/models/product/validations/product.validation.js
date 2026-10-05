const mongoose = require("mongoose");
const { z } = require("zod");

const { PRODUCT_STATUS } = require("../../../constants/product");
const BasicInfoValidation = require("./basicInfo.validation");
const SEOValidation = require("./seo.validation");
const HeroValidation = require("./hero.validation");
const OverviewValidation = require("./overview.validation");
const FeaturesValidation = require("./features.validation");
const ModelsValidation = require("./models.validation");
const ResourceValidation = require("./resource.validation");
const FAQValidation = require("./faq.validation");
const CTAValidation = require("./cta.validation");

// Only basicInfo is required; any section left out is simply not shown on the page
const productFields = {
  basicInfo: BasicInfoValidation,

  status: z.enum(PRODUCT_STATUS),

  seo: SEOValidation.optional(),

  hero: HeroValidation.optional(),

  overview: OverviewValidation.optional(),

  features: FeaturesValidation.optional(),

  // Same shape as features
  benefits: FeaturesValidation.optional(),

  models: ModelsValidation.optional(),

  resources: z.array(ResourceValidation),

  faq: z.array(FAQValidation),

  cta: CTAValidation.optional()
};

// Create: fill in defaults for anything not sent
const ProductValidation = z.object({
  ...productFields,
  status: productFields.status.default("draft"),
  resources: productFields.resources.default([]),
  faq: productFields.faq.default([])
});

// Update: no defaults, so fields that aren't sent are left unchanged
// (otherwise editing one section would reset status to draft and clear resources/faq)
const UpdateProductValidation = z.object(productFields).partial();

const ProductIdValidation = z.object({
  productId: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid product id",
    }),
});

module.exports = {
    ProductValidation,
    UpdateProductValidation,
    ProductIdValidation
};
