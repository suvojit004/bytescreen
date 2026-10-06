// Resources section: the /resources hub and its pages (/resources/<key>).
//
// Each page lists one or more document groups. A group shows every PDF in
// src/public/resources/<folder>, so adding a PDF to the folder adds it to the page.
// Titles come from file names ("DHCP-Configuration.pdf" → "DHCP Configuration");
// `stripPrefix` drops a repeated start such as "Troubleshooting-".
// `itemLabel` is the singular word used in counts ("9 guides").
// Pages are shown on the hub in this order.

const RESOURCE_PAGES = {
  "knowledge-base": {
    name: "Knowledge base",
    summary: "Step-by-step configuration guides for setting up features on your Bytescreen devices.",
    heading: "Learn your way around Bytescreen.",
    intro: "Guides, how-tos and documentation to help you set up, configure and get the most from your Bytescreen products.",
    description: "Configuration guides and documentation for Bytescreen network security, SD-WAN and access products.",
    documents: [
      {
        id: "configuration",
        title: "Configuration guides",
        intro: "Step-by-step guides for setting up and configuring features on your Bytescreen devices.",
        folder: "configuration",
        itemLabel: "guide",
      },
    ],
  },
  troubleshooting: {
    name: "Troubleshooting",
    summary: "Diagnostic tools and fixes for connectivity problems on your network.",
    heading: "Get your network back on track.",
    intro: "Step-by-step fixes for common issues, error messages and connectivity problems with your Bytescreen devices.",
    description: "Troubleshooting guides for common issues with Bytescreen network security, SD-WAN and access products.",
    documents: [
      {
        id: "troubleshooting-guides",
        title: "Troubleshooting guides",
        intro: "Use these network diagnostic tools to find and fix connectivity problems on your Bytescreen devices.",
        folder: "troubleshooting",
        stripPrefix: "Troubleshooting-",
        itemLabel: "guide",
      },
    ],
  },
  brochures: {
    name: "Brochures",
    summary: "Product and solution overviews to share with your team and stakeholders.",
    heading: "Explore Bytescreen solutions.",
    intro: "Product and solution brochures covering network security, SD-WAN, firewall-as-a-service and more.",
    description: "Download Bytescreen product brochures for network security, SD-WAN, BT-WAN and firewall-as-a-service.",
    documents: [
      {
        id: "product-brochures",
        title: "Product brochures",
        intro: "Overviews of Bytescreen products and solutions.",
        folder: "brochure",
        itemLabel: "brochure",
      },
    ],
  },
  datasheets: {
    name: "Datasheets",
    summary: "Technical specifications for Bytescreen products and appliances.",
    heading: "Technical specifications at a glance.",
    intro: "Detailed technical specifications for Bytescreen products, to help you choose and plan your deployment.",
    description: "Download technical datasheets and specifications for Bytescreen products.",
    documents: [
      {
        id: "product-datasheets",
        title: "Product datasheets",
        intro: "Specifications, capabilities and hardware details.",
        folder: "datasheet",
        itemLabel: "datasheet",
      },
    ],
  },
};

module.exports = RESOURCE_PAGES;
