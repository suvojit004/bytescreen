const { z } = require("zod");

const BasicInfoValidation = require("./basicInfo.validation");
const HeroValidation = require("./hero.validation");
const OverviewValidation = require("./overview.validation");
const FeaturesValidation = require("./features.validation");
const HowItWorksValidation = require("./howItWorks.validation");
const ModelsValidation = require("./models.validation");
const ResourceValidation = require("./resource.validation");
const FAQValidation = require("./faq.validation");
const SEOValidation = require("./seo.validation");

const ProductValidation = z.object({
  basicInfo: BasicInfoValidation,

  hero: HeroValidation,

  overview: OverviewValidation,

  features: FeaturesValidation,

  howItWorks: HowItWorksValidation,

  models: ModelsValidation,

  resources: z
    .array(ResourceValidation)
    .default([]),

  faq: z
    .array(FAQValidation)
    .default([]),

  seo: SEOValidation,

  status: z.enum([
    "draft",
    "published",
    "archived"
  ]).default("draft")
});


const UpdateProductValidation = ProductValidation.partial();

module.exports = {
    ProductValidation,
    UpdateProductValidation
};