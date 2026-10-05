const router = require("express").Router();
const INQUIRY_TYPES = require("../constants/inquiry-types");
const { PRODUCT } = require("../constants/product");
const PartnerInquiry = require("../models/partnerInquiry.model");
const CUSTOMER_GROUPS = require("../data/customers");
const LEGAL_PAGES = require("../data/legal");

router.get("/", (req, res) => {
  const customerCount = CUSTOMER_GROUPS.reduce(
    (sum, group) => sum + group.customers.length,
    0
  );
  res.render("index", { customerCount });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About us | Bytescreen",
    description:
      "Established in 2023, Bytescreen Tech Pvt. Ltd. builds simplified, scalable, software-defined and managed networking security solutions for businesses worldwide.",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact us | Bytescreen",
    description:
      "Talk to Bytescreen sales about network security, SD-WAN and Network-as-a-Service, or reach our support team for help with your existing network.",
    products: PRODUCT,
    inquiryTypes: Object.values(INQUIRY_TYPES),
  });
});

router.get("/partner", (req, res) => {
  res.render("partner", {
    title: "Partner with us | Bytescreen",
    description:
      "Become a Bytescreen partner. Resellers, system integrators, managed service providers and distributors can bring our network security and SD-WAN solutions to their customers.",
    companyTypes: PartnerInquiry.schema.path("companyType").enumValues,
    interests: PRODUCT,
  });
});

router.get("/customers", (req, res) => {
  res.render("customers", {
    title: "Our customers | Bytescreen",
    description:
      "Government bodies and businesses across India trust Bytescreen for secure, seamless network connectivity.",
    customerGroups: CUSTOMER_GROUPS,
  });
});

router.get("/demo", (req, res) => {
  res.render("demo", {
    title: "Schedule a demo | Bytescreen",
    description:
      "Book a live demo of Bytescreen's next-generation firewall, SD-WAN and Network-as-a-Service with our team.",
    products: PRODUCT,
    inquiryTypes: [INQUIRY_TYPES.DEMO],
    // Preselect the product when coming from a product page (/demo?product=BT-NGFW)
    selectedProduct: PRODUCT.includes(req.query.product) ? req.query.product : "",
  });
});

// Resources section pages (content to be added; each currently points visitors to support)
const RESOURCE_PAGES = {
  "knowledge-base": {
    name: "Knowledge base",
    heading: "Learn your way around Bytescreen.",
    intro: "Guides, how-tos and documentation to help you set up, configure and get the most from your Bytescreen products.",
    description: "Guides, how-tos and documentation for Bytescreen network security, SD-WAN and access products.",
  },
  troubleshooting: {
    name: "Troubleshooting",
    heading: "Get your network back on track.",
    intro: "Step-by-step fixes for common issues, error messages and connectivity problems with your Bytescreen devices.",
    description: "Troubleshooting guides for common issues with Bytescreen network security, SD-WAN and access products.",
  },
};

router.get("/resources/:page", (req, res, next) => {
  const page = RESOURCE_PAGES[req.params.page];
  if (!page) return next();

  res.render("resource-page", {
    title: `${page.name} | Bytescreen`,
    description: page.description,
    page,
  });
});

// Legal pages: /terms and /privacy
Object.entries(LEGAL_PAGES).forEach(([slug, page]) => {
  router.get(`/${slug}`, (req, res) => {
    res.render("legal", {
      title: `${page.name} | Bytescreen`,
      description: page.description,
      page,
    });
  });
});

module.exports = router;
