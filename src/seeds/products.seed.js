// Demo product data for checking the product page layout.
//
//   npm run seed:products            add demo products (existing product keys are skipped)
//   npm run seed:products -- --reset replace the demo products if they already exist
//
// Everything here is placeholder content (including model specs and resource links):
// replace it with real product information before going live.

require("dotenv").config();
const mongoose = require("mongoose");

const env = require("../config/env");
const Product = require("../models/product/product.model");
const { ProductValidation } = require("../models/product/validations/product.validation");

const image = (url, alt = "") => ({ type: "image", url, alt });

const DEMO_PRODUCTS = [
  // Every section filled in
  {
    basicInfo: {
      productName: "BT-NGFW",
      productKey: "bt-ngfw",
      navGroup: "products",
      sortOrder: 1,
      category: "Network security",
      shortDescription: "Next-generation firewall that protects every edge of your network.",
    },
    status: "published",
    seo: {
      title: "BT-NGFW Next-Generation Firewall | Bytescreen",
      description: "Inspect traffic, apply policy and stop threats at every network edge with the Bytescreen BT-NGFW next-generation firewall.",
    },
    hero: {
      title: "BT-NGFW",
      subtitle: "Next-generation firewall",
      description: "Inspect traffic, apply policy and stop threats at every edge of your network, from a single platform.",
      backgroundImage: image("/images/firewall-demo.png", "Bytescreen firewall appliance"),
    },
    overview: {
      title: "Security that keeps up with your business.",
      description: "BT-NGFW brings firewalling, intrusion prevention and application control together in one platform, so your team can protect users and data without juggling separate tools.",
      image: image("/images/security-operations-demo.png", "Engineer monitoring network traffic across several screens"),
      buttons: [{ label: "Talk to sales", url: "/contact#sales" }],
    },
    features: {
      title: "Built-in protection",
      description: "Everything you need at the network edge, in one appliance.",
      items: [
        { title: "Deep packet inspection", description: "See and control traffic at the application level, not just by port and protocol." },
        { title: "Intrusion prevention", description: "Detect and block known attack patterns before they reach your users." },
        { title: "Application control", description: "Set policy by application, user and group across every site." },
        { title: "Central management", description: "Manage policies and monitor every firewall from a single view." },
      ],
    },
    benefits: {
      title: "What you gain",
      items: [
        { title: "Lower risk", description: "Stop threats at the edge before they reach users and data." },
        { title: "Simpler operations", description: "One platform instead of several point products to maintain." },
        { title: "Room to grow", description: "Scale from a single site to a connected estate without redesign." },
      ],
    },
    models: {
      title: "Models",
      description: "Choose the right appliance for each site.",
      items: [
        {
          title: "NGFW-500",
          description: "For branch offices and small sites.",
          image: image("/images/firewall-demo.png", "NGFW-500 appliance"),
          specs: [
            { label: "Firewall throughput", value: "5 Gbps" },
            { label: "Concurrent sessions", value: "1 million" },
            { label: "Ports", value: "8 × 1 GbE" },
            { label: "Form factor", value: "Desktop" },
          ],
        },
        {
          title: "NGFW-1000",
          description: "For headquarters and regional hubs.",
          image: image("/images/firewall-demo.png", "NGFW-1000 appliance"),
          specs: [
            { label: "Firewall throughput", value: "20 Gbps" },
            { label: "Concurrent sessions", value: "4 million" },
            { label: "Ports", value: "8 × 10 GbE SFP+" },
            { label: "Form factor", value: "1U rack" },
          ],
        },
        {
          title: "NGFW-3000",
          description: "For data centres and large campuses.",
          image: image("/images/firewall-demo.png", "NGFW-3000 appliance"),
          specs: [
            { label: "Firewall throughput", value: "60 Gbps" },
            { label: "Concurrent sessions", value: "10 million" },
            { label: "Ports", value: "4 × 40 GbE QSFP+" },
            { label: "Form factor", value: "2U rack" },
          ],
        },
      ],
    },
    resources: [
      { title: "BT-NGFW product brochure", type: "brochure", url: "#", description: "Overview of features and use cases" },
      { title: "NGFW-500 datasheet", type: "datasheet", url: "#", model: "NGFW-500" },
      { title: "NGFW-1000 datasheet", type: "datasheet", url: "#", model: "NGFW-1000" },
      { title: "NGFW-3000 datasheet", type: "datasheet", url: "#", model: "NGFW-3000" },
    ],
    faq: [
      { question: "Can BT-NGFW be managed remotely?", answer: "Yes. Policies, updates and monitoring are all available from a central management console." },
      { question: "Which model is right for my site?", answer: "It depends on your bandwidth, number of users and the services you run. Our team can help you size the right appliance." },
      { question: "Is support included?", answer: "Our team of experts is available 24/7 to help with your deployment." },
    ],
  },

  // Most sections, with a custom CTA
  {
    basicInfo: {
      productName: "BT-WAN",
      productKey: "bt-wan",
      navGroup: "products",
      sortOrder: 2,
      category: "Connectivity",
      shortDescription: "SD-WAN that keeps every site connected, fast and secure.",
    },
    status: "published",
    hero: {
      title: "BT-WAN",
      subtitle: "SD-WAN for every site",
      description: "Deliver stable, high-performing connectivity across all your locations with intelligent routing and flexible WAN management.",
      backgroundImage: image("/images/offer-connectivity.jpg", "Office buildings connected by network links"),
      buttons: [
        { label: "Schedule a demo", url: "/demo?product=BT-WAN" },
        { label: "See features", url: "#features" },
      ],
    },
    overview: {
      title: "One network across every location.",
      description: "BT-WAN steers each application over the best available link, so your branches stay productive even when a connection slows down or fails.",
      image: image("/images/offer-innovation.jpg", "Network links across a globe"),
    },
    features: {
      title: "Smarter connectivity",
      items: [
        { title: "Intelligent path selection", description: "Route each application over the link that suits it best." },
        { title: "Automatic failover", description: "Keep sites online when a link goes down." },
        { title: "Zero-touch deployment", description: "Bring new branches online without sending engineers on site." },
      ],
    },
    benefits: {
      title: "Why teams choose BT-WAN",
      items: [
        { title: "Better application experience", description: "Critical apps get the bandwidth they need." },
        { title: "Lower connectivity costs", description: "Combine broadband and other links instead of relying on costly circuits." },
      ],
    },
    resources: [
      { title: "BT-WAN product brochure", type: "brochure", url: "#" },
      { title: "BT-WAN deployment guide", type: "guide", url: "#" },
    ],
    cta: {
      title: "Connect your sites with confidence.",
      description: "Talk to our team about bringing BT-WAN to your branches.",
      button: { label: "Talk to sales", url: "/contact#sales" },
    },
  },

  // Platform: the centralised controller, with a login button for existing customers
  {
    basicInfo: {
      productName: "FusionM",
      productKey: "fusionm",
      navGroup: "platform",
      sortOrder: 1,
      category: "Centralised network controller",
      shortDescription: "Manage every Bytescreen firewall, WAN and access device from one place.",
    },
    status: "published",
    seo: {
      title: "FusionM Centralised Network Controller | Bytescreen",
    },
    hero: {
      title: "FusionM",
      subtitle: "One controller for your entire network",
      description: "Configure, monitor and update every Bytescreen device across all your sites from a single, central console.",
      backgroundImage: image("/images/offer-support.jpg", "Network operations team monitoring screens"),
      buttons: [
        { label: "Log in to FusionM", url: env.CONTROLLER_URL },
        { label: "Schedule a demo", url: "/demo" },
      ],
    },
    overview: {
      title: "Your whole network, in one view.",
      description: "FusionM brings BT-NGFW, BT-WAN and BT-AAA together under one controller, so your team sets policy once, sees every site at a glance and rolls out changes without visiting each location.",
      image: image("/images/security-operations-demo.png", "Engineer monitoring the network from a central console"),
    },
    features: {
      title: "Centralised control",
      items: [
        { title: "Single dashboard", description: "See the health and status of every device and site in one place." },
        { title: "Central policy", description: "Define security and routing policy once and apply it everywhere." },
        { title: "Zero-touch provisioning", description: "Bring new sites online without sending engineers on site." },
        { title: "Monitoring and alerts", description: "Spot issues early with live monitoring and alerts." },
        { title: "Firmware management", description: "Schedule and roll out updates across your estate." },
        { title: "Role-based access", description: "Give each team member the access they need, and no more." },
      ],
    },
    benefits: {
      title: "What you gain",
      items: [
        { title: "Less time on routine work", description: "Changes that took a day per site now take minutes for all of them." },
        { title: "Consistent security", description: "The same policy everywhere, with no configuration drift between sites." },
        { title: "Faster troubleshooting", description: "Find and fix problems from one console instead of many." },
      ],
    },
    resources: [
      { title: "FusionM product brochure", type: "brochure", url: "#" },
      { title: "FusionM user guide", type: "guide", url: "#" },
    ],
    faq: [
      { question: "How do I log in to FusionM?", answer: "Existing customers can log in at fusionm.bytescreentech.com. If you need access, contact our support team." },
      { question: "Which devices can FusionM manage?", answer: "FusionM manages Bytescreen BT-NGFW, BT-WAN and BT-AAA devices across all your sites." },
    ],
  },

  // Minimal: only basic info and a hero; every other section is hidden
  {
    basicInfo: {
      productName: "BT-AAA",
      productKey: "bt-aaa",
      navGroup: "products",
      sortOrder: 3,
      category: "Access control",
      shortDescription: "Centralised authentication, authorisation and accounting for your network.",
    },
    status: "published",
    hero: {
      title: "BT-AAA",
      subtitle: "Authentication, authorisation and accounting",
      description: "Control who gets on your network, what they can reach, and keep a record of every session.",
      backgroundImage: image("/images/offer-security.jpg", "Network security appliance"),
    },
  },
];

const run = async () => {
  const reset = process.argv.includes("--reset");

  await mongoose.connect(env.MONGO_URI);
  console.log(`Connected to ${mongoose.connection.host}/${mongoose.connection.name}`);

  for (const demo of DEMO_PRODUCTS) {
    const data = ProductValidation.parse(demo);
    const key = data.basicInfo.productKey;
    const existing = await Product.findOne({ "basicInfo.productKey": key });

    if (existing && !reset) {
      console.log(`- ${key}: already exists, skipped (use --reset to replace it)`);
      continue;
    }

    if (existing) await existing.deleteOne();
    await Product.create(data);
    console.log(`- ${key}: ${existing ? "replaced" : "created"} → /products/${key}`);
  }
};

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
