// Content for the Terms and Privacy pages.
// DEMO CONTENT: replace with text reviewed by your legal adviser, then set `draft: false`.
//
// Each section's `body` is a list of blocks:
//   "A string"            → a paragraph
//   { list: ["a", "b"] }  → a bulleted list

const COMPANY = "Bytescreen Tech Pvt. Ltd.";
const ADDRESS =
  "DLF Galleria, 312, Major Arterial Road (South East Extension), BG Block (Newtown), Action Area I, New Town, Kolkata, West Bengal 700163";

const LEGAL_PAGES = {
  terms: {
    name: "Terms and conditions",
    heading: "Terms and conditions",
    description: "The terms that apply when you use the Bytescreen website and services.",
    updated: "5 October 2026",
    draft: true,
    intro: `These terms and conditions govern your use of the website operated by ${COMPANY} ("Bytescreen", "we", "us"). By using this website, you agree to these terms. If you do not agree, please do not use the website.`,
    sections: [
      {
        id: "use-of-website",
        title: "Use of this website",
        body: [
          "You may use this website to learn about our products and services, contact us and request demonstrations. You agree to use it only for lawful purposes and in a way that does not infringe the rights of others.",
          "You must not:",
          {
            list: [
              "attempt to gain unauthorised access to the website, its servers or any connected systems",
              "introduce viruses, malware or any other harmful material",
              "use automated tools to scrape, copy or overload the website",
              "submit false, misleading or unlawful information through our forms",
            ],
          },
        ],
      },
      {
        id: "products-and-services",
        title: "Products and services",
        body: [
          "Information about our products, including features and specifications, is provided for general information only and may change without notice. It does not form part of any contract.",
          "The supply of products and services, including access to the FusionM controller, is governed by a separate agreement between you and Bytescreen. If that agreement conflicts with these terms, the agreement takes precedence.",
        ],
      },
      {
        id: "accounts",
        title: "Customer accounts",
        body: [
          "If you have access to the FusionM controller or another customer portal, you are responsible for keeping your login details confidential and for all activity under your account. Please tell us immediately if you suspect unauthorised use.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        body: [
          `All content on this website, including text, graphics, logos, product names and software, is owned by or licensed to ${COMPANY} and is protected by intellectual property laws. You may not reproduce, distribute or modify it without our written permission.`,
          "Customer logos shown on this website belong to their respective owners and are used with permission.",
        ],
      },
      {
        id: "third-party-links",
        title: "Third-party links",
        body: [
          "This website may link to websites operated by third parties. We are not responsible for their content or practices, and a link does not mean we endorse them.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        body: [
          "We aim to keep this website accurate and available, but we do not guarantee that it will be error-free or uninterrupted. To the extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, this website.",
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        body: [
          "We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continuing to use the website after a change means you accept the updated terms.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing law",
        body: [
          "These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Kolkata, West Bengal.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [
          `If you have questions about these terms, contact us at sales@bytescreentech.com or write to ${COMPANY}, ${ADDRESS}.`,
        ],
      },
    ],
  },

  privacy: {
    name: "Privacy policy",
    heading: "Privacy policy",
    description: "How Bytescreen collects, uses and protects your personal information.",
    updated: "5 October 2026",
    draft: true,
    intro: `${COMPANY} ("Bytescreen", "we", "us") respects your privacy. This policy explains what personal information we collect through this website, how we use it and the choices you have.`,
    sections: [
      {
        id: "information-we-collect",
        title: "Information we collect",
        body: [
          "We collect information that you give us when you fill in a form on this website, such as a demo request, sales enquiry or partnership enquiry. This may include:",
          {
            list: [
              "your name, work email address and phone number",
              "your company name and type of business",
              "the products you are interested in",
              "any message or details you choose to share",
            ],
          },
          "We also collect basic technical information when you visit the website, such as your IP address, browser type and the pages you view, through our server logs.",
        ],
      },
      {
        id: "how-we-use",
        title: "How we use your information",
        body: [
          "We use your information to:",
          {
            list: [
              "respond to your enquiries and arrange demonstrations",
              "provide information about our products and services that you have asked for",
              "evaluate and manage partnership enquiries",
              "keep the website secure and prevent misuse, such as spam submissions",
              "improve our website and services",
            ],
          },
          "We do not sell your personal information.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing your information",
        body: [
          "We only share your information when needed, for example with service providers who host our website or help us operate our business, and only under appropriate confidentiality obligations. We may also disclose information where required by law.",
        ],
      },
      {
        id: "third-party-services",
        title: "Third-party services",
        body: [
          "This website loads fonts from Google Fonts. When it does, your browser connects to Google's servers, which may receive your IP address. Please see Google's privacy policy for more information.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep your information",
        body: [
          "We keep enquiry information only for as long as needed to respond to you and for our legitimate business and legal purposes, after which it is deleted or anonymised.",
        ],
      },
      {
        id: "security",
        title: "How we protect your information",
        body: [
          "We use appropriate technical and organisational measures to protect your information against unauthorised access, loss or misuse. As a company certified to ISO 27001, information security is central to how we work.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: [
          "Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may have the right to:",
          {
            list: [
              "access the personal information we hold about you",
              "ask us to correct or update it",
              "ask us to delete it",
              "withdraw your consent where we rely on it",
            ],
          },
          "To make a request, contact us using the details below.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [
          `If you have questions about this policy or how we handle your information, contact us at support@bytescreentech.com or write to ${COMPANY}, ${ADDRESS}.`,
        ],
      },
    ],
  },
};

module.exports = LEGAL_PAGES;
