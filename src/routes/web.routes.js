const router = require("express").Router();
const INQUIRY_TYPES = require("../constants/inquiry-types");
const { PRODUCT } = require("../constants/product");
const PartnerInquiry = require("../models/partnerInquiry.model");
const CUSTOMER_GROUPS = require("../data/customers");
const LEGAL_PAGES = require("../data/legal");
const { listDocuments } = require("../services/documents.service");
const RESOURCE_PAGES = require("../data/resources");

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

// Resources: the /resources hub and its pages (configured in src/data/resources.js)
const loadDocumentGroups = (page) =>
  Promise.all(
    (page.documents || []).map(async (group) => ({
      ...group,
      items: await listDocuments(group.folder, { stripPrefix: group.stripPrefix }),
    }))
  );

router.get("/resources", async (req, res, next) => {
  try {
    const sections = await Promise.all(
      Object.entries(RESOURCE_PAGES).map(async ([key, page]) => {
        const groups = await loadDocumentGroups(page);
        const count = groups.reduce((sum, group) => sum + group.items.length, 0);
        const itemLabel = (page.documents && page.documents[0] && page.documents[0].itemLabel) || "document";
        return { key, ...page, count, itemLabel };
      })
    );

    res.render("resources", {
      title: "Resources | Bytescreen",
      canonical: `${req.protocol}://${req.get("host")}/resources`,
      description:
        "Bytescreen resources: configuration guides, troubleshooting guides, product brochures and datasheets for network security, SD-WAN and access products.",
      sections,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/resources/:page", async (req, res, next) => {
  const page = RESOURCE_PAGES[req.params.page];
  if (!page) return next();

  try {
    const documentGroups = await loadDocumentGroups(page);
    const origin = `${req.protocol}://${req.get("host")}`;

    res.render("resource-page", {
      title: `${page.name} | Bytescreen`,
      description: page.description,
      canonical: `${origin}/resources/${req.params.page}`,
      // Breadcrumb for search results: Resources › <page>
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Resources", item: `${origin}/resources` },
            { "@type": "ListItem", position: 2, name: page.name, item: `${origin}/resources/${req.params.page}` },
          ],
        },
      ],
      page,
      documentGroups: documentGroups.filter((group) => group.items.length),
    });
  } catch (e) {
    next(e);
  }
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
