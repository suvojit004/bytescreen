const router = require("express").Router();
const INQUIRY_TYPES = require("../constants/inquiry-types");
const { PRODUCT } = require("../constants/product");
const PartnerInquiry = require("../models/partnerInquiry.model");

router.get("/", (req, res) => {
  res.render("index");
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
    interests: PartnerInquiry.schema.path("interest").enumValues,
  });
});

module.exports = router;
